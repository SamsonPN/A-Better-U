import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
// import { NutritionProvider } from './ReactContext';
import './App.css';
import Login from './Login';

import Header from './Components/Header/Header.jsx';
import Workout from './Components/WorkoutPage/MainPage/Workout';
import RoutineView from './Components/WorkoutPage/RoutinePage/RoutineView';
import AddExerciseView from './Components/WorkoutPage/AddExercisePage/AddExerciseView';
import Nutrition from './Components/NutritionPage/MainPage/Nutrition';
import Totals from './Components/NutritionPage/MainPage/NutritionTotalsPage';
import AddFoodView from './Components/NutritionPage/AddFoodPage/AddFoodView';
import BMRCalculator from './Components/NutritionPage/NutritionCalculators/BMRCalculator';
import MacroCalculator from './Components/NutritionPage/NutritionCalculators/MacroCalculator';
import Story from './Components/StoryPage/StoryPage';

/*
NEXT GOAL ONCE DONE WITH MINOR IMPLEMENTATIONS:
  - DO ALL THE FETCHING REQUESTS HERE!
    - JUST FETCH ALL NUTRITION DATA ONCE, i.e. USER NUTRITION GOALS AND FOOD ITEMS
    - then afterwards, if it needs to re-render, just update the nutrition portion only!
  - THEN SET THE STATE AND PASS IT ON AS PROPS TO NUTRITION ETC
*/

class App extends Component {
  state = {
    today: new Date(),
    workoutDate: new Date(),
    nutritionDate: new Date(),
    currentMeal: 'Breakfast',
    routineName: 'Routine Name',
    tab: 'Routine'
  }
  currentMeal = (currentMeal) => {
    this.setState( { currentMeal } );
  }

  RoutineOption = (routineName, tab) => {
    this.setState( { routineName, tab } );
  }

  ChangeWorkoutDate = (workoutDate, GetWorkouts) => {
    this.setState( {workoutDate}, function(){
      if(GetWorkouts){
      GetWorkouts('workouts', this.state.workoutDate)
    }
    });
  }

  ChangeNutritionDate = (nutritionDate, FetchFood) => {
    this.setState( {nutritionDate}, function(){FetchFood()} );
  }


  render() {
    const {nutritionDate, routineName, tab, workoutDate} = this.state;
    return (
      <Router>
          <div id="App">
            <Route exact path="/login" component={Login}/>
            <Route exact path="/workout" render={props => (
              <React.Fragment>
                <Header/>
                <Workout
                  ChangeWorkoutDate={this.ChangeWorkoutDate}
                  routineOption={this.RoutineOption}
                  workoutDate={workoutDate}/>
              </React.Fragment>
             )} />

           <Route exact path="/workout/routineview" render={props => (
               <RoutineView
                 date={workoutDate}
                 routineName={routineName}
                 tab={tab}/>
             )}/>
           <Route exact path="/workout/addroutine" render={props => (
               <AddExerciseView
                 date={workoutDate}
                 routineName={routineName}
                 tab={tab}/>
             )}/>

           {/*<NutritionProvider value={{
               FetchFood: this.FetchFood,
               currentMeal: this.state.currentMeal,
               Breakfast: this.state.Breakfast,
               Lunch: this.state.Lunch,
               Dinner: this.state.Dinner,
               Snacks: this.state.Snacks
             }}>*/}
             <Route exact path="/nutrition" render={props => (
               <React.Fragment>
                 <Header/>
                 <Nutrition
                   currentMeal={this.currentMeal}
                   date={nutritionDate}
                   changeNutritionDate={this.ChangeNutritionDate}
                   transferNutritionInfo={this.TransferNutritionInfo}/>
               </React.Fragment>
             )} />

           <Route exact path={"/nutrition/addfood"} render={props =>(
                 <AddFoodView currentMeal={this.state.currentMeal} date={nutritionDate}/>
               )}/>

           <Route exact path="/nutrition/bmrcalculator" component={BMRCalculator}/>
           <Route exact path="/nutrition/macrocalculator" component={MacroCalculator}/>
           <Route exact path="/nutrition/totals" render={props => (
               <Totals date={this.state.nutritionDate} />
             )}/>

           {/*</NutritionProvider>*/}

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
