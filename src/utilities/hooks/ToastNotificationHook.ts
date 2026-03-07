import { ToastNotificationContext } from "@/utilities/contexts/ToastNotificationContext";
import { useContext } from "react";

export interface ToastNotificationHookOutput {
  newNotification(content: string): void;
  clear(): void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

export const useToastNotification = (): ToastNotificationHookOutput => {
  const { newNotification, clear, notificationsEnabled, toggleNotifications } =
    useContext(ToastNotificationContext);

  return {
    newNotification,
    clear,
    notificationsEnabled,
    toggleNotifications,
  };
};
