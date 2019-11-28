import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import {Workout, RoutineView, AddExerciseView} from './Components/WorkoutPage/ExportWorkoutComponents';
import {Nutrition, AddFoodView, BMR, Macro} from './Components/NutritionPage/ExportNutritionComponents';
import Story from './Components/StoryPage/StoryPage';
import {
  StoryProvider,
  NutritionProvider,
  AddFoodProvider,
  WorkoutProvider,
  AddExerciseProvider,
  CalculatorProvider
 } from './AppContext/ExportContexts';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="App">
          <Route exact path="/" component={Login}/>
          <Route exact path = {["/workout", "/nutrition", "/story"]}  component={Header} />

          {/*WORKOUT ROUTES*/}
          <AddExerciseProvider>
           <WorkoutProvider>
             <Route exact path="/workout" component={Workout} />
             <Route exact path="/workout/routineview/:collection/:id" render={props => (<RoutineView {...props}/>) }/>
             <Route exact path="/workout/addroutine/:collection/:id" render={props => ( <AddExerciseView {...props}/>) }/>
           </WorkoutProvider>
          </AddExerciseProvider>

          {/*NUTRITION ROUTES*/}
          <CalculatorProvider>
            <NutritionProvider>
               <AddFoodProvider>
                 <Route exact path="/nutrition" component={Nutrition} />
                 <Route exact path={"/nutrition/addfood/:meal"} render={props => (<AddFoodView {...props} />) }/>
              </AddFoodProvider>
            </NutritionProvider>
            <Route exact path="/nutrition/bmrcalculator" component={BMR} />
            <Route exact path="/nutrition/macrocalculator" component={Macro} />
          </CalculatorProvider>

          {/*STORY ROUTES*/}
          <StoryProvider>
             <Route exact path = "/story" component={Story} />
          </StoryProvider>
        </div>
      </Router>
    );
  }
}

export default App;
