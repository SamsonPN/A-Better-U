/*
Component for Add Exercise page where users can search for and select exercises for their routine
*/
import React, { Component } from 'react';
import RoutineFooter from '../RoutinePage/RoutineFooter';
import AddExerciseHeader from './AddExerciseHeader';
import EList from './AddExerciseList';import Bars from './UpdateDeleteBars';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';


class AddExerciseView extends Component {
  static contextType = AddExerciseContext;

  StoreExercises = () => {
    let {date, routineName, tab} = this.props;
    let requestObject = {
      "name": routineName,
      "exercises": this.state.addItems
    }
    if(tab === 'Saved'){
      let options = {month: "2-digit", day: "2-digit", year: "numeric"}
      requestObject["date"] = date.toLocaleDateString("en-US", options);
      this.InsertWorkoutExercises(requestObject)
    }
    else{
      this.InsertRoutineExercises(requestObject)
    }
    this.RemoveBar('add', 'addItems');
  }

  InsertRoutineExercises = (requestObject) => {
    fetch('/insertRoutineExercises', {
      method: 'POST',
      mode: 'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
      .catch(err => console.log(err))
  }

  InsertWorkoutExercises = (requestObject) => {
    fetch('/insertWorkoutExercises', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
    .catch(err => console.log(err))
  }

  StoreFavorites = () => {
    let requestObject = {
      "user" : "1",
      "favExercises" : this.state.favItems
    }

    fetch('/insertFavoriteExercises', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(requestObject)
    })
    this.RemoveBar('favorite', 'favItems')
  }

  render() {
    const {add, addItems, favorite, favItems} = this.context;
    const AddBar = <Bars items={addItems} store={this.StoreExercises} text={"Add"} />;
    const FavoriteBar = <Bars items={favItems} store={this.StoreFavorites} text={"Favorite"} />;

    return (
      <div id="AddExerciseView">
        <AddExerciseHeader />
        <EList />
        { add ? AddBar : null }
        { favorite ? FavoriteBar : null }
        <RoutineFooter/>
      </div>
    );
  }

}

export default AddExerciseView;
