import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Box from '~/pages/Box.js'

function App() {
  return (
    <MuiThemeProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Box} />
      </Switch>
    </BrowserRouter>
     </MuiThemeProvider>
    
  );
}

export default App;
