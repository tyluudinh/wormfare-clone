import { Injectable } from '@common/di';
import { MakeObservable, observable } from '@common/state';
import { ApiService } from '../ApiService';
import { CheatCode } from '@app/types';

const MIN_CHEAT_CODE_DELAY = 200;
const MAX_CHEAT_CODE_DELAY = 2000;

@Injectable()
@MakeObservable
export class СheatСodeService {
  symbolSequence: string[] = [];
  previousTimestamp: number | null = null;
  cheatCodeLengths = [17];

  @observable
  activatedCode: CheatCode | null = null;

  constructor(private readonly apiService: ApiService) {}

  public async detectCheatCode(symbol: 'R' | 'L') {
    const currentTimestamp = Date.now();

    if (this.previousTimestamp === null) {
      this.symbolSequence.push(symbol);
      this.previousTimestamp = currentTimestamp;

      return;
    }

    const timeDifference = currentTimestamp - this.previousTimestamp;

    if (
      timeDifference < MIN_CHEAT_CODE_DELAY ||
      timeDifference > MAX_CHEAT_CODE_DELAY
    ) {
      this.symbolSequence = [];
    }

    this.symbolSequence.push(symbol);
    console.log(this.symbolSequence);

    this.previousTimestamp = currentTimestamp;

    const isCheetCodeDetected = this.cheatCodeLengths.includes(
      this.symbolSequence.length,
    );

    if (!isCheetCodeDetected) {
      return;
    }

    this.activatedCode = await this.tryToActivateCode(
      this.symbolSequence.join(''),
    );
  }

  async tryToActivateCode(code: string): Promise<CheatCode | null> {
    try {
      this.symbolSequence = [];

      return (this.activatedCode = await this.apiService.post<CheatCode>(
        '/game/activate-cheat-code',
        {
          code,
        },
      ));
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  getCode() {
    this.activatedCode = null;
  }
}
