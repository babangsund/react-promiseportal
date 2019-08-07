// @flow

'use strict';

import React from 'react';
import invariant from 'invariant';

import PromisePortalContext from './PromisePortalContext';

function usePromisePortal() {
  const context = React.useContext(PromisePortalContext);
  invariant(
    context !== undefined,
    '[usePromisePortal]: PromisePortalContext is undefined',
  );
  return context;
}

export default usePromisePortal;
