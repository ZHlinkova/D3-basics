// "use strict";
//D3 == data-driven documents

//SVG = scalable vector graphics
//shapes, filters, gradients
// d3.select("body")
//   .append("svg")
//   .attr("width", 50)
//   .attr("height", 50)
//   .append("circle")
//   .attr("cx", 25)
//   .attr("cy", 25)
//   .attr("r", 25)
//   .style("fill", "red");

// d3.select("#text-div")
//   .append("svg")
//   .attr("width", 250)
//   .attr("height", 50)
//   .append("text")
//   .text("dadsdas")
//   .attr("x", 25)
//   .attr("y", 25)
//   .style("fill", "blue");

const w = 800;
const h = 200;
const padding = 5;
const dataset = [5, 10, 15, 20, 25];
const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

//change

console.log(`change`);

const findMax = function (dataArray) {
  let maxTemp = 0;
  for (let i = 0; i < dataArray.length; i++) {
    maxTemp = maxTemp > dataArray[i] ? maxTemp : dataArray[i];
  }
  return maxTemp;
};

const datasetMax = findMax(dataset);
const ratio = h / findMax(dataset);

console.log(datasetMax, ratio);

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return i * (w / dataset.length);
  })
  .attr("y", function (d) {
    return h - d * ratio;
  })
  .attr("width", w / dataset.length - padding)
  .attr("height", function (d) {
    return d * ratio;
  })
  .style("fill", function (d, i) {
    return `rgba(${0 * d},${4 * d},${4 * d} )`;
  });
