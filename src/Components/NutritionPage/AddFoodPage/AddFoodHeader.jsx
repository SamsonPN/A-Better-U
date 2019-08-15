import React, { Component } from 'react';
import {default as SortBtns} from './AddFoodSortButtons.jsx'

class AddFoodHeader extends Component {
  render() {
    return (
      <div id="AddFoodHeader">
        <h1>Add Items</h1>
        <textarea id="AddFoodSearch">Search for a food item</textarea>
        <SortBtns/>
      </div>
    );
  }

}

export default AddFoodHeader;
