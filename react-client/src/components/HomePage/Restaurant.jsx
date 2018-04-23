import React from 'react';
import { IconButton } from 'material-ui';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import StarRatingComponent from 'react-star-rating-component';

const Restaurant = ({restaurant, saveFavorite}) => {
  return (
    <div className="contain">
      <div className="contain1">
      <img className="restaurant-image" src={restaurant.image_url} alt=''/>
      </div>
        <div className="contain2">
        <div className="name">
        {restaurant.name}
        <IconButton 
          tooltip="Like" 
          style={{float: 'right', marginRight: '80px'}}
          onClick={() => saveFavorite(restaurant)}
        >
          <ActionFavoriteBorder />
        </IconButton>
        </div>
      <div className="rates">
        <div className="rating">
        <StarRatingComponent 
          name="stars"
          editing={false}
          renderStarIcon={() => <span>★</span>}
          starCount={5}
          value={restaurant.rating}
        />
        </div>
        <div className="review">
        {restaurant.review_count} reviews
        </div>
      </div>
      <div>
        {restaurant.price}  ·   {restaurant.categories.map((el, i) => el = el.title).join(', ')}
      </div>
      </div>
      <div className="contain3">
        {restaurant.location.display_address.map((add, i) => <div key={i}> {add} </div>)}
        <div>{restaurant.display_phone}</div>
        <div className="distance">distance {Math.round(restaurant.distance * 0.00062137 * 10) / 10}mile </div>

      </div>
    </div>
  )
}

export default Restaurant;