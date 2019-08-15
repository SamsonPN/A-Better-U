import React, { Component } from 'react';
import AddFoodHeader from './AddFoodHeader.jsx';
import AddFoodItemList from './AddFoodItemList.jsx';
import {Link} from 'react-router-dom';


class AddFoodView extends Component {

  render() {
    return (
      <div id="AddFoodView">
        <AddFoodHeader/>
        <AddFoodItemList/>
        <Link to="/nutrition">
          <button id="AddFoodFinishBtn">Finish</button>
        </Link>
      </div>
    );
  }

}

export default AddFoodView;
