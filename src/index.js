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

class MovieHitsTable extends React.Component {

  render(){
    const { hits } = this.props
    return (
      <div style={{width: '100%', boxSizing: 'border-box', padding: 8}}>
        <table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Year</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {hits.map(hit => (
              <tr key={hit._id}>
                <td style={{margin: 0, padding: 0, width: 40}}>
                  <img data-qa="poster" src={hit._source.poster} style={{width: 40}}/>
                </td>
                <td>{hit._source.title}</td>
                <td>{hit._source.year}</td>
                <td>{hit._source.imdbRating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
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
            <Hits
              mod="sk-hits-list"
              hitsPerPage={hitsPerPage}
              listComponent={MovieHitsTable}
              sourceFilter={sourceFilter}
            />
            <NoHits/>
            <Pagination showNumbers={true}/>
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </SearchkitProvider>
  );
}
