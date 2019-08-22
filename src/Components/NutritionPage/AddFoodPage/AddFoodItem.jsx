import React, { Component } from 'react';
import Heart from '../../../assets/heart.svg';

class AddFoodItem extends Component {
  render() {
    const {name, offset, ndbno} = this.props;
    return (
      <div className="AddFoodItem">
        <p>{this.props.name}</p>
        <div id="AddFoodCheckboxWrapper">
          <div className="AddFoodCheckBox" title="Click to add food" onClick={this.props.AddFood.bind(this, name, offset,ndbno)}></div>
          <img className="AddFoodFavorite" src={Heart} alt="Favorites Icon" title="Click to add to favorites" onClick={this.props.FavoriteFood.bind(this,name,offset,ndbno)}/>
        </div>
      </div>
    );
  }

}

export default AddFoodItem;
