$.getJSON("../data/"+stopId, function(json) {
   console.log(json);
   var width = $(window).width();
   var height = 210;

   var svg = d3.select('#chart').append("svg")
   .attr("width", "100%")
   .attr("height", height)
   .attr("viewbox", "0 0 "+width+" "+height)
   .append("g");

   var xScale = d3.scaleOrdinal([20, 56, 92, 128, 164, 200, 236, 272, 308]).domain(json.domain.slice(0,9));
   var yScale = d3.scaleLinear().rangeRound([height-30, 0]).domain([0, d3.max(json.range.slice(0,9))]);
   var xAxis = d3.axisBottom(xScale);
   var yAxis = d3.axisLeft(yScale).tickFormat(function(d) { if (Math.floor(d) != d) { return; } return d;});

   svg.append("g")
      .attr("transform", "translate(0," + (height-25) + ")")
      .call(xAxis);

   svg.append("g")
      .attr("transform", "translate(20,5)")
      .call(yAxis);

   var line = d3.line()
      .x(function(d) {
         return xScale(d.x);
      })
      .y(function (d) {
         return yScale(d.y);
      });

   var data = [];
   for (var i=0; i < 9; i++) {
      data.push({"x":json.domain[i], "y":json.range[i]});
   }
   svg.append('path')
      .attr('d', line(data))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
});
