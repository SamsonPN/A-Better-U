import React, { Component } from 'react';

class AddFoodSortButtons extends Component {

  render() {
    return (
      <div id="AddFoodButtonWrapper">
        <button className="SortBtns">Recent</button>
        <button className="SortBtns">Recipes</button>
        <button className="SortBtns" onClick={this.props.GetFavorites}>Favorites</button>
      </div>
    );
  }

}

export default AddFoodSortButtons;
