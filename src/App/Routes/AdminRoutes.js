import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../firebase/context';
import { Home } from '../../utils';
import Loader from '../../components/CommonComponents/Loader';

const AdminRoutes = ({ path, component }) => {
  const { user, isLoading, isAdmin, isAdminLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  }
  if (isAdminLoading) {
    return <Loader />;
  }
  if (isAdmin && user) {
    return <Route exact path={path} component={component} />;
  }
  return <Redirect to={Home} />;
};
AdminRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.instanceOf(Object).isRequired,
};

export default AdminRoutes;
