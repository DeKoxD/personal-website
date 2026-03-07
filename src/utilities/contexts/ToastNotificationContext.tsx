import { ToastNotification } from "@/utilities/providers/ToastNotificationProvider";
import { createContext } from "react";

export interface ToastNotificationContextValue {
  notifications: ToastNotification[];
  newNotification: (content: string) => void;
  clear(): void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

export const ToastNotificationContext =
  createContext<ToastNotificationContextValue>(
    {} as ToastNotificationContextValue,
  );
