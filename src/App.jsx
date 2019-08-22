import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header.jsx';
import Workout from './Components/WorkoutPage/MainPage/Workout.jsx';
import RoutineView from './Components/WorkoutPage/RoutinePage/RoutineView.jsx';
import AddExerciseView from './Components/WorkoutPage/AddExercisePage/AddExerciseView.jsx';
import Nutrition from './Components/NutritionPage/MainPage/Nutrition.jsx';
import Story from './Components/StoryPage/StoryPage.jsx';


class App extends Component {
  state = {
    Macros: [
      {name: 'Protein', value: '200'},
      {name: 'Fat', value:'50'},
      {name: 'Carbs', value:'250'}
    ]
  }

  render() {
    return (
      <Router>
        <div id="App">
          <Route exact path="/workout" render={props => (
            <React.Fragment>
              <Header/>
              <Workout/>
            </React.Fragment>
           )} />

         <Route exact path="/workout/routineview" component={RoutineView} />
         <Route exact path="/workout/addroutine" component={AddExerciseView} />

         <Route path="/nutrition" render={props => (
           <React.Fragment>
             <Header/>
             <Nutrition {...props}/>
           </React.Fragment>
         )} />


        <Route exact path="/" render={props => (
          <React.Fragment>
            <Header/>
            <Story/>
          </React.Fragment>
         )} />

        </div>
      </Router>
    );
  }

}

export default App;
