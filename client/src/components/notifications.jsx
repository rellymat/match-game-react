import React, { Component } from 'react';
import { deleteNotifications, getNotifications, putInvitations} from '../services/userService'
import TableHeader from './common/tableHeader';
import Button from './common/button';

class Notifications extends Component {
    state = {
        showNotification: false,
        notifications: [],
        buttons: [
            {
                name: 'Confirm',
                style: 'btn btn-primary'
            },
            {
                name: 'Delete',
                style: 'btn btn-danger'
            }
        ]
    }

    showTable = () => {
        this.setState({showNotification: !this.state.showNotification})
    }

    buttonName = () => {
        return this.state.showNotification ? "Hide Notification" : "Show Notification"
    }

    onDelete = async notification => {
        const  notifications  = this.state.notifications
        const index = notifications.findIndex(n => 
            (n['user'] + " " + n['category']) === notification )
        
        const myNot = notifications[index]

        const notificationNew = notifications.filter(n => n !== myNot)
        this.setState({ notifications: notificationNew })
        
        try {
            await deleteNotifications(myNot['user'], myNot['category'])
        } catch (error) {
            this.setState({ notifications })
        } 
    }

    onConfirm = async notification => {
        const  notifications  = this.state.notifications
        const index = notifications.findIndex(n => 
            (n['user'] + " " + n['category']) === notification )
        
        const myNot = notifications[index]

        const notificationNew = notifications.filter(n => n !== myNot)
        this.setState({ notifications: notificationNew })
        
        try {
            await deleteNotifications(myNot['user'], myNot['category'])
            await putInvitations(myNot['user'], myNot['category']) 
            window.location.reload();
        } catch (error) {
            this.setState({ notifications })
        } 
    }

    selectFunction = (notification, button) => {
        switch (button) {
            case 'Confirm':
                this.onConfirm(notification)
                break;
            case 'Delete':
                this.onDelete(notification)
                break;
            default:
                break;
        }
    }

    async componentDidMount() {
        let { data: notifications } = await getNotifications()
        notifications = notifications['notification']
        this.setState({ notifications })
    }


    render() {
        const { notifications, buttons, showNotification } = this.state
        const buttonName = this.buttonName()
        const background = showNotification ? "background" : ""
        const style = this.props.windowWidth > 768 ? {'width': '50%'} : {}

        return (
            <React.Fragment>
                <h4 style={{textAlign: 'center', color: 'red'}}>Notifications</h4>
                <div className="center">
                    <p>You have {notifications.length} notification</p>
                {notifications.length !== 0 &&
                <Button style="btn btn-secondary" text={buttonName} handleButton={this.showTable} />
                }
                </div>
                <table style={style} className="tableNotification">
                    {showNotification && notifications.map((n, index) =>
                        <TableHeader
                            key={index}
                            index={index}
                            buttons={buttons}
                            handleButton={this.selectFunction}
                            input={n['user'] + ' ' + n['category']}
                            windowWidth={this.props.windowWidth}
                            flag={true} />
                    )}
                </table>
            </React.Fragment>
        );
    }
}

export default Notifications;