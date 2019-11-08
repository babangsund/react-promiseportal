import React from 'react';
import invariant from 'invariant';

// project
import PromisePortalContext from './PromisePortalContext';

type NewProps = {
  promisePortal: PromisePortalProvider;
};

function withPromisePortal<TProps extends NewProps>(
  Component: React.ComponentType<TProps>
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TProps & NewProps> & React.RefAttributes<HTMLElement>
> {
  function forwardRef(props: TProps, ref: React.Ref<HTMLElement>): JSX.Element {
    return (
      <PromisePortalContext.Consumer>
        {context => {
          invariant(
            context !== undefined,
            '[withPromisePortal]: PromisePortalContext is undefined'
          );

          return <Component {...props} ref={ref} promisePortal={context} />;
        }}
      </PromisePortalContext.Consumer>
    );
  }
  forwardRef.displayName = Component.name;
  return React.forwardRef(forwardRef);
}

export default withPromisePortal;
