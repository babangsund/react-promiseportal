# react-promiseportal

Promise portals for React

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-promiseportal

Using [yarn](https://yarnpkg.com/):

    $ yarn add react-promiseportal


Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// Using ES6 Modules
import {usePromisePortal} from 'react-promiseportal';
// using CommonJS modules
const usePromisePortal = require('react-promiseportal').usePromisePortal;
```

## Why?

Normally when managing a modal, or similar hierarchy agnostic elements, it is common practice to render these in the component, and control them with local boolean state.

For example:

```jsx
// App.js
import React from 'react';

function App() {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Click me to open a modal</button>
      <SomeModalComponent open={isOpen}>
        <button
          onClick={() => {
            alert('You confirmed!');
            setOpen(false);
          }}>
          Confirm
        </button>
        <button
          onClick={() => {
            alert('You cancelled.');
            setOpen(false);
          }}>
          Cancel
        </button>
      </SomeModalComponent>
    </>
  );
}
```

In large components, managing several modals with different `isOpen` state can be confusing.  
With `react-promiseportal`, I offer complete co-location.  

## Usage

At the top-level of your application, import the `PromisePortalProvider` module.

```jsx
// AppContext.js
import React from 'react';
import {PromisePortalProvider} from 'react-promiseportal';

function AppContext() {
  return (
    <PromisePortalProvider>
      <App />
    </PromisePortalProvider>
  );
}
```

You can then import `usePromisePortal` (hook) or `withPromisePortal` (hoc).

```jsx
// App.js
import React from 'react';
import {usePromisePortal} from 'react-promiseportal';

function App() {
  const portal = usePromisePortal();
  return (
    <button
      onClick={async () => {
        const didConfirm = await portal((onConfirm, onCancel) => {
          return (
            <SomeModalComponent open>
              <button onClick={onConfirm}>Confirm</button>
              <button onClick={onCancel}>Cancel</button>
            </SomeModalComponent>
          );
        });

        if (didConfirm) alert('You confirmed!');
        else alert('You cancelled.');
      }}>
      Click me to open a modal
    </button>
  );
}
```

Calling `onConfirm` with an Event or a falsy value, will resolve the promise with the value `true`.  
If called with a truthy value, like an object, this is returned instead.  

For example, if the `Modal` were instead a form, which returned some input for a request:

```jsx
// App.js
import React from 'react';
import {usePromisePortal} from 'react-promiseportal';

function App() {
  const portal = usePromisePortal();
  return (
    <button
      onClick={async () => {
        // onConfirm is called with {potatoes: true}
        // So the promise is resolved with {potatoes: true}
        const input = await portal((onConfirm, onCancel) => {
          return (
            <SomeFormComponent open>
              <button onClick={() => onConfirm({potatoes: true})}>
                Confirm
              </button>
              <button onClick={onCancel}>Cancel</button>
            </SomeFormComponent>
          );
        });

        if (input) fetch();
        else alert('You cancelled.');
      }}>
      Click me to open a modal
    </button>
  );
}
```

## Credits

react-promiseportal is built and maintained by **babangsund**.  
[@blog](https://babangsund.com/).  
[@github](https://github.com/babangsund).  
[@twitter](https://twitter.com/babangsund). 
