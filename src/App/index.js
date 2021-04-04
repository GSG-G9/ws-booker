import React from 'react';
import './style.less';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../firebase/context';
import addWorkspace from '../firebase/firestore/workspace';
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

const payload = {
  name: 'Makan',
  description:
    'uMake is a CoWorking Space and Makerspace based in the center of Ramallah City in Palestine',
  days_of_work: [1, 2.3],
  start_time: '09:00:00',
  end_time: '20:00:00',
  fees_per_hour: 10,
  fees_per_day: 50,
  capacity: 60,
  location: '5th Floor, Ammar Tower, Ramallah, Palestine',
  amenities: ['High-Speed WiFi', 'Heating', 'Air Conditioning'],
  city: 'Deir-Albalah',
  header_image:
    'https://coworker.imgix.net/photos/palestine/ramallah/umake/main-1522929829.jpg?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
  image_gallery: [
    'https://coworker.imgix.net/photos/palestine/ramallah/umake/1-1540639636.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
    'https://coworker.imgix.net/photos/palestine/ramallah/umake/2-1540639637.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
    'https://coworker.imgix.net/photos/palestine/ramallah/umake/3-1540639637.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
  ],
  rating: 4,
  reviewers_number: 16,
};
addWorkspace(payload)
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
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
