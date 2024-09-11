# React Collections

This provides two React Hooks, `useSet` and `useMap`, that can be used to keep state in Sets or Maps, respectively.

## Why?

Sets and Maps are very interesting for a few reasons, but they are tricky to use as the value of `useState`,
because the methods they have to add and remove entries mutate the set/map instead of returning a new instance.

The hooks in this module give you a Set/Map that rerender the component when you mutate them,
so you don't have to worry about calling a setter function with a whole copy of the Set/Map.

## Example

```jsx
import { useSet } from '@bsonntag/react-collections';

function App() {
    const items = useSet(['foo', 'bar']);

    return (
        <div>
            <ul>
                {[...items].map(item => <li key={item}>{item}</li>)}
            </ul>
            {/* These will mutate the set and rerender the component: */}
            <button onClick={() => items.add('biz')}>add</button>
            <button onClick={() => items.delete('biz')}>remove</button>
        </div>
    );
}
```

## API

### `useSet`

```ts
function useSet<T>(
    init?: Iterable<T> | (() => Iterable<T>)
): Set<T>
```

Returns a Set that rerenders the component when it is updated.

Optionally receives initial entries for the Set, or a function that returns the initial entries.

### `useMap`

```ts
function useMap<K, V>(
    init?: Iterable<[K, V]> | (() => Iterable<[K, V]>)
): Map<K, V>
```

Returns a Map that rerenders the component when it is updated.

Optionally receives initial entries for the Map, or a function that returns the initial entries.

## License

MIT
