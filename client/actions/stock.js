import axios from 'axios'

export const REQUEST_STOCK = 'REQUEST_STOCK'
export const RECIEVE_STOCK = 'RECIEVE_STOCK'
export const SELECT_STOCK = 'SELECT_STOCK'


function selectStock(symbol) {
  return {
    type: SELECT_STOCK,
    symbol
  }
}

function requestStock(symbol) {
  return {
    type: REQUEST_STOCK,
    symbol
  }
}

function recieveStock(data) {
  return {
    type: RECIEVE_STOCK,
    stock: data,
    recievedAt: Date.now()
  }
}

 function fetchStock(symbol, dataType) {
  return dispatch => {
    dispatch(requestStock(symbol));
    return axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=" + API_KEY + "&datatype=" + dataType)
      .then(response => response.json())
      .then(json => dispatch(recieveStock(json)))
  }
}

 function shouldFetchStock(state, symbol) {

 }

 export function fetchStockIfNeeded(symbol) {
  return (dispatch, getState) => {
    if (shouldfetchStock(getState(), symbol)){
      return dispatch(fetchStock(symbol));
    }
  }
 }