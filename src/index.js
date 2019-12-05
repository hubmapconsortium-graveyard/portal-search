import React, {Component} from 'react'

import {
    SearchkitManager, SearchkitProvider, SearchBox, Hits
} from 'searchkit';


const searchkit = new SearchkitManager("/");

export default class extends Component {
  render() {
    return (
      <SearchkitProvider searchkit={searchkit}>
          <div>
              <SearchBox/>
              <Hits/>
          </div>
      </SearchkitProvider>
    );
  }
}
