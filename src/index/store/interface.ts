// tslint:disable-next-line:class-name
export interface rating {
  max: number;
  average: string;
  stars: number;
  min: number;
}

// tslint:disable-next-line:class-name
export interface start {
  alt: string;
  avatars: [];
  name: string;
  id: string;
}

export interface Profile {
  accountStatus?: number;
  artistIdentity?: any[];
  artistName?: null;
  authStatus?: number;
  authority?: number;
  avatarImgId?: number;
  avatarImgIdStr?: string;
  avatarUrl?: string;
  backgroundImgId?: number;
  backgroundImgIdStr?: string;
  backgroundUrl?: string;
  birthday?: number;
  blacklist?: boolean;
  city?: number;
  defaultAvatar?: boolean;
  description?: string;
  detailDescription?: string;
  djStatus?: number;
  eventCount?: number;
  expertTags?: null;
  experts?: object;
  followed?: boolean;
  followeds?: number;
  follows?: number;
  gender?: number;
  mutual?: false;
  nickname?: string;
  playlistBeSubscribedCount?: number;
  playlistCount?: number;
  province?: number;
  remarkName?: null;
  signature?: string;
  userId?: number;
  userType?: number;
  vipType?: number;
}

export interface User {
  adValid: boolean;
  bindings: object[];
  code: number;
  createDays: number;
  createTime: number;
  level: number;
  listenSongs: number;
  peopleCanSeeMyPlayRecord: boolean;
  profile: Profile;
}

export interface State {
  theme: string;
  showSideBar: boolean;
  showSongBar: boolean;
  user: User;
  isDayMode?: boolean;
}

export interface Menu {
  label?: string;
  key?: string;
  index?: number;
  href: string;
  title?: string;
  icon?: string;
  number?: number;
  noBorder?: boolean;
}

export interface Banner {
  adLocation: string | null;
  adSource: string | null;
  adid: number | null;
  encodeId: string | null;
  event: string | null;
  exclusive: boolean | null;
  extMonitor: null;
  extMonitorInfo: null;
  imageUrl: string | null;
  monitorBlackList: null;
  monitorClick: null;
  monitorClickList: null;
  monitorImpress: null;
  monitorImpressList: null;
  monitorType: null;
  program: null;
  song: null;
  targetId: number | null;
  targetType: number | null;
  titleColor: string | null;
  typeTitle: string | null;
  url: string | null;
  video: null;
}
