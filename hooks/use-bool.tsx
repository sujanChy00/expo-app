import { useState } from 'react';

export const useBool = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(!value);
  return [value, toggle, setValue] as const;
};
