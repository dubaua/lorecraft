import { ContentStateType } from './content-state.type';
import { Timestamp } from './timestamp.type';

export interface ICockpitEntry {
  _modified: Timestamp;
  _mby: string;
  _created: Timestamp;
  _state: ContentStateType;
  _cby: string;
  _id: string;
}
