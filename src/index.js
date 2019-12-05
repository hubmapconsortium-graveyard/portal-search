import React, {Component} from 'react'

import {
    SearchkitManager, SearchkitProvider, SearchBox,
    HierarchicalMenuFilter, RefinementListFilter, LayoutResults,
    MenuFilter, RangeFilter, NumericRefinementListFilter,
    DynamicRangeFilter,
    ActionBar, ActionBarRow, HitsStats, SelectedFilters,
    ResetFilters, MovieHitsGridItem, NoHits,
    Hits, Layout, TopBar, LayoutBody, SideBar
} from 'searchkit';

export default function(props) {
  const { apiUrl, prefixQueryFields, filters } = props;
  const searchkit = new SearchkitManager(apiUrl);

  const filterTypes = {
    hierarchical: HierarchicalMenuFilter,
    refinement: RefinementListFilter,
    menu: MenuFilter,
    range: RangeFilter,
    numeric: NumericRefinementListFilter,
    dynamic: DynamicRangeFilter,
  }

  const filterElements = filters.map(def =>
    React.createElement(
      filterTypes[def.type],
      def.props
    )
  );

  return (
    <SearchkitProvider searchkit={searchkit}>
      <Layout>
        <SearchBox
          autofocus={true}
          searchOnChange={true}
          prefixQueryFields={prefixQueryFields}/>
        <LayoutBody>
          <SideBar>{filterElements}</SideBar>
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
