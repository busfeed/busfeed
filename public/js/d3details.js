var path_total_color = "lightsteelblue";
var dot_total_color = "lightblue";
var path_recent_color = "lightcoral";
var dot_recent_color = "indianred";

function drawChart(day) {
   $.getJSON("../data/"+stopId+"/"+day, function(json) {
      console.log(json);
      var p_data = json.past;
      var c_data = json.curr;
      $('#chart').empty();

      var width = $(window).width();
      var height = 220;
      var margins = {"top": 5, "bot": 35, "left": 38, "right": 0};


      var curr_hour = (parseInt(new Date().getHours()) - 7)*2;
      var lower = 0;
      var higher = 34;

      if (curr_hour - 5 < lower) {
         higher = lower + 9;
      }
      else if (curr_hour + 4 >= higher) {
         lower = higher - 9;
      }
      else {
         lower = curr_hour - 5;
         higher = curr_hour + 4;
      }

      console.log(curr_hour, lower, higher);

      var svg = d3.select('#chart').append("svg")
      .attr("width", "100%")
      .attr("height", height)
      .attr("viewbox", "0 0 "+width+" "+height)
      .append("g");

      //308 max
      var xTickLocs = [];
      for (var i=0; i < 9; i++) {
         xTickLocs.push(margins.left+34*i);
      }

      var xScale = d3.scaleOrdinal(xTickLocs).domain(p_data.domain.slice(lower,higher));
      var yScale = d3.scaleLinear().rangeRound([height-margins.bot, margins.top]).domain([0, d3.max(p_data.range.slice(lower,higher).concat(c_data.range.slice(lower,higher)))]);
      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale).tickFormat(function(d) { if (Math.floor(d) != d) { return; } return d;});

      svg.append("g")
      .attr("transform", "translate(0," + (height-margins.bot) + ")")
      .attr("class", "axisColor")
      .call(xAxis);

      svg.append("g")
      .attr("transform", "translate("+margins.left+",0)")
      .attr("class", "axisColor")
      .call(yAxis);

      //historical line
      var p_line = d3.line()
      .x(function(d) {
         return xScale(d.x);
      })
      .y(function (d) {
         return yScale(d.y);
      })
      .curve(d3.curveMonotoneX);

      var p_points = [];
      for (var i=lower; i < higher; i++) {
         p_points.push({"x":p_data.domain[i], "y":p_data.range[i]});
      }

      svg.append('path')
      .attr('d', p_line(p_points))
      .attr('stroke', path_total_color)
      .attr('stroke-width', 2)
      .attr('fill', "none");

      svg.selectAll("dot")
      .data(p_points)
      .enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", function(d) { return xScale(d.x); })
      .attr("cy", function(d) { return yScale(d.y); })
      .style("fill", dot_total_color);

      //current day line
      var c_line = d3.line()
      .x(function(d) {
         return xScale(d.x);
      })
      .y(function (d) {
         return yScale(d.y);
      })
      .curve(d3.curveMonotoneX);

      var c_points = [];
      for (var i=lower; i < higher; i++) {
         c_points.push({"x":c_data.domain[i], "y":c_data.range[i]});
      }

      svg.append('path')
      .attr('d', c_line(c_points))
      .attr('stroke', path_recent_color)
      .attr('stroke-width', 2)
      .attr('fill', "none");

      svg.selectAll("dot")
      .data(c_points)
      .enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", function(d) { return xScale(d.x); })
      .attr("cy", function(d) { return yScale(d.y); })
      .style("fill", dot_recent_color);

      //Create X axis label
      svg.append("text")
      .attr("x", (width-margins.left) / 2 )
      .attr("y", height-3)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("Time of Day");

      //Create Y axis label
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x", 0 - margins.top - ((height-margins.top-margins.bot) / 2))
      .attr("dy", "1em")
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("Crowding Reports");
   });

}
