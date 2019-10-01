import React, { Component } from 'react';
import FoodItem from './AddFoodItem.jsx';

class AddFoodItemList extends Component {
  render() {
    const listItems = this.props.search.map((item) =>
      <FoodItem
        key={item.name}
        name={item.name}
        ndbno={item.ndbno}
        AddFood={this.props.AddFood}
        FavoriteFood={this.props.FavoriteFood}/>
    );

    return (
      <div id="AddFoodItemList">
        {listItems}
      </div>
    );
  }

}

export default AddFoodItemList;
