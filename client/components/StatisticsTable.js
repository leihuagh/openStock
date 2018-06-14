import React from 'react'
import PropTypes from 'prop-types'

class StatisticsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const stats = this.props.data.map((e, i) =>
        <tr key={i}>
          <td>
            <a href={"/Stocks?symbol=" + e['symbol']}>
              {e['symbol']} 
            </a>
          </td>
          {e['change']> 0 ? <td className='green'> +{e['change']} </td> : <td className='red'> {e['change']} </td>}
          <td> {e['latestVolume']} </td>
        </tr>

    );
    return (
      <div className='statisticsTable card'>
        <h2> {this.props.name} </h2>
        <table>
          <tbody>
            <th>Symbol</th>
            <th>Change</th>
            <th>Volume</th>
            {stats}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StatisticsTable