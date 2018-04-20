import React from 'react';
import { Paper, IconButton } from 'material-ui';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

const Favorite = ({favorite, deleteFavorite}) => {
    return (
      <Paper>
        <img src={favorite.image_url} alt='' style={{height: '100px', width: 'auto'}}/>
        <div>
          {favorite.name}
          <IconButton 
            style={{float: 'right', marginRight: '50px'}}
            onClick={() => deleteFavorite(favorite)}
          >
            <ActionDeleteForever />
          </IconButton>
        </div>
        <div>
          {favorite.rating} {favorite.review_count}
        </div>
        <div>
          {favorite.price} {favorite.categories}
        </div>
        <div>
          {favorite.address}
          <div>{favorite.phone}</div>
          <div>{favorite.distance}</div>
  
        </div>
      </Paper>
    )
  }
  
  export default Favorite;