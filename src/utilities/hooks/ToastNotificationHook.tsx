import { useContext } from "react";
import { ToastNotificationContext } from "../contexts/ToastNotificationContext";

export interface ToastNotificationHookOutput {
  newNotification(content: string): void;
  clear(): void;
}

export const useToastNotification = (): ToastNotificationHookOutput => {
  const { newNotification } = useContext(ToastNotificationContext);

  return {
    newNotification,
    clear() {},
  };
};
