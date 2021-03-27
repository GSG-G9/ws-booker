import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
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
} from '../utils/constants';
import './style.css';
import AboutPage from '../pages/About';
import AdminLogin from '../pages/AdminLogin';
import DashboardAddWorkspace from '../pages/DashboardAddWorkspace';
import DashboardAllWorkspaces from '../pages/DashboardAllWorkspaces';
import HomePage from '../pages/HomePage';
import NewestWorkspacesPage from '../pages/NewestWorkspaces';
import SearchResults from '../pages/SearchResults';
import TopRatedPage from '../pages/TopRatedWorkspaces';
import UserProfilePage from '../pages/UserProfile';
import WorkSpaceProfilePage from '../pages/WorkSpaceProfile';
import NotFound from '../pages/NotFound';

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

      <Router>
        <NotFound />
      </Router>
    </Switch>
  </Router>
);

export default App;
