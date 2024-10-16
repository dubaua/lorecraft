import React from 'react';
import { useDocument } from './use-document';
import { DocumentTypes, ILocation } from './document.interface';
import { Location } from './Location';
import { Character } from './Character';
import { Event } from './Event';

export const Document: React.FunctionComponent = () => {
  const { document, isLoading } = useDocument();

  if (!document) {
    return <h1>There is no document with this id</h1>;
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return <Location location={document as unknown as ILocation} />;

  // switch (document.type) {
  //   case DocumentTypes.Location:
  //     return <Location location={document} />;
  //   case DocumentTypes.Event:
  //     return <Event event={document} />;
  //   case DocumentTypes.Character:
  //     return <Character character={document} />;
  // }
};
