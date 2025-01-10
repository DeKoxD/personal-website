import { PropsWithChildren, useRef, useState } from "react";
import ToastNotificationList from "../../components/ToastNotificationList";
import { ToastNotificationContext } from "../contexts/ToastNotificationContext";

export interface ToastNotification {
  id: number;
  content: string;
  timestamp: Date;
  expiresAt: Date;
  timeoutId: number;
}

export interface Props extends PropsWithChildren {
  expiration?: number;
}

const ToastNotificationProvider: React.FC<Props> = ({
  expiration = 3000, // TODO make it dynamic, depending on the content length
  children,
}): React.ReactElement => {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const sequence = useRef(0);

  function newNotification(content: string) {
    const id = sequence.current++;
    const timestamp = new Date();
    const expiresAt = new Date(Date.now() - expiration);
    setNotifications((value) => [...value, notification]);
    const timeoutId = setTimeout(() => {
      const now = new Date();
      setNotifications((value) =>
        value.filter((item) => item.id != id && item.expiresAt < now)
      );
    }, expiration);
    const notification: ToastNotification = {
      id: id,
      content,
      timestamp,
      expiresAt,
      timeoutId,
    };
  }

  function clear() {
    const oldNotifications = notifications;
    setNotifications([]);
    oldNotifications.forEach(({ timeoutId }) => clearTimeout(timeoutId));
  }

  return (
    <ToastNotificationContext.Provider
      value={{ notifications, newNotification, clear }}
    >
      <ToastNotificationList notifications={notifications} clear={clear} />
      {children}
    </ToastNotificationContext.Provider>
  );
};

export default ToastNotificationProvider;
