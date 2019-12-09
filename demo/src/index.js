/*
In your own code, there are two ways to use portal-search:

- In plain HTML, import from unpkg and use the "hubmapPortalSearch" global:

  <!-- External libraries listed in nwb.config.js need to be loaded first: -->
  <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <!-- Load JS from CDN. (In production, add a version number!) -->
  <script src="https://unpkg.com/@hubmap/portal-search/umd/@hubmap/portal-search.min.js"></script>

- Or, if using npm, "npm install @hubmap/portal-search", and use either this wrapper,
  or the <Search> React component.
*/
import hubmapPortalSearch from '../../src';

hubmapPortalSearch.renderSearch(
  // ID of element to replace with search component:
  'demo',
  {
    // Elasticsearch instance to hit with queries:
    apiUrl: 'http://demo.searchkit.co/api/movies/',
    // Fields to search, and whether they have extra weight:
    prefixQueryFields: ['actors^1','type^2','languages','title^10'],
    // Prefix for details links:
    detailsUrlPrefix: 'https://www.imdb.com/title/',
    // Search results field which will be appended to detailsUrlPrefix:
    idField: 'imdbId',
    // Search results fields to display in table:
    resultFields: ['title', 'actors'],
    // Default hitsPerPage is 10:
    hitsPerPage: 5,
    // Sidebar facet configuration;
    // "type" should be one of the filters described here:
    // http://docs.searchkit.co/stable/components/navigation/
    filters: [
      {
        type: 'HierarchicalMenuFilter',
        props: {
          id: 'categories',
          fields: ['type.raw', 'genres.raw'],
          title: 'Categories',
        },
      },
      {
        type: 'RefinementListFilter',
        props: {
          id: 'actors',
          title: 'Actors',
          field: 'actors.raw',
          operator: 'AND',
          size: 10
        },
      }
    ]
  }
);
