import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log('state notification', notification);
  const style = {
    border: '1px solid green',
    padding: 10,
    borderWidth: 1,
    color: 'green',
    marginBottom: '10px'
  };
  return notification ? <div style={style}>{notification}</div> : null;
};

export default Notification;
