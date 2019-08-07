// @flow

'use strict';

import React from 'react';
import type {Node} from 'react';

import PromisePortalContext from './PromisePortalContext';

type Props = {
  children: Node,
};

function PromisePortalProvider({children}: Props) {
  const count = React.useRef(0);
  const [elements, setElements] = React.useState([]);

  const close = React.useCallback(id => {
    setElements(elements => elements.filter(x => x.id !== id));
  }, []);

  const open = React.useCallback(
    element => {
      const id = count.current++;
      return new Promise(resolve => {
        setElements(elements => [
          ...elements,
          {
            id,
            element,
            onCancel: () => {
              resolve(false);
              close(id);
            },
            onConfirm: value => {
              const returnValue =
                value instanceof Event || value?.nativeEvent ? true : value;
              resolve(returnValue);
              close(id);
            },
          },
        ]);
      });
    },
    [close],
  );

  return (
    <PromisePortalContext.Provider value={open}>
      {children}
      {elements.map(({id, element, onCancel, onConfirm}) => (
        <React.Fragment key={id}>{element(onConfirm, onCancel)}</React.Fragment>
      ))}
    </PromisePortalContext.Provider>
  );
}

export default PromisePortalProvider;
