import React from 'react';

import {
  SearchkitManager, SearchkitProvider, SearchBox,
  LayoutResults,
  ActionBar, ActionBarRow, HitsStats, SelectedFilters,
  ResetFilters, NoHits,
  Hits, Layout, LayoutBody, SideBar, Pagination,
} from 'searchkit'; // eslint-disable-line import/no-duplicates

import * as filterTypes from 'searchkit'; // eslint-disable-line import/no-duplicates
// There is more in the name space, but we only need the filterTypes.

function DebugItem(props) {
  return (
    <pre>
      {JSON.stringify(props, false, 2)}
    </pre>
  );
}

function makeTableComponent(fields) {
  return function ResultsTable(props) {
    const { hits } = props;
    return (
      <table className="sk-table sk-table-striped" style={{ width: '100%' }}>
        <thead>
          <tr>
            {fields.map((field) => <th key={field}>{field}</th>)}
          </tr>
        </thead>
        <tbody>
          {hits.map((hit) => (
            <tr
              key={
                // eslint-disable-next-line no-underscore-dangle
                hit._id
              }
            >
              {fields.map(
                // eslint-disable-next-line no-underscore-dangle
                (field) => (
                  <td key={field}>
                    <a href="#" style={{display: 'block'}}>
                      {hit._source[field]}
                    </a>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
}

export default function (props) {
  const {
    apiUrl, prefixQueryFields, filters, sourceFilter, hitsPerPage, debug,
  } = props;
  const searchkit = new SearchkitManager(apiUrl);

  const filterElements = filters.map((def) => React.createElement(
    filterTypes[def.type],
    def.props,
  ));

  return (
    <SearchkitProvider searchkit={searchkit}>
      <Layout>
        <LayoutBody>
          <SideBar>
            <SearchBox
              autofocus
              searchOnChange
              prefixQueryFields={prefixQueryFields}
            />
            {filterElements}
          </SideBar>
          <LayoutResults>
            <ActionBar>

              <ActionBarRow>
                <HitsStats />
              </ActionBarRow>

              <ActionBarRow>
                <SelectedFilters />
                <ResetFilters />
              </ActionBarRow>

            </ActionBar>
            {debug && (
            <Hits
              mod="sk-hits-list"
              hitsPerPage={hitsPerPage}
              itemComponent={DebugItem}
              sourceFilter={sourceFilter}
            />
            )}

            <Hits
              mod="sk-hits-list"
              hitsPerPage={hitsPerPage}
              listComponent={makeTableComponent(sourceFilter)}
              sourceFilter={sourceFilter}
            />
            <NoHits />
            <Pagination showNumbers />
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </SearchkitProvider>
  );
}
