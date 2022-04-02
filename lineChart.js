"use strict";

let monthlyRev = [
  {
    month: 20130101,
    sales: 0,
  },
  {
    month: 20130102,
    sales: 40,
  },
  {
    month: 20130103,
    sales: 105,
  },
  {
    month: 20130104,
    sales: 140,
  },
  {
    month: 20130105,
    sales: 0,
  },
  {
    month: 20130106,
    sales: 200,
  },
  {
    month: 20130107,
    sales: 400,
  },
  {
    month: 20130108,
    sales: 400,
  },
  {
    month: 20130109,
    sales: 450,
  },
  {
    month: 20130110,
    sales: 400,
  },
  {
    month: 20130111,
    sales: 600,
  },
  {
    month: 20130112,
    sales: 400,
  },
];

const wL = 900;
const hL = 400;
const paddingL = 50;
const paddingBottom = 20;
const paddingLeft = 30;

const maxY = d3.max(monthlyRev, (d) => d.sales);
const maxX = monthlyRev.length;

const getDate = function (d) {
  const strDate = new String(d);
  const day = strDate.substr(4, 2);

  const year = strDate.substr(0, 4);
  const month = strDate.substr(6) - 1; //zero based index

  // console.log(strDate, year, month, day);

  return new Date(year, month, day);
};

const minDate = getDate(monthlyRev[0].month);
const maxDate = getDate(monthlyRev[monthlyRev.length - 1].month);

// console.log(minDate, maxDate);

const buildLine = function () {
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  const minDate = getDate(monthlyRev[0].month);
  const maxDate = getDate(monthlyRev[monthlyRev.length - 1].month);
  const scaleLineX = d3.time
    .scale()
    .domain([minDate, maxDate])
    .range([paddingLeft, wL - paddingLeft]);

  const scaleLineY = d3.scale
    .linear()
    .domain([0, maxY])
    .range([hL - paddingBottom, paddingBottom]);

  const axisY = d3.svg.axis().scale(scaleLineY).ticks(5).orient("left");

  const axisX = d3.svg
    .axis()
    .scale(scaleLineX)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"));

  // console.log(maxY, ratioY);

  const lineFun = d3.svg
    .line()
    .x((d, i) => scaleLineX(getDate(d.month)))
    .y((d) => scaleLineY(d.sales))
    .interpolate("linear");

  const svg = d3
    .select("#line-chart")
    .append("svg")
    .attr("width", wL)
    .attr("height", hL)
    .attr("id", "svg-furniture");

  const axisLeft = svg
    .append("g")
    .call(axisY)
    .attr("class", "axisY")
    .attr("transform", `translate(${paddingLeft},0)`);

  const axisBottom = svg
    .append("g")
    .call(axisX)
    .attr("class", "axisX")
    .attr("transform", `translate(0,${hL - paddingBottom})`);

  const viz = svg
    .append("path")
    .attr("d", lineFun(monthlyRev))
    .attr("stroke", "purple")
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("class", "path-furniture");

  const dots = svg
    .selectAll("circle")
    .data(monthlyRev)
    .enter()
    .append("circle")
    .attr({
      cx: (d, i) => scaleLineX(getDate(d.month)),
      cy: (d) => scaleLineY(d.sales),
      r: "4px",
      fill: "purple",
      class: "circle-furniture",
    })
    .on("mouseover", function (d) {
      tooltip.transition().duration(500).style("opacity", 0.85);
      tooltip
        .html(`<strong>Sales: ${d.sales} CZK</strong>`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      tooltip.transition().duration(300).style("opacity", 0);
    });

  const lables = svg
    .selectAll("text")
    .data(monthlyRev)
    .enter()
    .append("text")
    .text((d) => d.sales)
    .attr("x", (d, i) => scaleLineX(getDate(d.month)))
    .attr("y", (d) => scaleLineY(d.sales))
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("font-weight", function (d, i) {
      if (i === 0 || i === monthlyRev.length - 1) {
        return "bold";
      } else {
        return "normal";
      }
    });
};

const updateLine = function (ds, sel) {
  const minDate = getDate(ds[0].month);
  const maxDate = getDate(ds[ds.length - 1].month);
  const scaleLineX = d3.time
    .scale()
    .domain([minDate, maxDate])
    .range([paddingLeft, wL - paddingLeft]);

  const scaleLineY = d3.scale
    .linear()
    .domain([0, maxY])
    .range([hL - paddingBottom, paddingBottom]);

  const axisY = d3.svg.axis().scale(scaleLineY).ticks(5).orient("left");

  const axisX = d3.svg
    .axis()
    .scale(scaleLineX)
    .orient("bottom")
    .tickFormat(d3.time.format("%b"))
    .ticks(ds.length - 1);
  // console.log(maxY, ratioY);

  const lineFun = d3.svg
    .line()
    .x((d, i) => scaleLineX(getDate(d.month)))
    .y((d) => scaleLineY(d.sales))
    .interpolate("linear");

  const svg = d3.select("#line-chart").select("#svg-furniture");

  const axisLeft = svg.selectAll("g.axisY").call(axisY);

  const axisBottom = svg.selectAll("g.axisX").call(axisX);

  const viz = svg
    .selectAll(".path-furniture")
    .transition()
    .duration(1000)
    .ease("linear") //elastic//circle//bounce
    .attr("d", lineFun(ds));

  const dots = svg
    .selectAll(".circle-furniture")
    .transition()
    .duration(1000)
    .ease("linear")
    .attr({
      cx: (d, i) => scaleLineX(getDate(d.month)),
      cy: (d) => scaleLineY(d.sales),
    });
};

buildLine();

d3.select("select").on("change", (d, i) => {
  const sel = d3.select("#date-option").node().value;
  let dataNew = [...monthlyRev];
  console.log(dataNew);
  console.log(sel);
  console.log(monthlyRev.length);

  dataNew.splice(0, monthlyRev.length - sel);
  updateLine(dataNew, sel);
});
