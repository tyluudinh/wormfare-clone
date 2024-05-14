import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { UserService } from '../UserService';
import { ApiService } from '../ApiService';
import type { Coordinates, UserProfile } from '@app/types';
import { generateCoordinates } from '@app/utils/generateCoordinates';
import { BotHunterService } from '../BotHunterService';
import { random } from '@app/utils/random';
import { options } from '@app/constants/options';
import { CacheService } from '../CacheService';

@Injectable()
@MakeObservable
export class GameService {
  @observable
  public energyLeft = 0;

  @observable
  public lastUpdateTimestamp = 0;

  @observable
  public manualEarnedScore = 0;

  @observable
  public score = 0;

  @observable
  public totalEarnedScore = 0;

  @observable
  public energy = 0;

  @observable
  public unsavedScore = 0;

  @observable
  public isSaving = false;

  @observable
  public isClaimedAutoBotEarnedScore = false;

  @observable
  public lock = 0;

  @observable
  public isGameLoading = false;

  @observable
  public isTurboAvailable = false;

  @observable
  public isTurboActivated = false;

  @observable
  public coords: Coordinates | null = null;

  @observable
  public turboTapMult = 1;

  public turboHideTime = 0;

  private isTurboShown = false;

  private turboOptionIndex = 0;

  private turboEndTime = 0;

  public firstClickTimestamp = 0;

  constructor(
    private readonly apiService: ApiService,
    private readonly userService: UserService,
    private readonly botHunterService: BotHunterService,
    private readonly cacheService: CacheService,
  ) {}

  public async initialize() {
    const { userProfile } = this.userService;

    if (!userProfile) {
      return;
    }

    this.energy = userProfile.energyLeft;
    this.lastUpdateTimestamp = userProfile.lastUpdateTimestamp;
    this.manualEarnedScore = userProfile.manualEarnedScore;
    this.totalEarnedScore = userProfile.totalEarnedScore;
    this.score = userProfile.score;
    this.isTurboAvailable = userProfile.isTurboAvailable;

    if (userProfile.autoBotEarnedScore && !this.isClaimedAutoBotEarnedScore) {
      this.score -= userProfile.autoBotEarnedScore;
    }
  }

  public claimBotReward() {
    const { userProfile } = this.userService;

    if (userProfile?.autoBotEarnedScore) {
      this.score += userProfile.autoBotEarnedScore;
      this.isClaimedAutoBotEarnedScore = true;
    }
  }

  public loop() {
    this.restoreEnergy();
    this.checkTurboMode();
  }

  public click() {
    const userProfile = this.userService.userProfile;

    if (!userProfile || this.botHunterService.isChecking) {
      return;
    }

    if (this.lock > Date.now()) {
      return;
    }

    if (this.firstClickTimestamp === 0) {
      this.firstClickTimestamp = Date.now();
    }

    if (!this.isTurboActivated && !this.turboHideTime) {
      this.botHunterService.handleTap();
    }

    const scoreGain = this.turboTapMult * userProfile.energyPerTap;

    this.unsavedScore += scoreGain;

    if (!this.isTurboActivated) {
      this.energy -= userProfile.energyPerTap;
    }

    if (this.energy < 0 && !this.lock && this.unsavedScore > 0) {
      this.energy = 0;
      console.log('lock the click for 10 seconds');

      // lock the click for 10 seconds
      this.lock = Date.now() + 1000 * 10;
    }

    this.score += scoreGain;

    const threshold = userProfile.energyMax * 0.39;

    if (
      this.unsavedScore > 0 &&
      this.unsavedScore >= threshold &&
      !this.isSaving &&
      !this.isTurboActivated
    ) {
      this.saveScore();
    }
  }

  public activateTurboMode() {
    this.coords = null;
    this.isTurboActivated = true;
    this.isTurboShown = false;
    this.turboOptionIndex = random(0, 2);

    const option = options[this.turboOptionIndex];

    this.turboEndTime = Date.now() + option.duration;
    this.turboTapMult = option.mult;
    this.saveScore();
  }

  private generateFishCoordinates() {
    return generateCoordinates(
      window.innerWidth,
      window.innerHeight,
      [0, 0.2, 1, 0.65],
      [100, 100],
    );
  }

  private checkTurboMode() {
    if (this.turboEndTime !== 0 && this.turboEndTime < Date.now()) {
      this.turboEndTime = 0;
      this.isTurboActivated = false;
      this.isTurboAvailable = false;
      this.turboTapMult = 1;
      this.saveScore(true);
    }

    if (this.coords && this.turboHideTime < Date.now()) {
      this.coords = null;
      this.turboHideTime = 0;
    }

    if (!this.isTurboAvailable || this.botHunterService.isChecking) {
      return;
    }

    if (this.isTurboActivated) {
      this.lock = 0;
    }

    if (!this.coords && !this.isTurboActivated && !this.isTurboShown) {
      this.showTurbo();
    }
  }

  private showTurbo() {
    this.turboHideTime = Date.now() + 5000;
    this.coords = this.generateFishCoordinates();
    this.isTurboShown = true;
  }

  private restoreEnergy() {
    const userProfile = this.userService.userProfile;

    if (!userProfile) {
      return;
    }

    if (this.lock !== 0 && this.lock < Date.now()) {
      this.lock = 0;
    }

    const now = Date.now();
    const timeDiff = (now - this.lastUpdateTimestamp) / 1000;
    const energyGain = timeDiff * userProfile.energyPerSecond;

    this.energy = Math.min(userProfile.energyMax, this.energy + energyGain);
    this.lastUpdateTimestamp = now;
  }

  async saveScore(isTurbo = false): Promise<void> {
    const unsavedScore = this.unsavedScore;
    const firstClickTimestamp = this.firstClickTimestamp;

    if (unsavedScore <= 0) {
      return;
    }

    this.isSaving = true;
    this.unsavedScore = 0;
    this.firstClickTimestamp = 0;

    const timestampDelta = parseInt(
      this.cacheService.get('timestampDelta') || '0',
    );

    try {
      const userProfile = await this.apiService.post<UserProfile>(
        `game/save-clicks`,
        {
          startTimestamp: firstClickTimestamp - timestampDelta,
          amount: unsavedScore,
          isTurbo,
        },
      );

      if (
        userProfile.isTurboAvailable &&
        !this.isTurboActivated &&
        this.isTurboShown &&
        !this.botHunterService.isChecking
      ) {
        this.showTurbo();
      }

      const {
        energyLeft,
        lastUpdateTimestamp,
        manualEarnedScore,
        totalEarnedScore,
        score,
        isTurboAvailable,
      } = userProfile;

      this.score = score + this.unsavedScore;
      this.energy = energyLeft;
      this.lastUpdateTimestamp = lastUpdateTimestamp;
      this.manualEarnedScore = manualEarnedScore;
      this.totalEarnedScore = totalEarnedScore;
      this.isSaving = false;
      this.isTurboAvailable = isTurboAvailable;

      this.userService.userProfile = userProfile;
    } catch (e) {
      console.log('Error while saving score', e);
    } finally {
      this.isSaving = false;
    }
  }
}
