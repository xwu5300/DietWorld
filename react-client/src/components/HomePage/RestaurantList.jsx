import React from 'react';
import { Paper } from 'material-ui';
import Restaurant from './Restaurant.jsx';

const RestaurantList = ({restaurants, saveFavorite}) => {
  return (
  
      <div>
        {restaurants.map((restaurant, i) => (
          <div key={i} className="restaurant">
            <Restaurant restaurant={restaurant} saveFavorite={saveFavorite}/>
          </div>
        ))}
      </div>

  )

}

export default RestaurantList;