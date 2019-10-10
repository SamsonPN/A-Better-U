import React, { Component } from 'react';
import {AddFoodContext} from '../../../AppContext/ExportContexts';

class AddFoodSortButtons extends Component {

  render() {
    return (
      <AddFoodContext.Consumer>
        { ({ GetFavorites }) => (
          <div id="AddFoodButtonWrapper">
            <button className="SortBtns">Recent</button>
            <button className="SortBtns">Recipes</button>
            <button className="SortBtns" onClick={() => GetFavorites()}>Favorites</button>
          </div>
        )}
      </AddFoodContext.Consumer>
    );
  }

}

export default AddFoodSortButtons;
