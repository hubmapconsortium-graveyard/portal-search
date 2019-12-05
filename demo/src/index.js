import React, {Component} from 'react'
import {render} from 'react-dom'

import Search from '../../src'

render(<Search api_url='http://demo.searchkit.co/api/movies/'/>, document.querySelector('#demo'))
