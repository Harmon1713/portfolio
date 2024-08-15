// Get initial container dimensions based on the screen size
const containerWidth = document.getElementById('map-container').offsetWidth;
const containerHeight = containerWidth * 0.625; // Maintain a 16:10 aspect ratio for the map

// Create the SVG container for the map
const svgContainer = d3.select("#map")
  .append("svg")
  .attr("width", containerWidth)
  .attr("height", containerHeight);

// Create a group element within the SVG to hold the map paths
const svg = svgContainer.append("g");

// Define the map projection and scaling
const projection = d3.geoMercator()
  .scale(containerWidth / 5) // Adjust scale according to container width
  .translate([containerWidth / 2, containerHeight / 1.5]); // Center the map

// Define the path generator using the projection
const path = d3.geoPath().projection(projection);

// List of visited countries and their respective colors
const visitedCountries = {
  "Brazil": "green",
  "United States of America": "blue",
  "Mexico": "red",
  "Guatemala": "orange",
  "Haiti": "purple",
  "Dominican Republic": "teal",
  "Cuba": "darkorange",
  "Honduras": "cyan",
  "El Salvador": "lime",
  "Costa Rica": "magenta",
  "Panama": "brown",
  "Puerto Rico": "navy",
  "Jamaica": "olive",
  "The Bahamas": "lightcoral",
  "Belize": "maroon",
  "Argentina": "peru",
  "Uruguay": "pink",
  "Colombia": "lightgreen",
  "Paraguay": "crimson",
  "Turkey": "orchid",
  "Spain": "slateblue",
  "United Republic of Tanzania": "orangered"
};

// List of small countries not shown on the map due to size
const smallCountries = [
  "Bermuda", "US Virgin Islands", "Turks and Caicos Islands", 
  "Saint Lucia", "Curaçao", "Cayman Islands", 
  "Barbados", "Antigua and Barbuda"
];

// Placeholder for filtered world data after removing small countries
let filteredWorld;

