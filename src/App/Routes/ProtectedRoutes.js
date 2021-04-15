import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../firebase/context';
import { Home } from '../../utils';
import Loader from '../../components/CommonComponents/Loader';

const ProtectedRoutes = ({ path, component }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  if (user) {
    return <Route exact path={path} component={component} />;
  }
  return <Redirect to={Home} />;
};

ProtectedRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default ProtectedRoutes;
