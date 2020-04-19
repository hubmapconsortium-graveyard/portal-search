import React from 'react';

import {
  SearchkitManager, SearchkitProvider, SearchBox,
  LayoutResults,
  ActionBar, ActionBarRow, SelectedFilters,
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

function makeTableComponent(fields, detailsUrlPrefix, idField) {
  return function ResultsTable(props) {
    const { hits } = props;
    /* eslint-disable no-underscore-dangle */
    return (
      <table className="sk-table sk-table-striped" style={{ width: '100%' }}>
        <thead>
          <tr>
            {fields.map((field) => <th key={field}>{field}</th>)}
          </tr>
        </thead>
        <tbody>
          {hits.map((hit) => (
            <tr key={hit._id}>
              {fields.map(
                (field) => (
                  <td key={field}>
                    <a
                      href={detailsUrlPrefix + hit._source[idField]}
                      style={{ display: 'block' }}
                    >
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
    /* eslint-enable no-underscore-dangle */
  };
}

export default function (props) {
  const {
    apiUrl, prefixQueryFields, filters, detailsUrlPrefix,
    idField, resultFields, hitsPerPage, debug, httpHeaders,
    hiddenFilterIds = [],
    searchUrlPath = '_search',
  } = props;
  const resultFieldsPlusId = [...resultFields, idField];
  const searchkit = new SearchkitManager(apiUrl, { httpHeaders, searchUrlPath });

  const filterElements = filters.map((def) => {
    const Filter = filterTypes[def.type];
    const style = hiddenFilterIds.indexOf(def.props.id) === -1
      ? {} : {display: 'None'};
    return (
      <div style={style}>
        <Filter
          {...def.props}
        />
      </div>
    );
  });

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
                <SelectedFilters />
                <ResetFilters />
              </ActionBarRow>
            </ActionBar>
            {debug && (
            <Hits
              mod="sk-hits-list"
              hitsPerPage={hitsPerPage}
              itemComponent={DebugItem}
              sourceFilter={resultFieldsPlusId}
            />
            )}

            <Hits
              mod="sk-hits-list"
              hitsPerPage={hitsPerPage}
              listComponent={makeTableComponent(resultFields, detailsUrlPrefix, idField)}
              sourceFilter={resultFieldsPlusId}
            />
            <NoHits />
            <Pagination showNumbers />
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </SearchkitProvider>
  );
}
