import React from 'react';
import { IEvent } from './document.interface';

type Props = {
  event: IEvent;
};

export const Event: React.FunctionComponent<Props> = ({ event }) => {
  return (
    <div>
      <h1>{event.name}</h1>
      {event.description}
    </div>
  );
};
