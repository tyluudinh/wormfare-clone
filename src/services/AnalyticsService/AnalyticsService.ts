import { Injectable } from '@common/di';
import { ConfigService } from '../ConfigService';
import { UserService } from '../UserService';

interface AnalyticsEvent {
  name: string;
  variables?: { [key: string]: string | number };
}

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public trackEvent({ name, variables }: AnalyticsEvent) {
    if (this.configService.env !== 'production') {
      return;
    }

    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    const userId = this.userService.userProfile?.id;
    const referralCode = this.userService.userProfile?.invitedByUser;
    const walletAddress = this.userService.userProfile?.walletAddress;

    const eventData = {
      event: name,
      game_name: 'slap',
      user_id: userId,
      referred: referralCode ? 'yes' : 'no',
      referrals_code: referralCode || null,
      walletAddress,
      ...variables,
    };

    window.dataLayer.push(eventData);

    console.log(name, eventData);
  }
}
