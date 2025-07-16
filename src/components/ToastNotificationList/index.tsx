import React from "react";
import { ToastNotification } from "../../utilities/providers/ToastNotificationProvider";
import { ClearButton, Item, List } from "./styles";

export interface Props {
  notifications: ToastNotification[];
  clear(): void;
}

const ToastNotificationList: React.FC<Props> = ({ notifications, clear }) => {
  return (
    <List>
      {!!notifications.length && <ClearButton onClick={clear}>✕</ClearButton>}
      {notifications.map((notification) => (
        <Item key={notification.id}>{notification.content}</Item>
      ))}
    </List>
  );
};

export default ToastNotificationList;
