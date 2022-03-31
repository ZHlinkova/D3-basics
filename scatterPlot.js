"use scrict";

const wS = 800;
const hS = 200;

//KPI
const salesKPI = function (data) {
  if (data > 250) return "#33CC66";
  else {
    return "#666666";
  }
};

const showMinMax = function (ds, col, val, type) {
  const max = d3.max(ds, (d) => d[col]);
  const min = d3.min(ds, (d) => d[col]);
  if (type === "minmax" && (val === max || val === min)) {
    return val;
  } else {
    if (type === "all") {
      return val;
    }
  }
};

const maxYScatter = findMaxY(monthlyRev);
const ratioYScatter = (hS / maxYScatter) * 0.8;

const svgScatter = d3
  .select("#scatter-plot")
  .append("svg")
  .attr({ width: wS, height: hS, border: "2px" });

//add dots
const dots = svgScatter
  .selectAll("circle")
  .data(monthlyRev)
  .enter()
  .append("circle")
  .attr({
    cx: (d, i) => paddingZero + (i * wS) / monthlyRev.length,
    cy: (d) => hS - d.sales * ratioYScatter,
    r: 5,
    fill: (d) => salesKPI(d.sales),
  });

const lablesScatter = svgScatter
  .selectAll("text")
  .data(monthlyRev)
  .enter()
  .append("text")
  .text((d) => showMinMax(monthlyRev, "sales", d.sales, "minmax"))
  .attr("x", (d, i) => i * (wS / monthlyRev.length) + paddingZero)
  .attr("y", (d) => hS - d.sales * ratioYScatter - 25)
  .attr("font-family", "sans-serif")
  .attr("font-size", "18px")
  .attr("text-anchor", "middle")
  .attr("dy", "0.35em")
  .attr("font-weight", "normal");

//   .attr("font-weight", function (d, i) {
//     if (i === 0 || i === monthlySales.length - 1) {
//       return "bold";
//     } else {
//       return "normal";
//     }
