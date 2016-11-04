import { injectReducer } from '../../store/reducers'
import { login } from 'redux/modules/Session'
import { fetchMetadata, fetchData } from './modules/Entities'

export default (store) => ({
  path : 'directory',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Directory = require('./containers/DirectoryContainer').default
      const reducer = require('./modules/Directory').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key : 'Directory', reducer })

      const state = store.getState()
      if (!state.session || !state.session.server || !state.session.server.apiUrl) {
        const loginAction = login({ apiUrl : 'https://molgenis02.gcc.rug.nl/api/' }, 'admin', 'directorydemo')
        store.dispatch(loginAction).then(() =>
          store.dispatch(fetchMetadata('eu_bbmri_eric_collections')).then(() =>
              store.dispatch(fetchData('eu_bbmri_eric_collections'))
          )
        )
      } else {
        store.dispatch(fetchData('eu_bbmri_eric_collections'))
        store.dispatch(fetchMetadata('eu_bbmri_eric_collections'))
      }

      /*  Return getComponent   */
      cb(null, Directory)

    /* Webpack named bundle   */
    }, 'Directory')
  }
})
