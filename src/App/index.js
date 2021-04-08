import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../firebase/context';
// import { postBooking } from '../firebase/firestore/booking/index';
// import getBookingByDate from '../firebase/firestore/booking/getBookingByDate';
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

// postBooking('0QgtDLY6AEhCUK40z9lI', '0uXc9bOuRMYyzbO8rXJB', {
//   book_capacity: 25,
//   book_start_time: 'Apr 23 2021 16:05:00',
//   book_end_time: 'Apr 24 2021 17:00:00',
//   book_days: [],
// })
//   .then((data) => console.log('data', data))
//   .catch((err) => console.log(err));

// getBookingByDate(
//   '0uXc9bOuRMYyzbO8rXJB',
//   'Apr 10 2021 10:00:00',
//   'Apr 12 2021 10:00:00'
// ).then((data) => console.log('data', data));
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
