import React from 'react';
import * as d3 from "d3";

export default class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      prices: [],
      times: []
    }
    this.createGraph = this.createGraph.bind(this);
    this.removeGraph = this.removeGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps != this.props) {
      this.removeGraph();
      this.createGraph();
    }
  }

  // Fetches url and gets information from the url.
  createGraph() {    
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleTime().rangeRound([0, width]);
    let y = d3.scaleLinear().rangeRound([height, 0]);

    let line = d3.line()
        .x(function(d) { return x(d["date"])})
        .y(function(d) { return y(d["close"])});

    let area = d3.area()
        .x(function(d) { return x(d["date"])})
        .y0(height)
        .y1(function(d) { return y(d["close"])});

    x.domain(d3.extent(this.props.times, function(data) { return data; }));
    y.domain(d3.extent(this.props.prices, function(data) { return data; }));

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .select(".domain")
    .remove();

    g.append("path")
    .datum(this.props.d)
    .attr("class", "area")
    .attr("d", area);
    
    g.append("path")
    .datum(this.props.d)
    .attr("fill", "none")
    .attr("stroke", "#043a1b")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line)
    // .on("mouseover", handleMouseOver)
    // .on("mouseout", handleMouseOut);

    g.append("g")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

    svg.selectAll('text').attr("fill", "white");
  }

  removeGraph() {
    var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    g = svg.select("g");
    g.remove();
  }

  render() {

    return (
      <svg width="800" height="350"></svg>
    );
  }
}
