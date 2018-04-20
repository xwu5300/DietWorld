import React from 'react';
import { Paper, IconButton } from 'material-ui';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';


const Restaurant = ({restaurant, saveFavorite}) => {
  return (
    <Paper>
      <img src={restaurant.image_url} alt='' style={{height: '100px', width: 'auto'}}/>
      <div>
        {restaurant.name}
        <IconButton 
          tooltip="Like" 
          style={{float: 'right', marginRight: '50px'}}
          onClick={() => saveFavorite(restaurant)}
        >
          <ActionFavoriteBorder />
        </IconButton>
      </div>
      <div>
        {restaurant.rating} {restaurant.review_count}
      </div>
      <div>
        {restaurant.price} {restaurant.categories.map((el, i) => el = el.title).join(', ')}
      </div>
      <div>
        {restaurant.location.display_address.map((add, i) => <div key={i}> {add} </div>)}
        <div>{restaurant.display_phone}</div>
        <div>distance {Math.round(restaurant.distance * 0.00062137 * 10) / 10}mile </div>

      </div>
    </Paper>
  )
}

export default Restaurant;