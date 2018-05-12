import React from 'react';
import * as d3 from "d3";

export default class Graph extends React.Component {
  constructor(props){
    super(props);
    this.CreateGraph = this.CreateGraph.bind(this)
  }

  componentDidMount() {
    this.CreateGraph();
  }

  // Fetches url and gets information from the url.
  CreateGraph() {
    let url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=USD&apikey=235YGSKH6SQMLSTA&datatype=csv";

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let timeParser = d3.timeParse("%Y-%m-%d %H:%M:%S");

    let x = d3.scaleTime().rangeRound([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    let line = d3.line()
        .x(function(d) { return x(d["timestamp"])})
        .y(function(d) { return y(d["price"])});

    let area = d3.area()
        .x(function(d) { return x(d["timestamp"])})
        .y0(height)
        .y1(function(d) { return y(d["price"])});

    let times = [];
    let prices = [];

    d3.csv(url, function(data) {
      data["timestamp"] = timeParser(data["timestamp"]);
      data["price"] = +data["price (USD)"];
      prices.push(+data["price (USD)"]);
      times.push(data["timestamp"]);
      return data;
    }).then(function(d){
      // Check for failure to retry.
      if (d[0]["timestamp"] == null) {
        this.CreateGraph();
        return;
      }

      x.domain(d3.extent(times, function(data) { return data; }));
      y.domain(d3.extent(prices, function(data) { return data; }));

      g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();

      g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "171738")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

      g.append("path")
      .datum(d)
      .attr("class", "area")
      .attr("d", area);
      
      g.append("path")
      .datum(d)
      .attr("fill", "none")
      .attr("stroke", "#170f11")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
    }).catch(error => {
      console.error("error: ", error);
      this.CreateGraph();
      return;
    });
  }

  render() {

    return (
      <div className="Graph">
        <svg width="800" height="500"></svg>
      </div>
    );
  }
}
