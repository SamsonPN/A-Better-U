import React, { Component } from 'react';
import UpArrow from '../../../assets/up-arrow-blue.svg';
import DownArrow from '../../../assets/down-arrow-blue.svg';
import {default as SetsReps} from './AdditionalSetsReps.jsx';

class CurrentRoutineItems extends Component {
  state = {
    toggle: false
  }

  ToggleRoutineItem = () => {
    let routineItem = document.getElementsByClassName('CollapsibleCurrentRoutine')[this.props.index];

    this.setState(prevState => ({
      toggle: !prevState.toggle
    }), function(){
      if(this.state.toggle){
        routineItem.style.display = 'none';
      }
      else{
        routineItem.style.display = 'flex';
      }
    })
  }

  // SaveValue = (e, index) => {
  //   let newState = this.state.sets;
  //   newState[index][e.target.placeholder] = e.target.value
  //   this.setState({
  //     sets: newState
  //   })
  // }

  render() {
    const AddSets = this.props.sets.map( (item,i) =>
      <SetsReps key={item + i} index={i} sets={item} delete={this.props.DeleteSet} save={this.props.save} exercise={this.props.index}/>
    )
    const {name, type} = this.props;
    const {toggle} = this.state;

    return (
      <div className="CurrentRoutineItems">
        <div className="CurrentRoutineItemHeader">
          <p>{name} ({type})</p>
          <img onClick={this.ToggleRoutineItem} src={toggle ? DownArrow : UpArrow} alt="down arrow"/>
        </div>

        <div className="CollapsibleCurrentRoutine">
          {AddSets}
          <div className="CurrentRoutineAddSet">
            <p onClick={this.props.AddSet.bind(this, this.props.index)}>Add Set</p>
          </div>
        </div>

      </div>
    );
  }

}

export default CurrentRoutineItems;
