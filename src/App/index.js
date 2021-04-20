import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../firebase/context';
import { ProtectedRoutes, AdminRoutes } from './Routes';
// import { addBooking, postBooking } from '../firebase/firestore/booking';
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

// addBooking(
//   'joyJK89nRnTPwl7KztnbYFEJ1Yt2',
//   'tV5kAePWG9nWkxkEHoEv',
//   1,
//   'Apr 25 2021 16:05:00',
//   'Apr 29 2021 17:15:00'
// );
// postBooking('joyJK89nRnTPwl7KztnbYFEJ1Yt2', 'tV5kAePWG9nWkxkEHoEv', {
//   book_capacity: 1,
//   book_start_time: 'May 2 2021 17:00:00',
//   book_end_time: 'May 3 2021 18:10:00',
// }).then(console.log);
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
