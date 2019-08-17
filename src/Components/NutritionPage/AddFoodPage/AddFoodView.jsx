import React, { Component } from 'react';
import AddFoodHeader from './AddFoodHeader.jsx';
import AddFoodItemList from './AddFoodItemList.jsx';
import {Link} from 'react-router-dom';


class AddFoodView extends Component {
  state = {
    search: []
  }
  onEnter = (e) => {
    if(e.key === 'Enter'){
      let search = document.getElementById('AddFoodSearch').value
      let uri = encodeURI(`https://api.nal.usda.gov/ndb/search/?format=json&q=${search}&sort=r&offset=0&api_key=DEMO_KEY`)
      fetch(uri)
        .then(response => response.json())
        .then(data => {
          if (data.list === undefined){
            alert("We are unable to find the food you were searching for. Please enter another item!")
          }
          else{
            console.log(data.list)
            this.setState({ search: data.list.item })
          }
        })
    }
  }
  render() {
    return (
      <div id="AddFoodView">
        <AddFoodHeader onEnter={this.onEnter}/>
        <AddFoodItemList search={this.state.search} />
        <Link to="/nutrition">
          <button id="AddFoodFinishBtn">Finish</button>
        </Link>
      </div>
    );
  }

}

export default AddFoodView;
