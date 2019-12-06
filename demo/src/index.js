import React, {Component} from 'react'
import {render} from 'react-dom'

import Search from '../../src'

render(
  <Search
    apiUrl='http://demo.searchkit.co/api/movies/'
    prefixQueryFields={["actors^1","type^2","languages","title^10"]}
    sourceFilter={["title"]}
    hitsPerPage={5}
    filters={[
      {
        type: 'HierarchicalMenuFilter',
        props: {
          id: 'categories',
          fields: ['type.raw', 'genres.raw'],
          title: 'Categories!',
        },
      },
      {
        type: 'RefinementListFilter',
        props: {
          id: 'actors',
          title: 'Actors!',
          field: 'actors.raw',
          operator: 'AND',
          size: 10
        },
      }
    ]}
  />,
  document.querySelector('#demo')
)
