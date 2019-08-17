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


class App extends Component {
  state ={
    data: null,
    Macros: [
      {name: 'Protein', value: '200'},
      {name: 'Fat', value:'50'},
      {name: 'Carbs', value:'250'}
    ]
  }

  componentDidMount(){
    //call our fetch function once component mounts
    this.callBackendAPI()
      .then(res => {
        this.setState({data: res.express});
        //alert(this.state.data);
      })
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200){
      throw Error(body.message)
    }
    return body;
  };

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
             <Nutrition Macros={this.state.Macros}/>
           </React.Fragment>
          )} />
        <Route exact path="/nutrition/addfood" component={AddFoodView}/>
        <Route exact path="/nutrition/bmrcalculator" component={BMRCalculator}/>
        <Route exact path="/nutrition/macrocalculator" component={MacroCalculator}/>

        <Route exact path="/story" render={props => (
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
