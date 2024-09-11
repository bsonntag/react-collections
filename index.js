import { useState } from 'react';

function useRerender() {
  const [, setRenderTicker] = useState(0);
  return () => setRenderTicker((current) => (current + 1) % 100);
}

function createCollectionProxy(collection, mutationMethods, onMutate) {
  return new Proxy(collection, {
    get(target, key, receiver) {
      const value = target[key];
      if (value instanceof Function) {
        return function (...args) {
          if (mutationMethods.includes(key)) onMutate();
          return value.apply(this === receiver ? target : this, args);
        };
      }
      return value;
    },
  })
}

export function useMap(init) {
  const rerender = useRerender();
  const [map] = useState(() => {
    return createCollectionProxy(
      new Map(init instanceof Function ? init() : init),
      ['set', 'delete', 'clear'],
      rerender
    );
  });
  return map;
}

export function useSet(init) {
  const rerender = useRerender();
  const [set] = useState(() => {
    return createCollectionProxy(
      new Set(init instanceof Function ? init() : init),
      ['add', 'delete', 'clear'],
      rerender
    );
  });

  return set;
}