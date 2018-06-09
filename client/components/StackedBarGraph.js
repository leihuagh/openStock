import React from 'react';
import * as d3 from "d3";

export default class StackedBarGraph extends React.Component {
    constructor(props) {
        super(props);
        this.createBarGraph = this.createBarGraph.bind(this);
    }
    
    componentDidMount() {
        this.createBarGraph();
    }

    createBarGraph() {
        console.log(this.props.d);
        var svg = d3.select("." + this.props.name + " "  + " svg");
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var x0 = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.1);
        var x1 = d3.scaleBand().padding(0.05);
        var y = d3.scaleLinear().rangeRound([height, 0]);
        var z = d3.scaleOrdinal().range(["red", "green", "blue", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var keys = ['tapeA', 'tapeB', 'tapeC'];
        x0.domain(this.props.d.map(function(d) { return d['venueName']; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(this.props.d, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        g.append("g")
        .selectAll("g")
        .data(this.props.d)
        .enter().append("g")
          .attr("transform", function(d) { return "translate(" + x0(d['venueName']) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return keys.map(function(key) { return {key: key, value: +d[key]}; }); })
        .enter().append("rect")
          .attr("x", function(d) { return x1(d.key); })
          .attr("y", function(d) { return y(d.value); })
          .attr("width", x1.bandwidth())
          .attr("height", function(d) { return height - y(d.value); })
          .attr("fill", function(d) { return z(d.key); });
    
        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));
                
        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Stocks Sold");
    }

    render() {

        return (
          <div className={this.props.name}>
            <svg preserveAspectRatio="xMinYMin meet" width='800' height='350' viewBox="0 0 800 350  "></svg>
          </div>
        );
    }
}