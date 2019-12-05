import React, {Component} from 'react'
import {render} from 'react-dom'

import Search from '../../src'

render(
  <Search
    apiUrl='http://demo.searchkit.co/api/movies/'
    prefixQueryFields={["actors^1","type^2","languages","title^10"]}
  />,
  document.querySelector('#demo')
)
