"use strict";
// "use strict";

let ds2;
let total = 0.0;
let avg = 0;
let metrics = [];

const buildLine2 = function () {
  const lineFun = d3.svg
    .line()
    .x((d, i) => d.month * i * 10)
    .y((d) => h - d.sales / 10)
    .interpolate("linear");

  const svgLineCsv = d3
    .select("#bar-chart-csv")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  const vizCsv = svgLineCsv
    .append("path")
    .attr("d", lineFun(ds2))
    .attr("stroke", "purple")
    .attr("stroke-width", 2)
    .attr("fill", "none");
};

const showTotals = function () {
  const t = d3.select("#table").append("table");
  //get total
  for (let i = 0; i < ds2.length; i++) {
    total += ds2[i]["sales"] * 1;
  }

  metrics.push(`Sales total: ${total}`);

  //get avg
  avg = (total / ds.length).toFixed(2);

  metrics.push(`Sales avg: ${avg}`);

  //ad total to table
  const tr = t
    .selectAll("tr")
    .data(metrics)
    .enter()
    .append("tr")
    .append("td")
    .text((d) => d);
};

d3.csv("monthlySales.csv", function (error, data) {
  if (error) {
    console.log(error);
  } else {
    // console.log(data);
    ds2 = data;
  }

  buildLine2();
  showTotals();
});
