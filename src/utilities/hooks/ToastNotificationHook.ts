import { ToastNotificationContext } from "@/utilities/contexts/ToastNotificationContext";
import { useContext } from "react";

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
