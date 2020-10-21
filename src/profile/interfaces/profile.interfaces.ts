export interface ProfileInterface {
  nickname: string;
  followers: number;
  following: number;
  name: string;
  link: string;
  description: string;
  postsCount: number;
  avgLikes: number;
  avgComments: number;
  tagsDescription: string;
  taggedUsersDescription: string;
  taggedUsers: string;
  videoViewCountAvg: number;
}

export interface ProfileDataBase extends ProfileInterface {
  id: number
}