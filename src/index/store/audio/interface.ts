export interface Audio {
  playing: boolean;
  currentTime: number;
  maxTime: number;
}

export interface State {
  audio?: Audio;
  handlerSchedule?: number;
}

