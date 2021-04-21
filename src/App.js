import { useCallback, useEffect, useReducer, useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';

import { reducer } from './reducer';

import RecordsContainer from './components/RecordsContainer';
import Shelves from './components/Shelves';
import './App.css';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

export default function App() {
  const [records, setRecords] = useState([]);

  const [shelves, dispatch] = useReducer(reducer, {});
  
  const [pagination, setPagination] = useState();
  const [user, setUser] = useState('blacklight');
  const [editUser, setEditUser] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const onDragEnd = useCallback(
    result => {
      const { source, destination } = result;

      const validDrop = () => {
      
        // if (result.draggableId.contains(destination.droppableId))

        // const delim = "_";
        // const srcId = source.draggableId.split(delim)[1];
        // const destinationId = destination.draggableId.split(delim)[1];
//debugger

        // this doesn't work because it's comparing shelves.
        // It needs to be a lookup of records in the shelf.

        return ! result.draggableId.includes(destination.droppableId);
      }

      if (!destination) {
        return;
      }

      if (source.droppableId === 'container') {
        // debugger
        dispatch({
          type: 'addRecordToShelf',
          shelfId: destination.droppableId,
          recordId: result.draggableId,
        })
      } else if (source.droppableId === destination.droppableId) {
        dispatch({
          type: 'reorderInShelf',
          shelfId: source.droppableId,
          oldIndex: source.index,
          newIndex: destination.index,
        });
      } else if (validDrop()) {
        dispatch({
          type: 'moveBetweenShelves',
          oldShelf: source.droppableId,
          newShelf: destination.droppableId,
          oldIndex: source.index,
          newIndex: destination.index,
        });
      } else {
        // error handling;
      }
    },
    [dispatch],
  );

  // TODO: do we want a default user like this? it should be stored elsewhere
  function getCollection (page='1', user) {
    const base = 'https://api.discogs.com/users/' //TODO: store this in a config?

    fetch(
      `${base}${user}/collection/folders/0/releases?page=${page}&per_page=10`,
    )
      .then(resp => resp.json())
      .then(json => {
        // TODO make sure this doesn't mutate existing list ...
        setPagination(json.pagination);
        setRecords(
          json.releases.map(release => {
            const { id, basic_information: info } = release;
            return {
              id: `${id}`,
              title: info.title,
              formats: info.formats.map(format => format.name),
              label: info.labels?.[0]?.name ?? '',
              artists: info.artists.map(artist => artist.name),
              date: info.year,
            };
          }),
        );
      });
  }

  useEffect(() => {
    getCollection(1, user);
  }, []);

  return (
    <Container style={{position: 'relative'}}>
      <h1>Record Shelves App</h1>
      <div style={{position: 'absolute', top: '10px', right: '10px'}}>
        { !editUser &&
        <>
        <label>User: </label>{user}
        <IconButton aria-label="edit" onClick={()=>setEditUser(true)}>
          <EditIcon />
        </IconButton>
        </>
        }
        { editUser &&
        <>
        <TextField id="standard-basic" value={tempUser} label="Standard" onChange={(e) => setTempUser(e.target.value)}/>
        <button onClick={() => {setUser(tempUser);setEditUser(false);}}>Change User</button>
        </>
        }
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <RecordsContainer
              records={records}
              shelves={shelves}
              dispatch={dispatch}
              onUpdate={(page)=>getCollection(page, user)}
              pagination={pagination}
            />
          </Grid>

          <Grid item xs={9}>
              <Shelves records={records} shelves={shelves} dispatch={dispatch} />
          </Grid>
        </Grid>
        </DragDropContext>
    </Container>
  );
}
