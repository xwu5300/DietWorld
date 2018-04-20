import React from 'react';
import { Paper } from 'material-ui';
import Favorite from './Favorite.jsx';

const List = ({favorites, deleteFavorite}) => {
  return (
    <Paper>
      <ol>
        {favorites.map((favorite, i) => (
          <li key={i}>
            <Favorite favorite={favorite} deleteFavorite={deleteFavorite}/>
          </li>
        ))}
      </ol>
    </Paper>
  )
}

export default List;