import React, {lazy, Suspense, useReducer} from 'react';
import {Route, Router, Switch} from "react-router-dom";
import router from './contants/router';
import './global.css';
import history from "./history";
import Loading from "./components/Loading";
import {hot} from 'react-hot-loader';
import MessageQueue from './containers/MessageQueue';
import security from './config/security';
import ErrorBoundaries from './components/ErrorBoundaries';
import EditorContext, {defaultValue, reducer, action} from "./redux/editorState";


// sentry sdk 检测报错信息
//https://sentry.io/
if (process.env.NODE_ENV !== "development") {
  const Sentry = require('@sentry/browser');
  Sentry.init({dsn: security.dsn});
}

const Root = lazy(() => import("./components/nav/"));
const Register = lazy(() => import("./containers/register"));
const Login = lazy(() => import("./containers/login"));
const RecoveryPass = lazy(() => import("./containers/recoveryPass/RecoveryPassword"));

const App = React.memo(function App() {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  return (
    <EditorContext.Provider value={{state, dispatch, action}}>
      <ContextApp/>
    </EditorContext.Provider>
  );
});

const ContextApp = React.memo(function ContextApp() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router history={history}>
        <ErrorBoundaries>
          <MessageQueue/>
          <Switch>
            <Route path={router.LOGIN}><Login/></Route>
            <Route path={router.REGISTER}><Register/></Route>
            <Route path={router.RECOVER_PASSWORD}><RecoveryPass/></Route>
            <Route path={router.ADMIN}><Root/></Route>
          </Switch>
        </ErrorBoundaries>
      </Router>
    </Suspense>
  );
});

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
