import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Redirect, Switch } from 'react-router-dom';
import Board from './components/board';
import LoginForm from "./components/loginForm";
import GameForm from "./components/gameForm";
import SignupForm from './components/signupForm';
import Home from './components/home';
import NavBar from './components/navBar';
import UserProfile from './components/common/userProfile';
import CategoriesTable from './components/CategoriesTable';
import GamesTable from './components/gamesTable';
import Logout from './components/logout';
import { getCurrentUser } from './services/auth';
import ProtectedRoute from './components/common/protectedRoute';
import NotFound from './components/common/notFound';
import Invitation from './components/invitation';
import Invite from './components/invite';
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css'
import PlayGeneral from './components/playGeneral';
import Delete from './components/delete';

class App extends Component {
  state = {
    windowWidth: 0
  }

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions ()
  }

  updateDimensions = () => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    this.setState({ windowWidth })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { user, windowWidth } = this.state
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/guest"
            render={props => <PlayGeneral {...props} windowWidth={windowWidth} />} />
          <ProtectedRoute path="/delete" to="/login" component={Delete} />
          <ProtectedRoute path="/invite/:category" to="/login" component={Invite} />
          <ProtectedRoute 
            path="/invitations" to="/login" 
            render={props => <Invitation {...props} windowWidth={windowWidth}/>} />
          <ProtectedRoute path="/games/:category/:id" to="/login" component={GameForm} />
          <ProtectedRoute path="/games/:category" to="/login" component={GamesTable} />
          <Route
           path="/board/:user/:category" 
           render={props => <Board {...props} windowWidth={windowWidth}/>} />
          <ProtectedRoute 
            path="/games" to="/login" 
            render={props => <CategoriesTable {...props} windowWidth={windowWidth} />} />
          <ProtectedRoute path="/profile" to="/login" component={UserProfile} />
          <Route path="/not-found" component={NotFound} />
          <ProtectedRoute path="/" exact to="/profile" user={true} component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    )
  }



}

export default App;
