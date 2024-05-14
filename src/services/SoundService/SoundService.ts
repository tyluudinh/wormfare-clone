import { MakeObservable, observable } from '@common/state';
import { CacheService } from '../CacheService';
import { Injectable } from '@app/common/di';

@Injectable()
@MakeObservable
export class SoundService {
  context: AudioContext;

  @observable
  public muted: boolean;

  @observable
  public isSaving = false;

  constructor(private readonly cacheService: CacheService) {
    this.context = new AudioContext();

    const cachedMuteState = this.cacheService.get('muteState');

    if (typeof cachedMuteState === 'boolean') {
      this.muted = cachedMuteState;
    } else {
      this.muted = false;
    }
  }

  async loadSound(url: string) {
    const response = await fetch(url);

    return response.arrayBuffer();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  throttle(func: any, delay: number) {
    let lastCall = 0;

    return function (...args: unknown[]) {
      const now = new Date().getTime();

      if (now - lastCall >= delay) {
        func(...args);
        lastCall = now;
      }
    };
  }

  playSoundTap = this.throttle(async () => {
    try {
      if (this.muted) {
        return;
      }

      const gainNode = this.context.createGain();

      const soundArrayBuffer = await this.loadSound('/sounds/s1.mp3');
      const sound = await this.context.decodeAudioData(soundArrayBuffer);

      const source = this.context.createBufferSource();

      source.buffer = sound;

      source.connect(gainNode).connect(this.context.destination);
      source.start();
    } catch (err) {
      console.error(err);
    }
  }, 50);

  muteAllSound() {
    this.muted = !this.muted;

    if (this.muted) {
      this.context.suspend();
    } else {
      this.context.resume();
    }

    this.cacheService.set('muteState', this.muted);
  }
}

// export const soundService = new SoundService();
