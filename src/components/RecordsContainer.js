import { List } from '@material-ui/core';

import Record from './Record';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
// import { styled } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    height: 'calc(100vh - 13rem)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 30px',
  },
  pagination: {
    marginTop: '10px',
  }
});

function RecordsContainer({ records, shelves, dispatch, pagination, onUpdate }) {

  const classes = useStyles();

  const handleChange = (e, value) => {
    onUpdate(value)
  };

  return (
    <>
      <h2>Records</h2>
      {/* <List
        style={{
          backgroundColor: '#f5f5f5',
          height: 'calc(100vh - 12rem)',
          overflow: 'scroll',
        }}
      >
        {records.map(record => (
          <Record
            key={record.id}
            record={record}
            shelves={shelves}
            dispatch={dispatch}
          />
        ))}
      </List> */}

      <Droppable droppableId={'container'} direction="vertical">
          {(provided, snapshot) => (
            <List
              ref={provided.innerRef}
              className={classes.container}
            >
              {records.length ? (
                records.map((record, index) => (
                  <Draggable
                    key={record.id}
                    draggableId={record.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <span
                        key={record.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Record
                          key={record.id}
                          record={record}
                          shelves={shelves}
                          dispatch={dispatch}
                        />
                      </span>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>Loading.. {/* this shouldn't be static */}</p>
              )}
            </List>
          )}
        </Droppable>
        <Pagination
          className={classes.pagination}
          count={pagination?.pages}
          siblingCount={0}
          variant="outlined"
          onChange={handleChange}
        />
    </>
  );
}

export default RecordsContainer;