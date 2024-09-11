import '@testing-library/jest-dom/vitest'
import React from 'react';
import userEvent from '@testing-library/user-event'
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest'
import { useMap, useSet } from '.';
import { map } from './map';

afterEach(cleanup);

describe('useSet', () => {
  function TestApp({ initialEntries }) {
    const items = useSet(initialEntries);

    return (
      <div>
        <ul>
          {map(items, item => <li key={item}>{item}</li>)}
        </ul>
        <button onClick={() => items.add('biz')}>add</button>
        <button onClick={() => items.delete('biz')}>remove</button>
      </div>
    );
  }

  it('should return a set that makes the component rerender when updated', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<TestApp initialEntries={['foo', 'bar']} />);

    const list = getByRole('list');

    expect(list).toHaveTextContent('foo');
    expect(list).toHaveTextContent('bar');

    await user.click(getByRole('button', { name: 'add' }));
    expect(list).toHaveTextContent('biz');

    await user.click(getByRole('button', { name: 'remove' }));
    expect(list).not.toHaveTextContent('biz');
  });
});

describe('useMap', () => {
  function TestApp({ initialEntries }) {
    const items = useMap(initialEntries);

    return (
      <div>
        <table>
          <tbody>
            {map(items, (value, key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => items.set('age', 32)}>add</button>
        <button onClick={() => items.delete('age')}>remove</button>
      </div>
    );
  }

  it('should return a set that makes the component rerender when updated', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <TestApp initialEntries={Object.entries({ name: 'John Doe', email: 'johndoe@example.com' })} />
    );

    const table = getByRole('table');

    expect(table.rows).toHaveLength(2);
    expect(table.rows[0].cells[0]).toHaveTextContent('name');
    expect(table.rows[0].cells[1]).toHaveTextContent('John Doe');
    expect(table.rows[1].cells[0]).toHaveTextContent('email');
    expect(table.rows[1].cells[1]).toHaveTextContent('johndoe@example.com');

    await user.click(getByRole('button', { name: 'add' }));
    expect(table.rows).toHaveLength(3);
    expect(table.rows[2].cells[0]).toHaveTextContent('age');
    expect(table.rows[2].cells[1]).toHaveTextContent('32');

    await user.click(getByRole('button', { name: 'remove' }));
    expect(table.rows).toHaveLength(2);
  });
});