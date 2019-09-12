import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
// import { NutritionProvider } from './ReactContext';
import './App.css';

import Header from './Components/Header/Header.jsx';
import Workout from './Components/WorkoutPage/MainPage/Workout.jsx';
import RoutineView from './Components/WorkoutPage/RoutinePage/RoutineView.jsx';
import AddExerciseView from './Components/WorkoutPage/AddExercisePage/AddExerciseView.jsx';
import Nutrition from './Components/NutritionPage/MainPage/Nutrition.jsx';
import AddFoodView from './Components/NutritionPage/AddFoodPage/AddFoodView.jsx';
import BMRCalculator from './Components/NutritionPage/NutritionCalculators/BMRCalculator.jsx';
import MacroCalculator from './Components/NutritionPage/NutritionCalculators/MacroCalculator.jsx';
import Story from './Components/StoryPage/StoryPage.jsx';

/*
NEXT GOAL ONCE DONE WITH MINOR IMPLEMENTATIONS:
  - DO ALL THE FETCHING REQUESTS HERE!
    - JUST FETCH ALL NUTRITION DATA ONCE, i.e. USER NUTRITION GOALS AND FOOD ITEMS
    - then afterwards, if it needs to re-render, just update the nutrition portion only!
  - THEN SET THE STATE AND PASS IT ON AS PROPS TO NUTRITION ETC
*/

class App extends Component {
  state = {
    today: "01%2F01%2F2019",
    currentMeal: 'Breakfast'
    // Breakfast : [],
    // Lunch: [],
    // Dinner: [],
    // Snacks: [],
    // calories: 0,
    // protein: 0,
    // fat: 0,
    // carbs: 0
  }

  componentDidMount(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '%2F' + (dd) + '%2F' + yyyy;

    // this.setState({ today: today }, function(){
    //   this.FetchFood()
    // })
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

           <Route exact path="/workout/routineview" component={RoutineView}/>
           <Route exact path="/workout/addroutine" component={AddExerciseView}/>

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
                 <Nutrition currentMeal={this.currentMeal}/>
               </React.Fragment>
             )} />

           <Route exact path={"/nutrition/addfood"} render={props =>(
                 <AddFoodView currentMeal={this.state.currentMeal} />
               )}/>

           <Route exact path="/nutrition/bmrcalculator" component={BMRCalculator}/>
           <Route exact path="/nutrition/macrocalculator" component={MacroCalculator}/>
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
