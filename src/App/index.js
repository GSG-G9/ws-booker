import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../firebase/context';
import { addUser } from '../firebase/firestore/user';
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

addUser({
  displayName: 'hala',
  email: 'hala@hala.com',
  phoneNumber: '1234456',
  photoURL:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinclipart.com%2Fpindetail%2FiixmbRo_user-profile-avatar-scalable-vector-graphics-icon-woman%2F&psig=AOvVaw3TVwHz7j5pUEs3b_S1dgtv&ust=1617689795846000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCkmaW65u8CFQAAAAAdAAAAABAD',
}).then((r) => console.log(r));
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
