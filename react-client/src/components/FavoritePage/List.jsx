import React from 'react';
import { Paper } from 'material-ui';
// import Favorite from './Favorite.jsx';

const List = ({favorites}) => {
  return (
    <Paper>
          <IconButton 
            style={{float: 'right', marginRight: '50px'}}
            onClick={() => console.log('clicked')}
          >
            <ActionDeleteForever />
          </IconButton>
      <ol>
        {restaurants.map((restaurant, i) => (
          <li key={i}>
            <Restaurant restaurant={restaurant} saveFavorite={saveFavorite}/>
          </li>
        ))}
      </ol>
    </Paper>
  )
}

export default List;