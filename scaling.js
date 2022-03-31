"use strict";

let windowWidth;
window.onresize = reportWindowSizeResize;
window.onload = reportWindowSizeLoad;

function reportWindowSizeResize() {
  windowWidth = window.innerWidth;
  console.log("Redrawing");
  console.log("Resize" + windowWidth);

  //clear div before redrawing
  document.getElementById("bar-chart").innerHTML = "";
  drawBar();
}

function reportWindowSizeLoad() {
  windowWidth = window.innerWidth;
  console.log("Loading");
  console.log("Load" + windowWidth);
  drawBar();
}

const colorPicker = function (v, randomColor1, randomColor2, max) {
  const color = v <= max / 2 ? randomColor1 : randomColor2;
  return color;
};

const findMax = function (dataArray) {
  let maxTemp = 0;
  for (let i = 0; i < dataArray.length; i++) {
    maxTemp = maxTemp > dataArray[i].sales ? maxTemp : dataArray[i].sales;
  }
  return maxTemp;
};

const findMin = function (dataArray) {
  let minTemp = 0;
  for (let i = 0; i < dataArray.length; i++) {
    minTemp = minTemp < dataArray[i].sales ? minTemp : dataArray[i].sales;
  }
  return minTemp;
};

const h = 200;
const padding = 5;
let dataDecoded;

const buildBar = function (data) {
  const w = windowWidth * 0.95 ? windowWidth * 0.95 : 800;

  const maxY = d3.max(data.monthlySales, (d) => d.sales);

  const scale = d3.scale
    .linear()
    .domain([0, maxY])
    .range([0, h * 0.85]);

  const dataLen = data.monthlySales.length;

  const header = d3.select("#bar-chart").append("h3").text(data.category);

  const randomColor1 = "#" + Math.floor(Math.random() * 16777215).toString(16);

  const randomColor2 = "#" + Math.floor(Math.random() * 16777215).toString(16);

  const svgBarChart = d3
    .select("#bar-chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svgBarChart
    .selectAll("rect")
    .data(data.monthlySales)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (w / dataLen))
    .attr("y", (d) => h - scale(d.sales))
    .attr("width", w / dataLen - padding)
    .attr("height", (d) => scale(d.sales))
    .style("fill", (d) =>
      colorPicker(
        d.sales,
        randomColor1,
        randomColor2,
        findMax(data.monthlySales)
      )
    );

  svgBarChart
    .selectAll("text")
    .data(data.monthlySales)
    .enter()
    .append("text")
    .text((d) => d.sales)
    .attr("text-anchor", "middle")
    .attr("x", (d, i) => i * (w / dataLen) + (w / dataLen - padding) / 2)
    .attr("y", (d) => h - (scale(d.sales) + 5))
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px");
};

const drawBar = function () {
  d3.json(
    "https://api.github.com/repos/ZHlinkova/D3-basics/contents/monthlySalesCateg.json",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        dataDecoded = JSON.parse(window.atob(data.content));
        console.log(dataDecoded);
      }

      dataDecoded.forEach((ds) => {
        buildBar(ds);
      });
    }
  );
};
