import { createContext } from "react";
import { ToastNotification } from "../providers/ToastNotificationProvider";

export interface ToastNotificationContextValue {
  notifications: ToastNotification[];
  newNotification: (content: string) => void;
  clear(): void;
}

export const ToastNotificationContext =
  createContext<ToastNotificationContextValue>(
    {} as ToastNotificationContextValue
  );
