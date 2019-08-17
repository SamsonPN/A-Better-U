import React, { Component } from 'react';
import {default as FoodItem} from './AddFoodItem.jsx'

class AddFoodItemList extends Component {
  render() {
    const listItems = this.props.search.map((item) =>
      <FoodItem key={item.name} name={item.name}/>
    );

    return (
      <div id="AddFoodItemList">
        {listItems}
      </div>
    );
  }

}

export default AddFoodItemList;
