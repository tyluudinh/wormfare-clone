import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { ApiService } from '../ApiService';
import { CacheService } from '../CacheService';

import { openLink, updateArrayItem } from '@app/utils';

import type { Quest, QuestRaw, ApiResponse } from '@app/types';
import { GameService } from '../GameService';
import { UserService } from '../UserService';
import { AnalyticsService } from '../AnalyticsService';


@Injectable()
@MakeObservable
export class QuestService {
  @observable
  public quests: Quest[] = [];

  @observable
  public isQuestsLoading = false;

  @observable
  public isCheckCompletionLoading = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly cacheService: CacheService,
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  private isQuestInProgress(questId: string, taskId?: number): boolean {
    if (taskId) {
      return !!this.cacheService.get(`inprogress_${questId}_${taskId}`);
    }

    return !!this.cacheService.get(`inprogress_${questId}`);
  }

  private updateQuestCompletion(questId: string, taskId?: number) {
    const quest = this.quests.find(({ id }) => id === questId);

    if (!quest) {
      return;
    }

    if (taskId === undefined || taskId === null) {
      this.cacheService.remove(`inprogress_${questId}`);
      this.quests = updateArrayItem(this.quests, questId, {
        isCompleted: true,
        inProgress: false,
      });
      this.analyticsService.trackEvent({
        name: 'quest_completed',
        variables: {
          quest_id: questId,
        },
      });

      this.cacheService.remove(`inprogress_${questId}`);

      return;
    }

    if (!quest.tasks) {
      return;
    }

    const lastTask = quest.tasks[quest.tasks.length - 1];

    this.cacheService.remove(`inprogress_${questId}_${taskId}`);

    this.quests = updateArrayItem(this.quests, questId, {
      tasks: updateArrayItem(quest.tasks, taskId, {
        isCompleted: true,
        inProgress: false,
      }),
      isCompleted: lastTask.id === taskId,
      inProgress: lastTask.id !== taskId,
    });

    if (lastTask.id === taskId) {
      this.analyticsService.trackEvent({
        name: 'quest_completed',
        variables: {
          quest_id: questId,
        },
      });
    }

    this.cacheService.remove(`inprogress_${questId}_${taskId}`);
  }

  public startQuestOrTask(questId: string, taskId?: number): void {
    const quest = this.quests.find(({ id }) => id === questId);

    if (!quest) {
      throw new Error(`Quest with id: ${questId} is not defined!`);
    }

    const task = quest.tasks?.find(({ id }) => id === taskId);

    const ctaLink = task?.url || quest.url;

    if (!ctaLink) {
      return;
    }

    openLink(ctaLink);

    this.analyticsService.trackEvent({
      name: 'quest_started',
      variables: {
        quest_id: questId,
      },
    });

    if (quest.isCompleted) {
      return;
    }

    if (taskId) {
      this.cacheService.set(`inprogress_${questId}_${taskId}`, true);
    } else {
      this.cacheService.set(`inprogress_${questId}`, true);
    }

    this.quests = updateArrayItem(this.quests, questId, {
      inProgress: true,
      tasks: quest.tasks
        ? updateArrayItem(quest.tasks, taskId, {
            inProgress: true,
          })
        : undefined,
    });

    if (
      ['_CreateDashboardAccountQuest', '_InviteFriendsQuest'].includes(questId)
    ) {
      window.Telegram?.WebApp?.close();
    }
  }

  public async fetchQuests(): Promise<void> {
    this.isQuestsLoading = true;

    const questsRaw = await this.apiService.get<QuestRaw[]>('/quest');

    this.quests = questsRaw.map((quest) => ({
      ...quest,
      inProgress: this.isQuestInProgress(quest.id),
      tasks: quest.tasks?.map((task) => ({
        ...task,
        inProgress: this.isQuestInProgress(quest.id, task.id),
      })),
    } as Quest));

    this.isQuestsLoading = false;
  }

  public async checkCompletion(
    questId: string,
    taskId?: number,
  ): Promise<ApiResponse> {
    const params: { questId: string; taskId?: number } = {
      questId,
      taskId,
    };

    this.isCheckCompletionLoading = true;

    const response = await this.apiService.post<ApiResponse>(
      '/quest/check-completion',
      params,
    );

    if (response.success) {
      this.updateQuestCompletion(questId, taskId);
    }

    this.isCheckCompletionLoading = false;

    return response;
  }

  public async claimReward(questId: string): Promise<ApiResponse> {
    const params = {
      questId,
    };

    const response = await this.apiService.post<ApiResponse>(
      '/quest/claim-reward',
      params,
    );

    if (response.success) {
      this.quests = updateArrayItem(this.quests, questId, {
        isRewardClaimed: true,
      });
      this.cacheService.remove(`inprogress_${questId}`);
      await this.userService.fetchProfile();
      this.gameService.initialize();
    }

    return response;
  }
}
