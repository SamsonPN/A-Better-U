import React, { Component } from 'react';
import FoodItem from './AddFoodItem.jsx';
import {AddFoodContext} from '../../../AddFoodContext';

class AddFoodItemList extends Component {
  static contextType = AddFoodContext;
  render() {
    const listItems = this.context.FoodSearch.map((item) =>
      <FoodItem
        key={item.name}
        name={item.name}
        ndbno={item.ndbno}/>
    );

    return (
      <div id="AddFoodItemList">
        {listItems}
      </div>
    );
  }

}

export default AddFoodItemList;
