import React, {Component} from 'react'

import {
    SearchkitManager, SearchkitProvider, SearchBox,
    HierarchicalMenuFilter, RefinementListFilter, LayoutResults,
    ActionBar, ActionBarRow, HitsStats, SelectedFilters,
    ResetFilters, MovieHitsGridItem, NoHits,
    Hits, Layout, TopBar, LayoutBody, SideBar
} from 'searchkit';


export default function(props) {
  const { apiUrl, prefixQueryFields } = props;
  const searchkit = new SearchkitManager(apiUrl);
  const filters = [
    React.createElement(
      HierarchicalMenuFilter,
      {
        fields: ['type.raw', 'genres.raw'],
        title: 'Categories',
        id: 'categories'
      },
    ),
    React.createElement(
      RefinementListFilter,
      {
        id: 'actors',
        title: 'Actors',
        field: 'actors.raw',
        operator: 'AND',
        size: 10
      },
    ),
  ]
  return (
    <SearchkitProvider searchkit={searchkit}>
      <Layout>
        <SearchBox
          autofocus={true}
          searchOnChange={true}
          prefixQueryFields={prefixQueryFields}/>
        <LayoutBody>
          <SideBar>{filters}</SideBar>
          <LayoutResults>
            <ActionBar>

              <ActionBarRow>
                <HitsStats/>
              </ActionBarRow>

              <ActionBarRow>
                <SelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>

            </ActionBar>
            <Hits mod="sk-hits-list" hitsPerPage={10} itemComponent={MovieHitsGridItem}
              sourceFilter={["title", "poster", "imdbId"]}/>
            <NoHits/>
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </SearchkitProvider>
  );
}
