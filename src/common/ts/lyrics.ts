const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

const tagRegMap = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by',
};

const noop = () => {
// noop function
};

class Lyric {
  public play: any;
  public seek: any;
  public togglePlay: any;
  public stop: any;
  private tags: any;
  private lines: any[] = [];
  private handler: any;
  private state: number;
  private curLine: number;
  private curNum: number;
  private pauseStamp: any;
  private startStamp: any;
  private timer: any;
  constructor(private lrc: any, private hanlder = noop) {
    this.lrc = lrc;
    this.tags = {};
    this.lines = [];
    this.handler = hanlder;
    this.state = STATE_PAUSE;
    this.curLine = 0;
    this.timer = 0;
    this.play = (startTime = 0, skipLast?: any) => {
      if (!this.lines.length) {
        return;
      }
      this.state = STATE_PLAYING;

      this.curNum = this._findCurNum(startTime);
      this.startStamp = +new Date() - startTime;

      if (!skipLast) {
        this._callHandler(this.curNum - 1);
      }

      if (this.curNum < this.lines.length) {
        clearTimeout(this.timer);
        this._playRest();
      }
    };
    this.togglePlay = () => {
      const now = +new Date();
      if (this.state === STATE_PLAYING) {
        this.stop();
        this.pauseStamp = now;
      } else {
        this.state = STATE_PLAYING;
        this.play((this.pauseStamp || now) - (this.startStamp || now), true);
        this.pauseStamp = 0;
      }
    };
    this.stop = () => {
      this.state = STATE_PAUSE;
      clearTimeout(this.timer);
    };
    this.seek = (offset: any) => {
      this.play(offset);
    };
    this._init();
  }

  private _init() {
    this._initTag();
    this._initLines();
  }

  private _initTag() {
    const tagList = Object.values(tagRegMap);
    tagList.map((tag: any) => {
      const matchTarget = new RegExp(`\\[${tagList[tag]}:([^\\]]*)]`, 'i');
      const matches = this.lrc.match(matchTarget);
      this.tags[tag] = (matches && matches[1]) || '';
    });
  }

  private _initLines() {
    const lines = this.lrc.split('\n');
    lines.map((line: any, index: number) => {
      const result: any = timeExp.exec(line);
      if (result) {
        const txt = line.replace(timeExp, '').trim();
        if (txt) {
          this.lines.push({
            time:
              result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
            txt,
          });
        }
      }
    });

    this.lines.sort((a, b) => {
      return a.time - b.time;
    });
  }

  private _findCurNum(time: any) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  private _callHandler(i: number) {
    if (i < 0) {
      return;
    }
    this.handler({
      txt: this.lines[i].txt,
      lineNum: i,
    });
  }

  private _playRest() {
    const line = this.lines[this.curNum];
    const delay = line.time - (+new Date() - this.startStamp);

    this.timer = setTimeout(() => {
      this._callHandler(this.curNum++);
      if (this.curNum < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest();
      }
    }, delay);
  }
}

export default Lyric;
