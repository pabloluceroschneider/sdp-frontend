import { useState, useEffect } from 'react';

const useFilterable = () => {
  const [filterable, setfilterable] = useState(false);
  const handleUserKeyPress = event => {
    const { keyCode } = event;
    if (keyCode === 70) {
      setfilterable(f => !f);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [])
  return filterable;
}

export default useFilterable
