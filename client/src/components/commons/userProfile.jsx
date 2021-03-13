import React, { Component } from 'react';
import Header from './header';
import Button from './button';
import { getCurrentUser } from './../../services/auth';

class UserProfile extends Component {
  
  render() { 
    const user = getCurrentUser().user
    const text = "Welcome " + user + "!"
    return ( 
    <React.Fragment >
      <Header title={text}/> 
      <div className="container pos">
          <div >
          <Button style="buttonsize btn btn-secondary" handleButton={() => this.props.history.push('/guest')} text="Play" />
          </div>
          <div >
          <Button style="buttonsize btn btn-primary" handleButton={() => this.props.history.push(`/games/`)} text="My Games" />
          </div>
          <div >
          <Button style="buttonsize btn btn-primary" handleButton={() => this.props.history.push('/invitations')} text="Friend's Games" />
          </div>
          <div >
          <Button style="buttonsize btn btn-danger" handleButton={() => this.props.history.push('/delete')} text="Delete profile" />
          </div>
      </div>
  </React.Fragment> );
  }
}
 
 
export default UserProfile;