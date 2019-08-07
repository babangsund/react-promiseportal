// @flow

'use strict';

import React from 'react';

import type {PromisePortalProvider} from './PromisePortalTypes';

const PromisePortalContext = React.createContext<?PromisePortalProvider>(
  undefined,
);

export default PromisePortalContext;
