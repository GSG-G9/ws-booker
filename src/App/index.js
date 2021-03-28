import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './style.css';
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

const App = () => (
  <Router>
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
);

export default App;
