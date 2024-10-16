import React from 'react';
import { ICharacter } from './document.interface';

type Props = {
  character: ICharacter;
};

export const Character: React.FunctionComponent<Props> = ({ character }) => {
  return (
    <div>
      <h1>{character.name}</h1>
      {character.description}
    </div>
  );
};
