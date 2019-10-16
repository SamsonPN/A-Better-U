import React, { Component } from 'react';
import RoutineFooter from '../RoutinePage/RoutineFooter';
import AddExerciseHeader from './AddExerciseHeader';
import EList from './AddExerciseList';import Bars from './UpdateDeleteBars';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class AddExerciseView extends Component {
  static contextType = WorkoutContext;

  render() {
    const {favorite, favItems, StoreFavorites} = this.context;
    const FavoriteBar = <Bars items={favItems} store={StoreFavorites} text={"Favorite"} />;

    return (
      <div id="AddExerciseView">
        <AddExerciseHeader />
        <EList />
        { favorite ? FavoriteBar : null }
        <RoutineFooter {...this.props}/>
      </div>
    );
  }

}

export default AddExerciseView;
