import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../firebase/context';
import Header from '../components/Layout/Header';
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
  <AuthProvider>
    <Router>
      <Header />
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
        <Route
          exact
          path={TopRatedWorkspaces}
          render={(props) => <TopRatedPage {...props} />}
        />

        <Route exact path={Search}>
          <SearchResults />
        </Route>
        <Route exact path={WorkspaceProfile}>
          <WorkSpaceProfilePage />
        </Route>

        <Route
          exact
          path={UserProfile}
          render={(props) => <UserProfilePage {...props} />}
        />

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </AuthProvider>
);

export default App;
