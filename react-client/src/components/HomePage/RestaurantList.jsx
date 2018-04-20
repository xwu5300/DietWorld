import React from 'react';
import { Paper } from 'material-ui';
import Restaurant from './Restaurant.jsx';

const RestaurantList = ({restaurants, saveFavorite}) => {
  return (
    <Paper>
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

export default RestaurantList;