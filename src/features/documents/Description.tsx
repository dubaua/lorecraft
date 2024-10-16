import React from 'react';
import { NavLink } from 'react-router-dom';
import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';

type Props = {
  html: string;
};

export const Description: React.FunctionComponent<Props> = ({ html }) => {
  const options: HTMLReactParserOptions = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return;
      }

      if (attribs.href) {
        const href = `/${attribs.href}`;
        return <NavLink to={href}>{domToReact(children, options)}</NavLink>;
      }
    },
  };

  return <div>{parse(html, options)}</div>;
};
