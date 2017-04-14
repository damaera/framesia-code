var sharedb = require('sharedb/lib/client');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);

// Create local Doc instance mapped to 'examples' collection document with id 'counter'
var doc = connection.get('examples', 'counter');

window.doc = doc

// Get initial value of document and subscribe to changes
doc.subscribe(showJson);
// When document changes (by this client or any other, or the server),
// update the number on the page
doc.on('op', showJson);

function showJson() {
  console.log(doc)
  document.querySelector('#data').innerHTML = JSON.stringify(doc.data, 2);
};

// When clicking on the '+1' button, change the number in the local
// document and sync the change to the server and other connected
// clients
function increment() {
  // Increment `doc.data.numClicks`. See
  // https://github.com/ottypes/json0 for list of valid operations.
  doc.submitOp([{p: ['data.test'], oi: {test: 1}}]);
}

// Expose to index.html
global.increment = increment;
