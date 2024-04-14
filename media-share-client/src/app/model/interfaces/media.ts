import { MediaTypeEnum } from '../enums/MediaTypeEnum';
import { Season } from './Season';

export interface Media {
  id: number;
  name: string;
  type: MediaTypeEnum;
  seasonList: Season[];
  size: number;
}
