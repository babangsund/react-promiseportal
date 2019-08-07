// @flow

'use strict';

import React from 'react';
import invariant from 'invariant';
import type {AbstractComponent} from 'react';

import PromisePortalContext from './PromisePortalContext';

function withPromisePortal<Config: {}>(
  Component: AbstractComponent<Config>,
): AbstractComponent<Config> {
  return React.forwardRef((props, ref) => (
    <PromisePortalContext.Consumer>
      {context => {
        invariant(
          context !== undefined,
          '[withPromisePortal]: PromisePortalContext is undefined',
        );

        return <Component {...props} ref={ref} portal={context} />;
      }}
    </PromisePortalContext.Consumer>
  ));
}

export default withPromisePortal;
