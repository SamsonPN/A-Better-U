import React, { Component } from 'react';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';
/* Props for:
  - id
  - text like favorite or whatever
  - length of items (addItems or favItems)
  - store to exercises or favorites
  - Remove what things?
*/
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
