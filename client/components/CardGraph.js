import React from 'react';
import * as d3 from "d3";

export default class CardGraph extends React.Component {
  constructor(props){
    super(props);
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
    
    g.append("path")
    .datum(this.props.d)
    .attr("fill", "none")
    .attr("stroke", "#170f11")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
  }

  removeGraph() {
    var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    g = svg.select("g");
    g.remove();
  }

  render() {

    return (
      <svg width="200" height="200" className="chartGraph"></svg>
    );
  }
}
