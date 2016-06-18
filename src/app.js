// Load styles
require('./stylesheets/main.sass')

// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/title';

ReactDOM.render(
  <Title title="Hello spectrum! :D" />,
  document.getElementById('content'));
