// Get initial container dimensions based on the screen size
const containerWidth = document.getElementById('map-container').offsetWidth;
const containerHeight = containerWidth * 0.625; // Ratio for the map

// Create the SVG container for the map
const svgContainer = d3.select("#map")
  .append("svg")
  .attr("width", containerWidth)
  .attr("height", containerHeight);

// Create a group element within the SVG to hold the map paths
const svg = svgContainer.append("g");

// Store the original transform state
let originalTransform = d3.zoomIdentity;

// Define the map projection and scaling
const projection = d3.geoMercator()
  .scale(containerWidth / 5) // Adjust scale according to container width
  .translate([containerWidth / 2, containerHeight / 1.5]); // Center the map

// Define the path generator using the projection
const path = d3.geoPath().projection(projection);

// List of visited countries and their respective colors
const visitedCountries = {
  "Argentina": "#9467bd",      // Purple
  "Belize": "#1f77b4",         // Light Blue
  "Brazil": "#2ca02c",         // Green
  "Colombia": "#1f77b4",       // Light Blue
  "Costa Rica": "#c5b0d5",     // Light Purple
  "Cuba": "#e377c2",           // Pink
  "Dominican Republic": "#8c564b", // Brownish
  "El Salvador": "#ff9896",    // Light Red
  "Guatemala": "#9467bd",      // Purple
  "Haiti": "#17becf",          // Cyan
  "Honduras": "#ff7f0e",       // Bright Orange
  "Jamaica": "#17becf",        // Cyan
  "Mexico": "#2ca02c",         // Green
  "Panama": "#17becf",         // Cyan
  "Paraguay": "#c49c94",       // Tan
  "Puerto Rico": "#bcbd22",    // Olive Green
  "Spain": "#ff7f0e",          // Bright Orange
  "The Bahamas": "#d62728",    // Red
  "Turkey": "#bcbd22",         // Olive Green
  "United Republic of Tanzania": "#d62728", // Red
  "United States of America": "#d62728", // Red
  "Uruguay": "#e377c2"         // Pink
};

// List of small countries not shown on the map due to size
const smallCountries = [
  "Bermuda", "US Virgin Islands", "Turks and Caicos Islands", 
  "Saint Lucia", "Curaçao", "Cayman Islands", 
  "Barbados", "Antigua and Barbuda"
];

// Placeholder for filtered world data after removing small countries
let filteredWorld;

// Track the currently selected country
let selectedCountry = null;
let countryNameHovered = null; // Track hover state for country names

// Function to draw the map with a specified horizontal translation (for wrapping)
function drawMap(translation) {
    svg.append("g")
      .selectAll("path")
      .data(filteredWorld) // Bind filtered world data to paths
      .enter().append("path")
      .attr("d", path) // Generate the path data for each country
      .attr("transform", `translate(${translation}, 0)`) // Apply horizontal translation for wrapping
      .attr("class", "country")
      .attr("data-country", d => d.properties.name) // Add data attribute for country name
      .style("fill", d => {
          if (selectedCountry === d.properties.name) return "gold";
          return (d.properties && visitedCountries[d.properties.name]) ? visitedCountries[d.properties.name] : "lightgray";
      }) // Fill color based on visited countries and selected country
      .style("stroke", "white")
      .style("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
          if (!selectedCountry && !countryNameHovered) {
              const countryName = d.properties.name;
              const visited = visitedCountries[countryName];
              d3.selectAll(`path[data-country="${countryName}"]`)
                .style("fill", visited ? d3.rgb(visited).brighter() : "darkgray");

              // Update image container dynamically
              updateImageContainer(countryName);
          }
      })
      .on("mouseout", function (event, d) {
          if (!selectedCountry && !countryNameHovered) {
              const countryName = d.properties.name;
              d3.selectAll(`path[data-country="${countryName}"]`)
                .style("fill", d.properties && visitedCountries[d.properties.name] ? visitedCountries[d.properties.name] : "lightgray");

              // Reset the img-container to default if no country is selected
              const defaultImage = window.innerWidth < 1050 ? "images/default-up.png" : "images/default.png";
              d3.select("#country-image img").attr("src", defaultImage);
              d3.select("#country-name").text(""); // Clear the country name
              d3.select("#no_pic_message").text(""); // Clear the message
          }
      })
      .on("click", function (event, d) {
          const countryName = d.properties.name;

          // If clicking the already selected country, deselect it
          if (selectedCountry === countryName) {
              resetMap();
          } else {
              // Select the new country
              selectedCountry = countryName;

              // Update image container
              updateImageContainer(countryName);

              // Highlight the selected country
              d3.selectAll("path.country").style("fill", d => {
                  if (d.properties.name === selectedCountry) return "gold";
                  return (d.properties && visitedCountries[d.properties.name]) ? visitedCountries[d.properties.name] : "lightgray";
              });
          }
      });
}

