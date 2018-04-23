import React from 'react';
import { Paper } from 'material-ui';
import Favorite from './Favorite.jsx';

const List = ({favorites, deleteFavorite}) => {
  return (
      <div>
        {favorites.map((favorite, i) => (
          <div key={i} className="restaurant">
            <Favorite favorite={favorite} deleteFavorite={deleteFavorite}/>
          </div>
        ))}
      </div>
  )
}

export default List;