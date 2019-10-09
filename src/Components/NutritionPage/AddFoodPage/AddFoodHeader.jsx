import React, { Component } from 'react';
import SortBtns from './AddFoodSortButtons.jsx';
import {AddFoodContext} from '../../../AddFoodContext';

//might remove this component and put it into AddFoodView

class AddFoodHeader extends Component {
  render() {
    return (
      <AddFoodContext.Consumer>
        { ({currentMeal, onEnter}) => (
          <div id="AddFoodHeader">
            <h1>Add {currentMeal}</h1>
            <textarea id="AddFoodSearch"
              onClick={(e) => e.target.value = ""}
              onKeyPress={(e) => onEnter(e)}
              placeholder="Search for a food item">
            </textarea>
            <SortBtns />
          </div>
        )}
      </AddFoodContext.Consumer>
    );
  }

}

export default AddFoodHeader;
