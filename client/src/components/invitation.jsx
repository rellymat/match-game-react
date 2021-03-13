import React, { Component } from 'react';
import { getArray } from '../services/gameService';
import { putInvitations, getInvitations, deleteInvitations } from './../services/userService';
import TableHeader from './common/tableHeader';
import Notifications from './notifications';
import { toast } from 'react-toastify';


class Invitations extends Component {
    state = {
        invitations: [],
        buttons: [
            {
                name: 'Play',
                style: 'btn btn-primary'
            },
            {
                name: 'Delete',
                style: 'btn btn-danger'
            }
        ]
    }

    onDelete = async invitation => {
        const  invitations  = this.state.invitations
        const index = this.getIndex(invitations, invitation)
        const myNot = invitations[index]

        const invitationNew = invitations.filter(n => n !== myNot)
        this.setState({ invitations: invitationNew })
        
        try {
            await deleteInvitations(myNot['user'], myNot['category'])
        } catch (error) {
            this.setState({ invitations })
        } 
    }

    getIndex = (arr, value) => {
        return arr.findIndex(n => 
            (n['user'] + " " + n['category']) === value )
    }

    onPlay = async invitation => {
        const  invitations  = this.state.invitations
        const index = this.getIndex(invitations, invitation)
        
        const myNot = invitations[index]

        try {
            await getArray( myNot['category'], myNot['user'])
            this.props.history.push(`/board/${myNot['user']}/${myNot['category']}`) 
        } catch (error) {
            toast.error("Game not exists")
            this.onDelete(invitation)
        }
                  
        
    }

    selectFunction = (invitation, button) => {
        switch (button) {
            case 'Play':
                this.onPlay(invitation)
                break;
            case 'Delete':
                this.onDelete(invitation)
                break;
            default:
                break;
        }
    }

    async componentDidMount() {
        let { data: invitations } = await getInvitations()
        invitations = invitations['invitation']
        this.setState({ invitations })
    }


    render() {
        const { invitations, buttons } = this.state
        const style = this.props.windowWidth > 768 ? {'width': '40%'} : {}
        const classNameNotification = this.props.windowWidth > 768 ? "notification" : ""
        const className = this.props.windowWidth > 768 ? "table center" : "table "
        return (
            <React.Fragment>
                <div className={classNameNotification}>
                    <Notifications windowWidth={this.props.windowWidth}/>
                </div>
                <h1 >Friend's Games</h1>
                {invitations.length === 0  &&
                    <p style={{textAlign: 'center'}}>You don't have any invitations</p>}
                <table style={style} className={className}>
                    {invitations.map((n, index) =>
                        <TableHeader
                            key={index}
                            index={index}
                            buttons={buttons}
                            handleButton={this.selectFunction}
                            input={n['user'] + ' ' + n['category']} 
                            windowWidth={this.props.windowWidth}
                            />
                    )}
                </table>
            </React.Fragment>
        );
    }
}

export default Invitations;