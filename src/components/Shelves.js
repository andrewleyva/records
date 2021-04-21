import { useCallback, useState } from 'react';

import { Button, Input, List } from '@material-ui/core';

import Shelf from './Shelf';

export default function Shelves({ records, shelves, dispatch }) {
  const [adding, setAdding] = useState(false);
  const [inputName, setInputName] = useState('');

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      dispatch({ type: 'createShelf', name: inputName });
      setAdding(false);
      setInputName('');
      return false;
    },
    [dispatch, inputName],
  );

  return (
    <>
      <h2>Shelves</h2>
      <List
        style={{
          height: 'calc(100vh - 12rem)',
          overflow: 'scroll',
        }}
      >
        {Object.values(shelves).map(shelf => (
          <Shelf
            key={shelf.id}
            records={records}
            shelf={shelf}
            dispatch={dispatch}
          />
        ))}

        {adding ? (
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <Input
              inputProps={{
                'data-testid': 'add-shelf',
              }}
              variant="outlined"
              value={inputName}
              onChange={evt => setInputName(evt.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: '1rem' }}
            >
              Submit
            </Button>
          </form>
        ) : (
          <Button variant="contained" onClick={() => setAdding(true)}>
            Add Shelf
          </Button>
        )}
      </List>
    </>
  );
}
