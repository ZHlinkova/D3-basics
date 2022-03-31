"use scrict";

const monthlyRev = [
  {
    month: 1,
    sales: 40,
  },
  {
    month: 2,
    sales: 105,
  },
  {
    month: 3,
    sales: 140,
  },
  {
    month: 4,
    sales: 50,
  },
  {
    month: 5,
    sales: 200,
  },
  {
    month: 6,
    sales: 350,
  },
  {
    month: 7,
    sales: 50,
  },
  {
    month: 8,
    sales: 445,
  },
];

const wS = 800;
const hS = 200;
const paddingZero = 15;
const labels = "all";

const findMaxY = function (dataArray) {
  let maxTemp = 0;
  for (let i = 0; i < dataArray.length; i++) {
    maxTemp = maxTemp > dataArray[i] ? maxTemp : dataArray[i];
  }
  return maxTemp;
};

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

const maxYScatter = d3.max(monthlyRev, (d) => d.sales);
console.log(maxYScatter);
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
  .attr("cx", (d, i) => paddingZero + (i * wS) / monthlyRev.length)
  .attr("cy", (d) => hS - d.sales * ratioYScatter)
  .attr("r", 5)
  .attr("fill", (d) => salesKPI(d.sales));

const lablesScatter = svgScatter
  .selectAll("text")
  .data(monthlyRev)
  .enter()
  .append("text")
  .text((d) => showMinMax(monthlyRev, "sales", d.sales, labels))
  .attr("x", (d, i) => i * (wS / monthlyRev.length) + paddingZero)
  .attr("y", (d) => hS - d.sales * ratioYScatter - 25)
  .attr("font-family", "sans-serif")
  .attr("font-size", "18px")
  .attr("text-anchor", "middle")
  .attr("dy", "0.35em")
  .attr("font-weight", "normal");

d3.select("select").on("change", function (d) {
  const sel = d3.select("#labels-options").node().value;
  svgScatter
    .selectAll("text")
    .data(monthlyRev)
    .text((d) => showMinMax(monthlyRev, "sales", d.sales, sel));
});

//   .attr("font-weight", function (d, i) {
//     if (i === 0 || i === monthlySales.length - 1) {
//       return "bold";
//     } else {
//       return "normal";
//     }
