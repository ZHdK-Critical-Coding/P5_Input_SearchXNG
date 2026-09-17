// ===============================
// SearXNG Search in p5.js
// ===============================

// -------------------------------
// Search endpoint (query is appended)
// -------------------------------
const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";

let input;        // text input field
let button;       // search button
let results = []; // search results (engine + url)
let status = "";  // info text (loading, errors)

// -------------------------------
// p5.js setup function
// -------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);

  input = createInput("");
  input.position(20, 20);
  input.size(300);

  button = createButton("Search");
  button.position(340, 20);
  button.mousePressed(search);
}

// -------------------------------
// p5.js draw function
// -------------------------------
function draw() {
  background(255);
  noStroke();
  fill(0);
  textSize(14);

  let y = 80;
  text(status, 20, y);

  // Display each result: source tags + url
  results.forEach(result => {
    y += 24;

    let x = 20;

    // One tag per source (smaller font, black border)
    textSize(10);
    result.engines.forEach(engine => {
      const tagWidth = textWidth(engine) + 8;
      noFill();
      stroke(0);
      rect(x, y - 12, tagWidth, 16);
      noStroke();
      fill(0);
      text(engine, x + 4, y);
      x += tagWidth + 4;
    });

    // Url after the tags
    textSize(14);
    text(result.url, x + 4, y);
  });
}

// -------------------------------
// Enter key also starts the search
// -------------------------------
function keyPressed() {
  if (keyCode === ENTER) {
    search();
  }
}

// -------------------------------
// Fetch results from SearXNG (JSON)
// -------------------------------
async function search() {
  const query = input.value().trim();
  if (query === "") return;

  status = "Searching...";
  results = [];

  try {
    const response = await fetch(SEARCH_URL + encodeURIComponent(query) + "&format=json");
    const json = await response.json();

    console.log(json);

    // Keep only sources and url
    results = json.results.map(result => ({ engines: result.engines || [result.engine], url: result.url }));
    status = results.length + " results for \"" + query + "\"";
  } catch (error) {
    console.error(error);
    status = "Error: " + error.message;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
