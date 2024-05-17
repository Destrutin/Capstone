import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue = null) => {
  const [item, setItem] = useState(() => {
    let value = window.localStorage.getItem(key) || defaultValue;
    return value;
  });
  useEffect(() => {
    if (item === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, item);
    }
  }, [key, item]);
  return [item, setItem];
};

export default useLocalStorage;
