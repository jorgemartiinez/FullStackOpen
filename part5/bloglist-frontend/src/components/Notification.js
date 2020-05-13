import React from 'react';

const Notification = ({ notification }) => {
  let className = '';

  if (!notification.message) {
    return null;
  }

  if (notification.type === 0) {
    // error ocurred
    className = 'error';
  } else {
    className = 'success';
  }

  return <p className={className}>{notification.message}</p>;
};

export default Notification;
