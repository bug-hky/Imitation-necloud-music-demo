export interface Audio {
  playing: boolean;
  currentTime: number;
  maxTime: number;
  loud: number;
}

export interface State {
  audio?: Audio;
  handlerSchedule?: number;
  isNoLoud?: boolean;
}

