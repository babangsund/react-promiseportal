import React from 'react';
import invariant from 'invariant';

import PromisePortalContext from './PromisePortalContext';

function usePromisePortal(): PromisePortalProvider | undefined {
  const context = React.useContext<PromisePortalProvider | undefined>(
    PromisePortalContext
  );
  invariant(
    context !== undefined,
    '[usePromisePortal]: PromisePortalContext is undefined'
  );
  return context;
}

export default usePromisePortal;