// Function to update the image container based on country
function updateImageContainer(countryName) {
    const visited = visitedCountries[countryName];
    const imagePath = `images/${countryName}.jpg`;

    const imageElement = d3.select("#country-image img");
    const nameElement = d3.select("#country-name");
    const messageElement = d3.select("#no_pic_message");

    const imageExists = new Image();
    imageExists.onload = function () { // If the image exists
        imageElement.attr("src", imagePath);
        nameElement.text(countryName);
        messageElement.text(""); // Clear message if image exists
    };

    imageExists.onerror = function () { // If the image does not exist
        if (visited) {
            imageElement.attr("src", "images/pic_to_come.png");
            nameElement.text(countryName);
            messageElement.text("I've been here. Picture coming soon!");
        } else {
            imageElement.attr("src", "images/bucketlist.png");
            nameElement.text(countryName);
            messageElement.text("Not visited yet, but it's on my list!");
        }
    };

    imageExists.src = imagePath; // Set the image path to check existence
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
  drawMap(offsetX * 1.934);
  drawMap(-offsetX * 1.934);

  // Handle img-container position and default image based on screen size
  const imgContainer = document.getElementById('img-container');
  if (window.innerWidth < 1050) {
      imgContainer.style.width = '100%';
      imgContainer.style.paddingLeft = '0';
      if (!selectedCountry) {
          document.getElementById('country-image').querySelector('img').src = "images/default-up.png";
      }
  } else {
      imgContainer.style.width = '20%';
      imgContainer.style.paddingLeft = '10px';
      if (!selectedCountry) {
          document.getElementById('country-image').querySelector('img').src = "images/default.png";
      }
  }
}

// Listen for window resize events and call resizeMap
window.addEventListener('resize', function() {
  resizeMap();
});

// Function to handle zooming with vertical and horizontal locking
function zoomed(event) {
  const { x, y, k } = event.transform;

  // Calculate the height of the drawn map area
  const mapHeight = svg.node().getBoundingClientRect().height;
  const containerHeight = document.getElementById('map-container').offsetHeight;

  // Adjust the maxTranslateY to allow a little more scrolling up
  const maxTranslateY = (containerHeight - mapHeight) * k + containerHeight * 0.3; // Add a 30% allowance

  // Lock vertical scrolling when the map reaches the top or bottom edge
  let newY = y;
  if (mapHeight * k < containerHeight) {
      newY = 0; // Lock vertically if the map is smaller than the container
  } else {
      if (y > containerHeight * 0.3) { // Allow more vertical scrolling up
          newY = containerHeight * 0.3;
      } else if (y < maxTranslateY) {
          newY = maxTranslateY; // Prevent scrolling beyond the bottom edge
      }
  }

  // Calculate the width of the drawn map area
  const mapWidth = svg.node().getBoundingClientRect().width;
  const containerWidth = document.getElementById('map-container').offsetWidth;

  // Adjust the maxTranslateX and minTranslateX to allow scrolling up to three times the map width
  const maxTranslateX = containerWidth * 2.65; // Lock at three times the map width in the positive direction
  const minTranslateX = -containerWidth * 2.65; // Lock at three times the map width in the negative direction

  // Lock horizontal scrolling when the map reaches the left or right edge
  let newX = x;
  if (x > maxTranslateX) {
      newX = maxTranslateX;
  } else if (x < minTranslateX) {
      newX = minTranslateX;
  }

  // Apply the transform with the adjusted coordinates
  svg.attr("transform", d3.zoomIdentity.translate(newX, newY).scale(k));
  originalTransform = d3.zoomIdentity.translate(newX, newY).scale(k); // Update original transform
}

