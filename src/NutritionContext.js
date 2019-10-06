import React, { Component } from 'react';

export const NutritionContext = React.createContext();

class NutritionProvider extends Component {
  state = {

  }
  render() {
    return (
      <NutritionContext.Provider value={this.state}>
        {this.props.children}
      </NutritionProvider>
    );
  }

}

export default NutritionContext;
