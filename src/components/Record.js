import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
} from '@material-ui/core';

export default function Record({ record, shelf, shelves, dispatch }) {

  const isOnShelf = shelf;
  const shelvesExist = shelves && Object.keys(shelves).length;
  return (
    <ListItem key={record.id}>
      <Card style={{ width: '260px' }}>
        <CardContent>
          <p>Title: {record.title}</p>
          <p>Artist(s):{record.artists.join(', ')}</p>
          <p>Label: {record.label}</p>
          <p>Formats: {record.formats.join(', ')}</p>
          <p>{record.id}</p>
        </CardContent>

        <CardActions>
          {isOnShelf ? (
            <Button
              onClick={() =>
                dispatch({
                  type: 'removeRecordFromShelf',
                  shelfId: shelf.id,
                  recordId: record.id,
                })
              }
            >
              Remove
            </Button>
          ) : shelvesExist ? (
            <FormControl style={{ minWidth: '120px' }}>
              <InputLabel>Add to shelf</InputLabel>
              <Select
                data-testid="add-shelf"
                value=""
                onChange={evt =>
                  dispatch({
                    type: 'addRecordToShelf',
                    shelfId: evt.target.value,
                    recordId: record.id,
                  })
                }
              >
                {Object.values(shelves).map(shelf => {
                  const isRecordOnShelf = shelf.records.includes(record.id);
                  return  (
                  <MenuItem key={shelf.id} value={shelf.id} disabled={isRecordOnShelf}>
                    {shelf.name}
                  </MenuItem>
                )})}
              </Select>
            </FormControl>
          ) : null}
        </CardActions>
      </Card>
    </ListItem>
  );
}

