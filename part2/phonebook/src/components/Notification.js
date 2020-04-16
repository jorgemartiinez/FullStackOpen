import React from 'react'

const Notification = ({ notification }) => {

    let style = {};

    if (!notification.message) {
        return (
            <div></div>
        );
    }

    if (notification.type === 'success') {
        style = {
            color: 'white',
            backgroundColor: 'green',
            fontStyle: 'italic',
            border: '2px solid black',
            padding: '20px',
            fontSize: 18
        }
    } else {
        style = {
            color: 'white',
            backgroundColor: 'red',
            fontStyle: 'italic',
            border: '2px solid black',
            padding: '20px',
            fontSize: 18
        }
    }
    return (
        <div>
            <p style={style}>{notification.message}</p>
        </div>
    )
}

export default Notification
