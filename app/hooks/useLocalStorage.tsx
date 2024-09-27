// import { useEffect, useState } from "react";

import React from "react";

// export function useLocalStorage<T>(key: string, defaultValue: T) {
//   const [value, setValue] = useState(() => {
//     const stickyValue = window.localStorage.getItem("key");
//     return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);
//   return [value, setValue];
// }

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
