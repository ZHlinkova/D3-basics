"use scrict";

let dataJson;

const buildBar = function (dataJson) {
  const svgScatter = d3
    .select("#viz-json")
    .append("svg")
    .attr({ width: wS, height: hS, border: "2px" });

  //add dots
  const dots = svgScatter
    .selectAll("circle")
    .data(dataJson.monthlySales)
    .enter()
    .append("circle")
    .attr({
      cx: (d, i) => paddingZero + (i * wS) / dataJson.monthlySales.length,
      cy: (d) => hS - d.sales * ratioYScatter,
      r: 5,
      fill: (d) => salesKPI(d.sales),
    });

  const lablesScatter = svgScatter
    .selectAll("text")
    .data(dataJson.monthlySales)
    .enter()
    .append("text")
    .text((d) => showMinMax(dataJson, "sales", d.sales, "all"))
    .attr("x", (d, i) => i * (wS / dataJson.monthlySales.length) + paddingZero)
    .attr("y", (d) => hS - d.sales * ratioYScatter - 25)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("font-weight", "normal");
};

const showHeader = function (ds) {
  d3.select("#viz-json").append("h1").text(`${ds.category} Sales (2021)`);
};

d3.json("monthlySalesCateg.json", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    // console.log(data);
  }

  data.forEach((ds) => {
    // console.log(ds);
    showHeader(ds);
    buildBar(ds);
  });
});
