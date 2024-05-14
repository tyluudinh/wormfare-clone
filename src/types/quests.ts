export interface Quest {
  id: string;
  type: 'simple' | 'complex';
  title: string;
  subtitle: string;
  description: string;
  isCompleted: boolean;
  rewardAmount: number;
  inProgress: boolean;
  isRewardClaimed: boolean;
  isLocked: boolean;
  icon?: string;
  category: string;
  lockMessage: string;
  buttonTitle: string;
  url: string;
  tasks?: Task[];
  isSimpleCheck?: boolean;
}

export type QuestRaw = {
  id: string;
  title: string;
  description: string;
  url: string;
  isCompleted: boolean;
  isRewardClaimed: boolean;
  tasks?: Task[];
};

export interface Task {
  id: number;
  title: string;
  description: string;
  url: string;
  isCompleted: boolean;
  inProgress: boolean;
}