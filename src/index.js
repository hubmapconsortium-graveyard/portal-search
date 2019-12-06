import React, {Component} from 'react'

import {
    SearchkitManager, SearchkitProvider, SearchBox,
    HierarchicalMenuFilter, RefinementListFilter, LayoutResults,
    MenuFilter, RangeFilter, NumericRefinementListFilter,
    DynamicRangeFilter,
    ActionBar, ActionBarRow, HitsStats, SelectedFilters,
    ResetFilters, MovieHitsGridItem, NoHits,
    Hits, Layout, TopBar, LayoutBody, SideBar, Pagination
} from 'searchkit';

function ItemComponent(props) {
  return (
    <pre>
      {JSON.stringify(props, false, 2)}
    </pre>
  );
}

export default function(props) {
  const { apiUrl, prefixQueryFields, filters, sourceFilter, hitsPerPage } = props;
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
        <LayoutBody>
          <SideBar>
            <SearchBox
              autofocus={true}
              searchOnChange={true}
              prefixQueryFields={prefixQueryFields}
            />
            {filterElements}
          </SideBar>
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
            <Hits mod="sk-hits-list" hitsPerPage={hitsPerPage} itemComponent={ItemComponent}
              sourceFilter={sourceFilter}/>
            <NoHits/>
            <Pagination showNumbers={true}/>
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </SearchkitProvider>
  );
}
