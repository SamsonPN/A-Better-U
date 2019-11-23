import React, { Component } from 'react';
import {AddFoodContext} from '../../../AppContext/ExportContexts';

class AddFoodSortButtons extends Component {
  render() {
    return (
      <AddFoodContext.Consumer>
        { ({ GetFavorites, GetRecents }) => (
          <div id="AddFoodButtonWrapper">
            <button className="AddFoodSortBtns" onClick={() => GetRecents()}>Recent</button>
            <button className="AddFoodSortBtns" onClick={() => GetFavorites()}>Favorites</button>
          </div>
        )}
      </AddFoodContext.Consumer>
    );
  }
}

export default AddFoodSortButtons;
