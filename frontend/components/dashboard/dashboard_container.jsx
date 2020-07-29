import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { logout } from "../../actions/session_actions";

const msp = state => {
    return {
        currentUser: state.session.user,
    }
}

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(msp, mdp)(Dashboard);