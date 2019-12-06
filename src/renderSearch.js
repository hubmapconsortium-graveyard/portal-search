import React, { Component } from 'react';
import { render } from 'react-dom';

import Search from './Search';

export default function renderSearch(id, props) {
  render(
    <Search {...props} />,
    document.getElementById(id),
  );
}
