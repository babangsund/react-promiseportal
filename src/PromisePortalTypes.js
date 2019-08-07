// @flow

'use strict';

export type PromisePortalElement = (
  (Event | ?{nativeEvent: Object}) => void,
  (void) => void,
) => any;

export type PromisePortalProvider = PromisePortalElement => Promise<
  boolean | ?{},
>;
