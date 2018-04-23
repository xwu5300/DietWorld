import React from 'react';
import { IconButton } from 'material-ui';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import StarRatingComponent from 'react-star-rating-component';

const Favorite = ({favorite, deleteFavorite}) => {
    return (
      <div className="contain">
      <div className="contain1">
        <img className="restaurant-image" src={favorite.image_url} alt=''/>
        </div>
        <div className="contain2">
        <div className="name">
          {favorite.name}
          <IconButton 
            style={{float: 'right', marginRight: '80px'}}
            onClick={() => deleteFavorite(favorite)}
          >
            <ActionDeleteForever />
          </IconButton>
        </div>
        <div className="rates">
        <div className="rating">
        <StarRatingComponent 
          name="stars"
          editing={false}
          renderStarIcon={() => <span>★</span>}
          starCount={5}
          value={favorite.rating}
        />
        </div>
        <div className="review"> 
          {favorite.review_count} reviews
        </div>
      </div>
        <div>
          {favorite.price}  ·   {favorite.categories}
        </div>
        </div>
        <div className="contain3">
          {favorite.address}
          <div>{favorite.phone}</div>
          <div className="distance">distance  {favorite.distance}</div>
  
        </div>
      </div>
    )
  }
  
  export default Favorite;