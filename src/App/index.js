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
import { addWorkspace } from '../firebase/firestore/workspace';
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

// const payload = {
//   name: 'The Best2',
//   description:
//     'uMake is a CoWorking Space and Makerspace based in the center of Ramallah City in Palestine',
//   days_of_work: ['Sun', 'Mon'],
//   start_time: '09:00:00',
//   end_time: '20:00:00',
//   fees_per_hour: 10,
//   fees_per_day: 50,
//   capacity: 60,
//   location: '5th Floor, Ammar Tower, Ramallah, Palestine',
//   amenities: ['High-Speed WiFi', 'Heating', 'Air Conditioning'],
//   city: 'gaza',
//   header_image:
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/main-1522929829.jpg?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//   image_gallery: [
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/1-1540639636.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/2-1540639637.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//     'https://coworker.imgix.net/photos/palestine/ramallah/umake/3-1540639637.JPG?w=1200&h=0&q=90&auto=format,compress&fit=crop&mark=/template/img/wm_icon.png&markscale=5&markalign=center,middle',
//   ],
//   rating: 4,
// };
// addWorkspace(payload)
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));
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