// Function to draw the map with a specified horizontal translation (for wrapping)
function drawMap(translation) {
    svg.append("g")
      .selectAll("path")
      .data(filteredWorld) // Bind filtered world data to paths
      .enter().append("path")
      .attr("d", path) // Generate the path data for each country
      .attr("transform", `translate(${translation}, 0)`) // Apply horizontal translation for wrapping
      .attr("class", "country")
      .style("fill", d => (d.properties && visitedCountries[d.properties.name]) ? visitedCountries[d.properties.name] : "lightgray") // Fill color based on visited countries
      .style("stroke", "white")
      .style("stroke-width", 0.5)
      .on("mouseover", function (event, d) { // Tooltip and hover effects
          if (d.properties) {
            const countryName = d.properties.name;
            const visited = visitedCountries[countryName];
            const imagePath = `images/${countryName}.jpg`;

            // Check if the image for the country exists
            const imageExists = new Image();
            imageExists.onload = function () { // If the image exists
              const tooltip = d3.select("#tooltip")
                .html(`<strong>${countryName}</strong><br><img src="${imagePath}" class="large-img">`)
                .style("display", "block")
                .style("width", "220px")
                .style("height", "auto");

              const tooltipWidth = 220;
              const tooltipHeight = tooltip.node().offsetHeight;
              const cursorX = event.pageX;
              const cursorY = event.pageY;
              const mapWidth = svgContainer.node().getBoundingClientRect().width;
              const mapHeight = svgContainer.node().getBoundingClientRect().height;

              let left, top;

              // Determine horizontal position based on cursor position
              if (cursorX < mapWidth / 2) {
                left = cursorX + 5;
              } else {
                left = cursorX - tooltipWidth - 5;
              }

              // Determine vertical position based on cursor position
              if (cursorY < mapHeight / 3) {
                top = cursorY + 5;
              } else if (cursorY > 2 * mapHeight / 3) {
                top = cursorY - tooltipHeight - 5;
              } else {
                top = cursorY - tooltipHeight / 4;
              }

              // Set the position of the tooltip
              tooltip.style("left", `${left}px`)
                .style("top", `${top}px`);
            };

            imageExists.onerror = function () { // If the image does not exist
              const tooltip = d3.select("#tooltip");
              if (visited) {
                tooltip.html(`<strong>${countryName}</strong><br>Picture coming soon!<br><img src="images/pic_to_come.png" class="normal-img">`)
                  .style("width", "110px")
                  .style("height", "auto");
              } else {
                tooltip.html(`<strong>${countryName}</strong><br>Not yet visited`)
                  .style("width", "110px")
                  .style("height", "auto");
              }
              tooltip.style("display", "block");

              const tooltipWidth = 220;
              const tooltipHeight = tooltip.node().getBoundingClientRect().height;
              const cursorX = event.pageX;
              const cursorY = event.pageY;
              const mapWidth = svgContainer.node().getBoundingClientRect().width;
              const mapHeight = svgContainer.node().getBoundingClientRect().height;

              let left, top;

              // Determine horizontal position based on cursor position
              if (cursorX < mapWidth / 2) {
                left = cursorX + 5;
              } else {
                left = cursorX - tooltipWidth - 5;
              }

              // Determine vertical position based on cursor position
              if (cursorY < mapHeight / 3) {
                top = cursorY + 5;
              } else if (cursorY > 2 * mapHeight / 3) {
                top = cursorY - tooltipHeight - 5;
              } else {
                top = cursorY - tooltipHeight / 4;
              }

              // Set the position of the tooltip
              tooltip.style("left", `${left}px`)
                .style("top", `${top}px`);
            };

            imageExists.src = imagePath; // Set the image path to check existence
            d3.select(this).style("fill", visited ? d3.rgb(visited).brighter() : "darkgray"); // Highlight country on hover
          }
      })
      .on("mouseout", function (event, d) { // Reset fill color and hide tooltip on mouseout
          d3.select(this).style("fill", d.properties && visitedCountries[d.properties.name] ? visitedCountries[d.properties.name] : "lightgray");
          d3.select("#tooltip").style("display", "none");
      });
}

// Function to resize the map and adjust elements on window resize
function resizeMap() {
    const containerWidth = document.getElementById('map-container').offsetWidth;
    const containerHeight = containerWidth * 0.625; // Maintain the aspect ratio

    // Update SVG container dimensions
    svgContainer
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    // Update the map projection scale and translation
    projection
      .scale(containerWidth / 5)
      .translate([containerWidth / 2, containerHeight / 1.5]);

    // Remove existing map groups to redraw
    svg.selectAll("g").remove();

    // Calculate the horizontal translation for wrapping
    const offsetX = containerWidth * 1.3;

    // Redraw the map with updated translations
    drawMap(0);
    drawMap(offsetX * 0.967);
    drawMap(-offsetX * 0.967);
}

