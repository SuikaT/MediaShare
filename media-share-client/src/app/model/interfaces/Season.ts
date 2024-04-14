import { Episode } from './Episode';

export interface Season {
  id: number;
  directoryName: string;
  size: number;
  episodeList: Episode[];
  hasRepertory: boolean;
}
