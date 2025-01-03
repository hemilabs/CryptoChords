import { useRef, useEffect, MutableRefObject } from 'react';

export const useOnClickOutside = function <T extends HTMLElement>(
  handler?: (e: MouseEvent | TouchEvent) => void,
  initialRef?: MutableRefObject<T>,
) {
  const internalRef = useRef<T>(null);
  const ref = initialRef ?? internalRef;

  useEffect(
    function () {
      if (!handler) {
        return undefined;
      }
      const listener = function (e: MouseEvent | TouchEvent) {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(e.target as Node)) {
          return;
        }
        handler?.(e);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return function () {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );

  return ref;
};