// Initial load of the map data and rendering
Promise.all([
  d3.json("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
]).then(([world]) => {
  // Filter out small countries from the world data
  filteredWorld = world.features.filter(d => !smallCountries.includes(d.properties.name));

  // Draw the map initially
  resizeMap();

  // Add event listener to resize the map when the window size changes
  window.addEventListener('resize', resizeMap);

  // Create the visited countries counter including small countries
  const totalVisitedCount = Object.keys(visitedCountries).length + smallCountries.length;
  const counterContainer = d3.select("#map-container")
    .append("div")
    .attr("id", "visited-counter")
    .style("position", "absolute")
    .style("bottom", "10px")
    .style("left", "10px")
    .style("background-color", "rgba(255, 255, 255, 0.8)")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("cursor", "pointer")
    .html(`Countries and Territories Visited: ${totalVisitedCount}`);

    // Create the list of visited countries and territories
  const listContainer = counterContainer
    .append("div")
    .attr("id", "visited-list")
    .style("display", "none")
    .style("margin-top", "10px");

  const normalList = listContainer.append("div")
    .attr("id", "normal-list")
    .style("display", "flex")
    .style("flex-wrap", "wrap");

  const smallList = listContainer.append("div")
    .attr("id", "small-list")
    .style("margin-top", "10px");

  // Add the list of visited countries to the counter
  normalList.selectAll("div")
    .data(Object.keys(visitedCountries).filter(d => !smallCountries.includes(d)))
    .enter()
    .append("div")
    .style("display", "flex")
    .style("align-items", "center")
    .style("margin-bottom", "5px")
    .style("width", "50%")
    .html(d => `<div style="width: 20px; height: 20px; background-color: ${visitedCountries[d]}; margin-right: 5px;"></div>${d}`)
    .on("mouseover", function (event, d) {
      d3.selectAll("path.country").filter(country => country.properties.name === d).style("fill", "gold");
    })
    .on("mouseout", function (event, d) {
      d3.selectAll("path.country").filter(country => country.properties.name === d).style("fill", visitedCountries[d]);
    });

  // Add the list of small countries to the counter
  smallList.append("div")
    .style("margin-bottom", "5px")
    .html(`<a href="#" id="small-country-toggle" style="text-decoration: underline; cursor: pointer;"><strong>Not shown on map due to size:</strong></a>`);

  const smallCountryItems = smallList.selectAll("div.small-country")
    .data(smallCountries)
    .enter()
    .append("div")
    .attr("class", "small-country")
    .style("margin-bottom", "5px")
    .html(d => `${d}`)
    .style("display", "none"); // Initially hidden

  // Toggle visibility of small countries when the link is clicked
  d3.select("#small-country-toggle").on("click", function (event) {
    event.preventDefault();
    const isVisible = d3.selectAll("div.small-country").style("display") === "block";
    d3.selectAll("div.small-country").style("display", isVisible ? "none" : "block");
  });

  // Toggle the display of the visited list on click
  counterContainer.on("click", function (event) {
    event.stopPropagation();
    const list = d3.select("#visited-list");
    const isVisible = list.style("display") === "block";
    list.style("display", isVisible ? "none" : "block");
  });

  // Hide the visited list when clicking elsewhere on the page
  d3.select("body").on("click", function () {
    d3.select("#visited-list").style("display", "none");
  });

  d3.select("#map-container").on("click", function (event) {
    event.stopPropagation();
    d3.select("#visited-list").style("display", "none");
  });

  d3.select("#visited-list").on("click", function (event) {
    event.stopPropagation();
  });

  // Hide tooltip when moving over the map with no country hover
  svgContainer.on("mousemove", function (event) {
    const isHoveringCountry = d3.selectAll("path.country:hover").size() > 0;
    if (!isHoveringCountry) {
      d3.select("#tooltip").style("display", "none");
    }
  });

  // Hide the visited list on map click
  svgContainer.on("click", function () {
    d3.select("#visited-list").style("display", "none");
  });

}).catch(error => {
  console.error("Error loading or processing data:", error);
});

// Set up zoom behavior with a scale extent of 1 to 8
const zoom = d3.zoom()
  .scaleExtent([1, 8])
  .on("zoom", zoomed);

svgContainer.call(zoom);

// Function to handle zooming
function zoomed(event) {
    const { x, y, k } = event.transform;
    svg.attr("transform", event.transform);

    if (x > containerWidth) {
        event.transform.x = x - containerWidth;
        svg.attr("transform", event.transform);
    } else if (x < -containerWidth) {
        event.transform.x = x + containerWidth;
        svg.attr("transform", event.transform);
    }
}

// Zoom-in button functionality
d3.select("#zoom-in").on("click", function () {
    svgContainer.transition().call(zoom.scaleBy, 1.2);
});

// Zoom-out button functionality
d3.select("#zoom-out").on("click", function () {
    svgContainer.transition().call(zoom.scaleBy, 0.8);
});
