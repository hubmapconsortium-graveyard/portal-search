import React from 'react';
import { render } from 'react-dom';

import Search from './Search';

export default function renderSearch(id, props) {
  render(
    <Search {...props} />, // eslint-disable-line react/jsx-props-no-spreading
    document.getElementById(id),
  );
}
