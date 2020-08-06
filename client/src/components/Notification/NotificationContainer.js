import React from 'react';
import { createPortal } from 'react-dom';
import { useTransition } from 'react-spring';
import Notification from './index';

const NotificationContainer = ({ notifications }) => {
  const transitions = useTransition(
    notifications,
    (notification) => notification.id,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    }
  );

  return createPortal(
    <div
      style={{
        position: 'absolute',
        right: 50,
        bottom: 50,
        zIndex: 1,
      }}
    >
      {transitions.map(({ item, key }) => (
        <Notification key={key} id={item.id} type={item.type}>
          {item.content}
        </Notification>
      ))}
    </div>,
    document.body
  );
};

export default NotificationContainer;
