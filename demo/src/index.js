import hubmapPortalSearch from '../../src';

hubmapPortalSearch.renderSearch(
  // ID of element to replace with search component:
  'demo',
  {
    apiUrl: 'http://demo.searchkit.co/api/movies/',
    prefixQueryFields: ['actors^1','type^2','languages','title^10'],
    // Prefix for details links:
    detailsUrlPrefix: 'https://www.imdb.com/title/',
    // Search results field which will be appended to detailsUrlPrefix:
    idField: 'imdbId',
    // Search results fields to display in table:
    resultFields: ['imdbId', 'title', 'actors'],
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
