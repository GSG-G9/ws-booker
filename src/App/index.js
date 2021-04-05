import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../firebase/context';
import postBooking from '../firebase/firestore/booking/index';
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

postBooking('0QgtDLY6AEhCUK40z9lI', '0uXc9bOuRMYyzbO8rXJB', {
  book_capacity: 400,
  book_start_time: 'March 1, 2021 at 9:00:00 AM UTC+3',
  book_end_time: 'March 30, 2021 at 9:00:00 AM UTC+3',
})
  .then((data) => console.log('data', data))
  .catch((err) => console.log(err));

const App = () => (
  <AuthProvider>
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
  </AuthProvider>
);

export default App;
