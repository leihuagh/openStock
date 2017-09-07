import { REQUEST_STOCK, RECIEVE_STOCK } from '../actions/stock.js'

function rootReducer(
    state = {
      isFetching: false,
      didInvalidate: false,
      stock: []
    },
    action
  ) {
    switch (action.type) {
      case REQUEST_STOCK:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case RECIEVE_STOCK:
        return Object.assign({}, state, {
          isFetching: false,
          stock: action.stock,
          lastUpdated: action.receivedAt
        })
      default:
        return state;
    }
  }

export default rootReducer;