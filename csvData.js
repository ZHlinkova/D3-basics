"use strict";
// "use strict";

let ds;

const buildLine = function () {
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
    .attr("d", lineFun(ds))
    .attr("stroke", "purple")
    .attr("stroke-width", 2)
    .attr("fill", "none");
};

d3.csv("monthlySales.csv", function (error, data) {
  if (error) {
    console.log(error);
  } else {
    // console.log(data);
    ds = data;
  }

  //buildLine();
});
