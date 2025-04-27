import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
	  try {
		const stored = localStorage.getItem(key);
		if (stored !== null) {
		  return JSON.parse(stored);
		}
		// If initialValue is a function, call it
		return typeof initialValue === 'function' ? initialValue() : initialValue;
	  } catch (error) {
		console.error(`Error parsing localStorage key "${key}":`, error);
		return typeof initialValue === 'function' ? initialValue() : initialValue;
	  }
	});
  
	useEffect(() => {
	  try {
		localStorage.setItem(key, JSON.stringify(value));
	  } catch (error) {
		console.error(`Error setting localStorage key "${key}":`, error);
	  }
	}, [key, value]);
  
	return [value, setValue];
  }
  

export default useLocalStorage;