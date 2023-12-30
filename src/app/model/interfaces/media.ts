import { MediaTypeEnum } from '../enums/MediaTypeEnum';

export interface Media {
  title: string;
  type: MediaTypeEnum;
  path: string;
}
