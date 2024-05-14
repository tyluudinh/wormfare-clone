import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { generateCoordinates } from '@app/utils/generateCoordinates';
import { random } from '@app/utils/random';
import { ApiService } from '../ApiService';
import { ConfigService } from '../ConfigService';

interface Coordinates {
  x: number;
  y: number;
}

@Injectable()
@MakeObservable
export class BotHunterService {
  @observable
  public isChecking = false;

  @observable
  public checkStartTime = 0;

  @observable
  public misclicks = 0;

  @observable
  public coords: Coordinates | null = null;

  @observable
  public isBotDetected = false;

  constructor(
    private readonly apiService: ApiService,
    private readonly configService: ConfigService,
  ) {}

  private generatePeachCoordinates() {
    return generateCoordinates(
      window.innerWidth,
      window.innerHeight,
      [0, 0.2, 1, 0.65],
      [100, 100],
    );
  }

  private startCheck() {
    if (this.isChecking) {
      throw new Error('Bot check is already started');
    }

    this.isChecking = true;
    this.coords = this.generatePeachCoordinates();
  }

  handleTap() {
    if (this.checkStartTime === 0) {
      const timeout = random(
        this.configService.botDetectionMinInterval,
        this.configService.botDetectionMaxInterval,
      );

      this.checkStartTime = Date.now() + timeout;
    }

    if (this.checkStartTime < Date.now() && !this.isChecking) {
      this.startCheck();
      this.checkStartTime = 0;
    }
  }

  handleTapOnPeach() {
    if (this.isBotDetected) {
      return;
    }

    this.isChecking = false;

    this.resetBotCheck();
  }

  handleOutsideClick() {
    if (this.isBotDetected) {
      return;
    }

    this.misclicks++;

    if (this.misclicks > this.configService.botDetectionMisclicksLimit) {
      this.isBotDetected = true;
      this.reportBot();
    }
  }

  resetBotCheck() {
    this.isChecking = false;
    this.misclicks = 0;
    this.coords = null;
  }

  async reportBot() {
    this.apiService.post('/game/report', {
      reason: `Account suspended for ${this.misclicks} misclicks during bot detection.`,
    });
  }
}
