// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';
import { useNotification } from './NotificationProvider';

const Wrapper = styled(animated.div)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-right: 16px;
  margin-top: 16px;
  font-size: 14px;
  position: relative;
  padding: 16px;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  background: ${props => (props.type === 'success') ? '#5cb85c' : '#d9534f'};
  box-shadow: 0px 4px 10px 0px #d7d7d7;
  color: #fff;
`;

const Notification = ({ children, id, type }) => {
  const { removeNotification } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeNotification]);

  return (
    <Wrapper type={type}>
      {type === 'success' ? (
        <FontAwesomeIcon icon={faCheckCircle} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faTimesCircle} size="lg" />
      )}
      <span style={{ marginLeft: '10px' }}>{children}</span>
    </Wrapper>
  );
};

export default Notification;
