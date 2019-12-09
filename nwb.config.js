module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'hubmapPortalSearch',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    html: {
      template: 'demo/src/index.html',
    }
  }
}