// Set up zoom behavior with a scale extent of 1 to 8
const zoom = d3.zoom()
  .scaleExtent([1, 8])
  .on("zoom", zoomed);

svgContainer.call(zoom);

// Reset map button functionality
d3.select("#reset-map").on("click", function () {
  svgContainer.transition().duration(750).call(zoom.transform, originalTransform); // Reset to the original transform
});

// Function to reset the map to its original position and remove selected country styling
function resetMap() {
  svgContainer.transition().duration(750).call(zoom.transform, d3.zoomIdentity); // Reset the transform to identity (no translation, no scale)
  originalTransform = d3.zoomIdentity; // Reset original transform to identity

  // Reset image to default
  const defaultImage = window.innerWidth < 1050 ? "images/default-up.png" : "images/default.png";
  d3.select("#country-image img").attr("src", defaultImage);
  d3.select("#country-name").text(""); // Clear the country name
  d3.select("#no_pic_message").text(""); // Clear the message

  // Deselect the currently selected country
  selectedCountry = null;
  countryNameHovered = null;

  // Reset all countries to their original colors
  d3.selectAll("path.country").style("fill", d => (d.properties && visitedCountries[d.properties.name]) ? visitedCountries[d.properties.name] : "lightgray");
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
      if (!selectedCountry) {
          const countryName = d;
          countryNameHovered = countryName;

          // Highlight the country on the map
          d3.selectAll("path.country").filter(country => country.properties.name === countryName).style("fill", "gold");

          // Update the image container dynamically
          updateImageContainer(countryName);
      }
    })
    .on("mouseout", function (event, d) {
      if (!selectedCountry) {
          const countryName = d;
          countryNameHovered = null;

          // Reset the color for the country on the map
          d3.selectAll("path.country").filter(country => country.properties.name === countryName).style("fill", visitedCountries[countryName]);

          // Reset the img-container to default if no country is selected
          const defaultImage = window.innerWidth < 1050 ? "images/default-up.png" : "images/default.png";
          d3.select("#country-image img").attr("src", defaultImage);
          d3.select("#country-name").text(""); // Clear the country name
          d3.select("#no_pic_message").text(""); // Clear the message
      }
    })
    .on("click", function (event, d) {
      const countryName = d;

      // If clicking the already selected country, deselect it
      if (selectedCountry === countryName) {
          resetMap();
      } else {
          // Select the new country
          selectedCountry = countryName;

          // Update image container
          updateImageContainer(countryName);

          // Highlight the selected country
          d3.selectAll("path.country").style("fill", d => {
              if (d.properties.name === selectedCountry) return "gold";
              return (d.properties && visitedCountries[d.properties.name]) ? visitedCountries[d.properties.name] : "lightgray";
          });
      }
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

    if (window.innerWidth < 900) {
        const mapContainer = document.getElementById('map-container');
        const mapContainerBottom = mapContainer.getBoundingClientRect().bottom;

        // Set the top of the list to be at the bottom of the map container
        list.style("top", `${mapContainerBottom}px`);
        list.style("bottom", "auto");
        list.style("width", `${mapContainer.offsetWidth}px`); // Make it as wide as the map container
        list.style("height", "auto"); // Adjust the height as necessary
    } else {
        list.style("top", "auto");
        list.style("bottom", isVisible ? "10px" : "auto");
    }

    list.style("display", isVisible ? "none" : "block");
  });

  // Hide the visited list when clicking elsewhere on the page
  d3.select("body").on("click", function () {
    d3.select("#visited-list").style("display", "none");
  });

  d3.select("#map-container").on("click", function (event) {
    if (event.target.tagName !== 'path') {
        resetMap(); // Deselect any selected country if the user clicks outside of a country
    }
  });

  d3.select("#visited-list").on("click", function (event) {
    event.stopPropagation();
  });

  // Hide the visited list on map click
  svgContainer.on("click", function () {
    d3.select("#visited-list").style("display", "none");
  });

}).catch(error => {
  console.error("Error loading or processing data:", error);
});

