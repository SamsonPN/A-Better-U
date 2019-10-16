import React, { Component } from 'react';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';

class UpdateDeleteBars extends Component {
  render() {
    const {items, store, text} = this.props;
    return (
      <AddExerciseContext.Consumer>
        { ({ RemoveBar }) => (
          <div id="AddExerciseConfirmation" className="UpdateDeleteBars">
            <p>{text} {items.length} exercise(s)?</p>
            <p onClick={() => store()} className="BarOptns">Yes</p>
            <p>/</p>
            <p
              onClick={() => RemoveBar(text, items)}
              className="BarOptns">
              No
            </p>
          </div>
        )}
      </AddExerciseContext.Consumer>
    );
  }

}

export default UpdateDeleteBars;
