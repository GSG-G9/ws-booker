import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Button } from 'antd';
import { AuthContext, AuthProvider } from '../firebase/context';
import Nav from '../Login/Nav';
import SignIn from '../Login/Signin';

import {
  About,
  AllWorkspaces,
  AddWorkspace,
  Home,
  Login,
  NewestWorkspaces,
  Search,
  TopRatedWorkspaces,
  UserProfile,
  WorkspaceProfile,
} from '../utils';
import {
  AboutPage,
  AdminLogin,
  DashboardAddWorkspace,
  DashboardAllWorkspaces,
  HomePage,
  NewestWorkspacesPage,
  SearchResults,
  TopRatedPage,
  UserProfilePage,
  WorkSpaceProfilePage,
  NotFound,
} from '../pages';

console.log(AuthProvider);
const App = () => (
  <AuthProvider>
    <Router>
      <SignIn />

      <Switch>
        <Route exact path={Login}>
          <AdminLogin />
        </Route>
        <Route exact path={AllWorkspaces}>
          <DashboardAllWorkspaces />
        </Route>
        <Route exact path={AddWorkspace}>
          <DashboardAddWorkspace />
        </Route>
        <Route exact path={Home}>
          <HomePage />
        </Route>
        <Route exact path={About}>
          <AboutPage />
        </Route>
        <Route exact path={NewestWorkspaces}>
          <NewestWorkspacesPage />
        </Route>
        <Route exact path={TopRatedWorkspaces}>
          <TopRatedPage />
        </Route>
        <Route exact path={Search}>
          <SearchResults />
        </Route>
        <Route exact path={WorkspaceProfile}>
          <WorkSpaceProfilePage />
        </Route>

        <Route exact path={UserProfile}>
          <UserProfilePage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
