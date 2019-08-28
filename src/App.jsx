import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';

import Header from './Components/Header/Header.jsx';
import Workout from './Components/WorkoutPage/MainPage/Workout.jsx';
import RoutineView from './Components/WorkoutPage/RoutinePage/RoutineView.jsx';
import AddExerciseView from './Components/WorkoutPage/AddExercisePage/AddExerciseView.jsx';
import Nutrition from './Components/NutritionPage/MainPage/Nutrition.jsx';
import AddFoodView from './Components/NutritionPage/AddFoodPage/AddFoodView.jsx';
import BMRCalculator from './Components/NutritionPage/BMRCalculator.jsx';
import MacroCalculator from './Components/NutritionPage/MacroCalculator.jsx';
import Story from './Components/StoryPage/StoryPage.jsx';

/*
NEXT GOAL ONCE DONE WITH MINOR IMPLEMENTATIONS:
  - DO ALL THE FETCHING REQUESTS HERE!
  - THEN SET THE STATE AND PASS IT ON AS PROPS TO NUTRITION ETC

*/
class App extends Component {
  state = {
    currentMeal: 'Breakfast',
    Macros: [
      {name: 'Protein', value: '200'},
      {name: 'Fat', value:'50'},
      {name: 'Carbs', value:'250'}
    ]
  }

  currentMeal = (name) => {
    this.setState({ currentMeal: name})
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

         <Route exact path="/nutrition" render={props => (
           <React.Fragment>
             <Header/>
             <Nutrition currentMeal={this.currentMeal}/>
           </React.Fragment>
         )} />

       <Route exact path={"/nutrition/addfood"} render={props =>(
             <AddFoodView currentMeal={this.state.currentMeal} />
           )}/>

       <Route exact path="/nutrition/bmrcalculator" component={BMRCalculator}/>
       <Route exact path="/nutrition/macrocalculator" component={MacroCalculator}/>


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
