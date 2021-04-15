import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../firebase/context';
import { ProtectedRoutes, AdminRoutes } from './Routes';
import {
  About,
  AllWorkspaces,
  AddWorkspace,
  Home,
  NewestWorkspaces,
  Search,
  TopRatedWorkspaces,
  UserProfile,
  WorkspaceProfile,
} from '../utils';
import {
  AboutPage,
  DashboardAddWorkspace,
  DashboardAllWorkspaces,
  HomePage,
  NewestWorkspacesPage,
  SearchResults,
  TopRatedPage,
  UserProfilePage,
  WorkSpaceProfilePage,
  NotFound,
  Layout,
} from '../pages';

const App = () => (
  <AuthProvider>
    <Router>
      <Layout>
        <Switch>
          <AdminRoutes
            path={AllWorkspaces}
            component={DashboardAllWorkspaces}
          />
          <AdminRoutes path={AddWorkspace} component={DashboardAddWorkspace} />
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
          <ProtectedRoutes path={UserProfile} component={UserProfilePage} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </AuthProvider>
);

export default App;
