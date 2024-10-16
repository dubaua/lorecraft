import { ICockpitAsset } from '@models/cockpit-asset.interface';
import { ICockpitEntry } from '@models/cockpit-entry.interface';

export const DocumentTypes = {
  Location: 'location',
  Event: 'event',
  Character: 'character',
  Lore: 'lore',
} as const;

type Keys = keyof typeof DocumentTypes;

export type DocumentType = (typeof DocumentTypes)[Keys];

export interface IMapPoint {
  coordinates: [number, number];
  link: string;
}

export interface IDocumentBase extends ICockpitEntry {
  name: string;
  type: DocumentType;
  image: ICockpitAsset;
  description: string;
}

export interface ILocation extends IDocumentBase {
  type: typeof DocumentTypes.Location;
  map: IMapPoint[];
  mapImage: ICockpitAsset;
}

export interface IEvent extends IDocumentBase {
  type: typeof DocumentTypes.Event;
  start: number;
  end: number | null;
}

export interface ICharacter extends IDocumentBase {
  type: typeof DocumentTypes.Character;
}

export interface ILore extends IDocumentBase {
  type: typeof DocumentTypes.Lore;
}

export type IDocument = ILocation | IEvent | ICharacter | ILore;

export type IDocumentSummary = Pick<IDocumentBase, '_id' | 'name' | 'type'>;
