import React from 'react';
import * as d3 from "d3";

export default class Graph extends React.Component {
  constructor(props){
    super(props);
    this.createGraph = this.createGraph.bind(this)
    this.changeActive = this.changeActive.bind(this)

  }

  componentDidMount() {
    this.createGraph();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps != this.props) {
      this.createGraph();
    }
  }

  // Fetches url and gets information from the url.
  // TODO: Refactor for different graphs and move fetch into Info.js.
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

    g.append("g")
    .call(yAxis)
    .append("text")
    .attr("fill", "171738")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

    g.append("path")
    .datum(this.props.d)
    .attr("class", "area")
    .attr("d", area);
    
    g.append("path")
    .datum(this.props.d)
    .attr("fill", "none")
    .attr("stroke", "#170f11")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
  }


  changeActive(id) {
    let buttons = document.getElementsByTagName("button");
  
    for(let i =0; i < buttons.length; i++) {
      buttons.item(i).classList.remove("active");
    }
    
    document.getElementById(id).classList.add("active");
  }
  /* 
    Pass id to method to change active.
    onClick should also change the rate of the graph.
  */
  render() {

    return (
      <div className="Graph">
        <h2>
         {this.props.name}
        </h2>
        <h3>
          <button onClick={() => this.changeActive('hour')} id="hour">1H</button>
          <button onClick={() => this.changeActive('day')} id="day" className="active">1D</button>
          <button onClick={() => this.changeActive('week')} id="week">1W</button>
          <button onClick={() => this.changeActive('month')} id="month">1M</button>
          <button onClick={() => this.changeActive('year')} id="year">1Y</button>
          <button onClick={() => this.changeActive('all')} id="all">ALL</button>
         </h3>
        <svg width="800" height="350"></svg>
      </div>
    );
  }
}
