declare module "@bsonntag/react-collections" {
  export function useSet<T>(init?: Iterable<T> | (() => Iterable<T>)): Set<T>;

  export function useMap<K, V>(init?: Iterable<[K, V]> | (() => Iterable<[K, V]>)): Map<K, V>;
}