import React, { useCallback, useContext, useState } from 'react';
import NotificationContainer from './NotificationContainer';

const NotificationContext = React.createContext(null);

let id = 1;

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (content, type) => {
      setNotifications((notifications) => [
        ...notifications,
        {
          id: id++,
          content,
          type,
        },
      ]);
    },
    [setNotifications]
  );

  const removeNotification = useCallback(
    (id) => {
      setNotifications((notifications) =>
        notifications.filter((t) => t.id !== id)
      );
    },
    [setNotifications]
  );

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification,
      }}
    >
      <NotificationContainer notifications={notifications} />
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const notificationHelpers = useContext(NotificationContext);

  return notificationHelpers;
};

export { NotificationContext, useNotification };
export default NotificationProvider;
