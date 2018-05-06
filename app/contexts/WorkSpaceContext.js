// import React from 'react';
import React, { PureComponent } from 'react';
import uuidv1 from 'uuid/v1';

const Context = React.createContext();

export class Provider extends PureComponent {
  state = {
    workspaceCount: 0,
    workspaceCounter: () =>
      this.setState({ workspaceCount: this.state.workspaceCount + 1 })
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

export const withProvider = Component =>
  React.forwardRef((props, ref) => (
    <Provider>
      <Component {...props} ref={ref} />
    </Provider>
  ));

export const withConsumer = (Component, mapStateToProps = x => x) =>
  React.forwardRef((props, ref) => (
    <Consumer>
      {value => <Component {...props} {...mapStateToProps(value)} ref={ref} />}
    </Consumer>
  ));

export const withContext = (Component, mapStateToProps = x => x) =>
  withProvider(withConsumer(Component, mapStateToProps));

export default {
  Provider,
  Consumer,
  withContext,
  withProvider,
  withConsumer
};

// const defaultBoard = createStore({
//   initialState: { ...initialState, id: uuidv1() },
//   actions,
//   subscribeToCurrentStore: Component => subscribe(defaultBoard)(Component)
// });

// const workspaceStore = createStore({
//   // initialState:
// });

// window._workspaceStore = workspaceStore;

// export default workspaceStore;
// export class Provider extends PureComponent {
//   render() {
//     return (
//       <Context.Provider value={this.state}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
// }

// export const Consumer = Context.Consumer;

// export const withProvider = Component =>
//   React.forwardRef((props, ref) => (
//     <Provider>
//       <Component {...props} ref={ref} />
//     </Provider>
//   ));

// export const withConsumer = (Component, mapStateToProps = x => x) =>
//   React.forwardRef((props, ref) => (
//     <Consumer>
//       {value => <Component {...props} {...mapStateToProps(value)} ref={ref} />}
//     </Consumer>
//   ));

// export const withContext = (Component, mapStateToProps = x => x) =>
//   withProvider(withConsumer(Component, mapStateToProps));

// export default {
//   Provider,
//   Consumer,
//   withContext,
//   withProvider,
//   withConsumer
// };
