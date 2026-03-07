import { ToastNotification } from "@/utilities/providers/ToastNotificationProvider";
import React from "react";
import { ClearButton, Item, List } from "./styles";

export interface ToastNotificationListProps {
  notifications: ToastNotification[];
  clear(): void;
}

const ToastNotificationList: React.FC<ToastNotificationListProps> = ({
  notifications,
  clear,
}) => {
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
