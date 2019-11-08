import React from 'react';

const PromisePortalContext = React.createContext<
  PromisePortalProvider | undefined
>(undefined);

export default PromisePortalContext;
