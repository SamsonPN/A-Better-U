import React, { Component } from 'react';
import AddFoodHeader from './AddFoodHeader.jsx';
import AddFoodItemList from './AddFoodItemList.jsx';
import {Link} from 'react-router-dom';
import {AddFoodContext, NutritionContext} from '../../../AppContext/ExportContexts';

class AddFoodView extends Component {
  render() {
    const currentMeal = this.props.match.params.meal;
    return (
      <AddFoodContext.Consumer>
        { ({ favItems, favorite, FoodAdded, StoreFavorites, StoreFood }) => (
          <NutritionContext.Consumer>
            { ({ nutritionDate }) => (
              <div id="AddFoodView">
                <AddFoodHeader {...this.props}/>
                <AddFoodItemList/>

                <div id="AddFoodCounter">
                {favorite ?
                  <p id="FavoriteFoodMsg" onClick={StoreFavorites}>Favorite {favItems.length} items</p>
                :
                <Link to="/nutrition" onClick={() => StoreFood(nutritionDate, currentMeal)}>
                  <p>Add {FoodAdded.length} items</p>
                </Link>}
                </div>
              </div>
            )}
          </NutritionContext.Consumer>
        )}
      </AddFoodContext.Consumer>
    );
  }

}

export default AddFoodView;
