import React, { Component } from 'react';
import SortBtns from './AddFoodSortButtons.jsx';
import { AddFoodContext } from '../../../AppContext/ExportContexts';

class AddFoodHeader extends Component {
  render() {
    const currentMeal = this.props.match.params.meal;
    return (
      <AddFoodContext.Consumer>
        { ({ SearchFood }) => (
          <div id="AddFoodHeader">
            <h1>Add {currentMeal}</h1>
            <textarea id="AddFoodSearch"
              onClick={(e) => e.target.value = ""}
              onKeyPress={(e) => SearchFood(e)}
              placeholder="Search">
            </textarea>
            <SortBtns />
          </div>
        )}
      </AddFoodContext.Consumer>
    );
  }

}

export default AddFoodHeader;
