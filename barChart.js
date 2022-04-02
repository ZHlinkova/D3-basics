// "use strict";

const w = 800;
const h = 200;
const padding = 5;

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

let dataset = [];

for (let i = 0; i < monthlyRev.length; i++) {
  dataset.push(monthlyRev[i].sales);
}

// console.log(dataset);

const svgBarChart = d3
  .select("#bar-chart")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const findMax = function (dataArray) {
  let maxTemp = 0;
  for (let i = 0; i < dataArray.length; i++) {
    maxTemp = maxTemp > dataArray[i] ? maxTemp : dataArray[i];
  }
  return maxTemp;
};

const datasetMax = findMax(dataset);
const ratio = (h / datasetMax) * 0.8;

// console.log(datasetMax, ratio);

const colorPicker = function (v) {
  const color = v <= datasetMax / 2 ? "#666666" : "#FF0033";
  return color;
};

svgBarChart
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * (w / dataset.length))
  .attr("y", (d) => h - d * ratio)
  .attr("width", w / dataset.length - padding)
  .attr("height", (d) => d * ratio)
  .style("fill", (d) => colorPicker(d))
  .on("mouseover", function (d) {
    svgBarChart
      .append("text")
      .text(d)
      .attr("text-anchor", "middle")
      .attr(
        "x",
        parseFloat(d3.select(this).attr("x")) +
          parseFloat(d3.select(this).attr("width") / 2)
      )
      .attr("y", parseFloat(d3.select(this).attr("y")) - 20)
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px")
      .attr("id", "tooltip");
  })
  .on("mouseout", function () {
    d3.select("#tooltip").remove();
  });

// .append("title") ///add basic tooltips
// .text((d) => d);
