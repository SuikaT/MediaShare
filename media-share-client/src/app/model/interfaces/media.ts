import { MediaTypeEnum } from '../enums/MediaTypeEnum';

export interface Media {
  id: number;
  title: string;
  type: MediaTypeEnum;
  path: string;
}
