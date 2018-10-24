// tslint:disable-next-line:class-name
export interface movie {
  name: string;
  rating: rating;
  genres: [];
  title: string;
  casts: start[];
  collect_count: number;
  original_title: string;
  subtype: string;
  directors: [];
  year: string;
  images: [];
  alt: string;
  id: string;
}

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
  showSideBar: boolean;
  user: User;
}

