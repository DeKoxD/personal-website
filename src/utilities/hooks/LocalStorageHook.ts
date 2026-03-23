import { useEffect, useState } from "react";

export type LocalStorageHookOutput<T> = [
  T,
  (value: T | ((prevState: T) => T)) => void,
];

function getLocalStorageValue<T>(key: string): T | undefined {
  const currentValue = localStorage.getItem(key);
  if (currentValue === undefined || currentValue === "undefined")
    return undefined;
  if (currentValue === null || currentValue === "null") return undefined;
  return JSON.parse(currentValue) as T;
}

function setLocalStorageValue<T>(key: string, value: T): boolean {
  const currentValue = localStorage.getItem(key);
  if (value === undefined) {
    if (currentValue === null) {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  } else {
    const stringifiedNewValue = JSON.stringify(value);
    if (currentValue === stringifiedNewValue) {
      return false;
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
}

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): LocalStorageHookOutput<T> => {
  const [lsValue, setLsValue] = useState<T>(() => {
    const currentValue = getLocalStorageValue<T>(key);
    if (currentValue === undefined) {
      setLocalStorageValue(key, defaultValue);
      return defaultValue;
    }
    return currentValue;
  });

  useEffect(() => {
    function handleEvent(e: StorageEvent) {
      if (e.key !== key) return;
      if (e.newValue === null) {
        const value =
          e.oldValue !== null ? JSON.parse(e.oldValue) : defaultValue;
        setLocalStorageValue(key, value);
        setLsValue(value);
        return;
      }
      setLsValue(JSON.parse(e.newValue) as T);
    }
    window.addEventListener("storage", handleEvent);
    return () => {
      window.removeEventListener("storage", handleEvent);
    };
  }, [key, defaultValue]);

  useEffect(() => {
    setLocalStorageValue(key, lsValue);
  }, [key, lsValue]);

  return [lsValue, setLsValue];
};
