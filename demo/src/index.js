import hubmapPortalSearch from '../../src';

hubmapPortalSearch.renderSearch('demo', {
  apiUrl: 'http://demo.searchkit.co/api/movies/',
  prefixQueryFields: ['actors^1','type^2','languages','title^10'],
  resultFields: ['title', 'actors'],
  hitsPerPage: 5,
  filters: [
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
  ]
});
