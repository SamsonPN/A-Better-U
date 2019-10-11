import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Header from './Components/Header/Header';
import {Workout, RoutineView, AddExerciseView} from './Components/WorkoutPage/ExportWorkoutComponents';
import {Nutrition, Totals, AddFoodView, BMR, Macro} from './Components/NutritionPage/ExportNutritionComponents';
import Story from './Components/StoryPage/StoryPage';
import { StoryProvider, NutritionProvider, AddFoodProvider, WorkoutProvider, AddExerciseProvider} from './AppContext/ExportContexts';

class App extends Component {
  state = {
    today: new Date(),
    workoutDate: new Date(),
    routineName: 'Routine Name',
    tab: 'Routine'
  }

  //used to determine if exercises saved to routine or workout
  //given to routineview and addroutine
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

  render() {
    const {routineName, tab, workoutDate} = this.state;
    return (
      <Router>
          <div id="App">
            <Route exact path="/login" component={Login}/>

            {/*WORKOUT ROUTES*/}
            <AddExerciseProvider>
             <WorkoutProvider>
              <Route exact path="/workout" render={props => (
                <React.Fragment>
                  <Header/>
                  <Workout
                    ChangeWorkoutDate={this.ChangeWorkoutDate}
                    routineOption={this.RoutineOption}
                    workoutDate={workoutDate}
                  />
                </React.Fragment>
               )} />

             <Route exact path="/workout/routineview" render={props => (
                 <RoutineView
                   routineName={routineName}
                   tab={tab}
                 />
               )}/>
               <Route exact path="/workout/addroutine" render={props => (
                   <AddExerciseView
                     date={workoutDate}
                     routineName={routineName}
                     tab={tab}
                   />
                 )}/>
             </WorkoutProvider>
            </AddExerciseProvider>

           {/*NUTRITION ROUTES*/}
           <NutritionProvider>
             <AddFoodProvider>
                 <Route exact path="/nutrition" render={props => (
                   <React.Fragment>
                     <Header />
                     <Nutrition />
                   </React.Fragment>
                 )} />

               <Route exact path={"/nutrition/addfood/:meal"} render={props =>(
                     <AddFoodView {...props}/>
                   )}/>
             </AddFoodProvider>
            </NutritionProvider>

           <Route exact path="/nutrition/bmrcalculator" component={BMR}/>
           <Route exact path="/nutrition/macrocalculator" component={Macro}/>
           <Route exact path="/nutrition/totals" render={props => (
               <Totals date={this.state.nutritionDate} />
             )}/>


           {/*STORY ROUTES*/}
          <Route exact path="/" render={props => (
            <React.Fragment>
              <Header/>
              <StoryProvider>
                <Story/>
              </StoryProvider>
            </React.Fragment>
           )} />
          </div>
      </Router>
    );
  }

}

export default App;
