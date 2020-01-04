 d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function(err, data) {
     
         //Data
         const res = data;
         const dataset = res.data;
     
         //Variables
         const height = 400,
               width = 700,
               margin = {top: 20, left: 50, bottom: 30, right: 20},
               innerHeight = height - margin.top - margin.bottom,
               innerWidth = width - margin.left - margin.right,
               barWidth = innerWidth/dataset.length;
               
         //Convert date strings to date objects
         var yearsDate = dataset.map(function(d) {
             return new Date(d[0]);
         });
     
         //Create Canvas
         const svg = d3.select('.main')
                       .append('svg')
                       .attr('width', width)
                       .attr('height', height)
                       .attr('class', 'graph-card card')
                       .style('background', '#f4f4f4');
     
         //Create Margins
         const g = svg.append('g')
                      .attr('transform', `translate(${margin.left}, ${margin.top})`);
     
         //Create Scales
             const yScale = d3.scaleLinear()
                              .domain([0, d3.max(dataset, (d) => d[1])])
                              .range([innerHeight, 0]);
     
             const xScale = d3.scaleTime()
                              .domain(d3.extent(yearsDate))
                              .range([0, innerWidth]);
                              
         //Create Axes
        g.append('g').call(d3.axisLeft(yScale))
                      .attr('id', 'y-axis');
         g.append('g').call(d3.axisBottom(xScale))
                      .attr('transform', `translate(0, ${innerHeight})`)
                      .attr('id', 'x-axis');
         
         //Create Tooltips
       const tooltip = svg.append('text')
                          .attr('id', 'tooltip');
       
         //Create Bars
           g.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr("width", barWidth)
            .attr('height', (d) => innerHeight - yScale(d[1]))
            .attr('x', (d, i) => (i * barWidth))
            .attr('y', (d) => yScale(d[1]))
            .attr('class', 'bar')
            .attr('data-date', d => d[0])
            .attr('data-gdp', d => d[1])
            .on('mouseover', function(d, i) {
               tooltip.attr('data-date', d[0])
                      .text(`Date: ${d[0]}, GDP: ${d[1]}`)
                      .attr('x', i * barWidth)
                      .attr('y', innerHeight/2);
             });
         
            svg.on('mouseout', function() {
                   tooltip.attr('opacity', 0);
             })
            svg.on('mouseover', function() {
                  tooltip.attr('opacity', '100')
           })
        })