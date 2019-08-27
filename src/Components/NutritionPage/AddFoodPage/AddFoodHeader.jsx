import React, { Component } from 'react';
import {default as SortBtns} from './AddFoodSortButtons.jsx'

//might remove this component and put it into AddFoodView

class AddFoodHeader extends Component {
  clearText = (e) => {
    document.getElementById('AddFoodSearch').value = "";
  }
  render() {
    return (
      <div id="AddFoodHeader">
        <h1>Add {this.props.currentMeal}</h1>

        <textarea id="AddFoodSearch"
          onClick={this.clearText}
          onKeyPress={this.props.onEnter}
          placeholder="Search for a food item">
        </textarea>

        <SortBtns/>
      </div>
    );
  }

}

export default AddFoodHeader;
