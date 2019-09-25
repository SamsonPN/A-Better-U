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

  render() {
    const {AddSet, DeleteSet, index, name, save, sets, tab, type} = this.props;
    const {toggle} = this.state;
    const AddSets = sets.map( (item,i) =>
      <SetsReps
        key={item + i}
        index={i}
        sets={item}
        delete={DeleteSet}
        save={save}
        exercise={index}
        tab={tab}/>
    )
    return (
      <div className="CurrentRoutineItems">
        <div className="CurrentRoutineItemHeader">
          <p>{name} ({type})</p>
          <img onClick={this.ToggleRoutineItem} src={toggle ? DownArrow : UpArrow} alt="down arrow"/>
        </div>

        <div className="CollapsibleCurrentRoutine">
          {AddSets}
          {tab !== 'Date' ?
            <div className="CurrentRoutineAddSet">
              <p onClick={() => (tab !== 'Date' ? AddSet(index) : null)}>Add Set</p>
            </div>
            : null
          }
        </div>

      </div>
    );
  }

}

export default CurrentRoutineItems;
