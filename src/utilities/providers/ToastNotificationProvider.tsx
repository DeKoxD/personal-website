import ToastNotificationList from "@/components/ToastNotificationList";
import { ToastNotificationContext } from "@/utilities/contexts/ToastNotificationContext";
import { PropsWithChildren, useRef, useState } from "react";
import { LocalStorageKey } from "../enums/LocalStorageKeys";
import { useLocalStorage } from "../hooks/LocalStorageHook";

export interface ToastNotification {
  id: number;
  content: string;
  timestamp: Date;
  expiresAt: Date;
  timeoutId: number;
}

export interface ToastNotificationProviderProps extends PropsWithChildren {
  expiration?: number;
}

const ToastNotificationProvider: React.FC<ToastNotificationProviderProps> = ({
  expiration = 3000,
  children,
}): React.ReactElement => {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] =
    useLocalStorage<boolean>(LocalStorageKey.NotificationsEnabled, true);
  const sequence = useRef(0);

  function newNotification(content: string) {
    if (!notificationsEnabled) return;

    const id = sequence.current++;
    const timestamp = new Date();
    const expiresAt = new Date(Date.now() - expiration);
    setNotifications((value) => [...value, notification]);
    const timeoutId = setTimeout(() => {
      const now = new Date();
      setNotifications((value) =>
        value.filter((item) => item.id != id && item.expiresAt < now),
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

  function toggleNotifications() {
    setNotificationsEnabled((state) => !state);
  }

  return (
    <ToastNotificationContext.Provider
      value={{
        notifications,
        newNotification,
        clear,
        notificationsEnabled,
        toggleNotifications,
      }}
    >
      <ToastNotificationList notifications={notifications} clear={clear} />
      {children}
    </ToastNotificationContext.Provider>
  );
};

export default ToastNotificationProvider;
