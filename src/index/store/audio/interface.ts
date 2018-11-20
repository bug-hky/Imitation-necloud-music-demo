export interface Audio {
  playing: boolean;
  currentTime: string;
  maxTime: string;
}

export interface State {
  audio?: Audio;
  schedule?: any;
}

