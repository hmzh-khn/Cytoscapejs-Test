var rgdMap = {},
  URL = 'http://cs.catlin.edu/~khanh/cytoscape/',
  cytoInfo = {},
  dataURL = URL + 'RGD_ORTHOLOGS.txt',
  lineSplit = /\n/,
  _Split = '_';

/****** RGDMap data retrieval and parsing ******/
var xhr = $.get(dataURL, {}, function(responseText) { 
  var data = responseText.split(lineSplit);    //split by new line
  data.pop();           //remove empty string from end ""

  _.each(data, function(line) {
    //lowercases array data from splitting
    var dataArr = line.split(_Split);
    if(dataArr.length !== 13) {
      throw new Error('Error w/ data length. Is really ' + dataArr.length + ".");
    }
    dataArr = lowerCase(dataArr);

    var key = dataArr[0] || dataArr[3] || dataArr[7]; //defaults to human or mouse if rat does not exist

    rgdMap[dataArr[0]] = new RGD(dataArr);  //new rgd's with rat as key
  });
},'text')

.done(function() {
  console.log('rgdMap ready');
})

.done( function() {
  var networkURL = URL + 'basakData.sif',
    cytoNodes = [],
    cytoLinks = [],
    nodesObj = {};

  /****** Network data retrieval and creation ******/
  $.get(networkURL, {}, function(responseText) {
    var lines = responseText.replace(/\r/g,"") //removes carriage returns
      .split(lineSplit);

    _.each(lines, function(line) {
      //lowercases array data from splitting
      var data = lowerCase(line.split(_Split));

      var startNodeId = data[0],
        endNodeId = data[2],
        startNodeInfo = rgdMap[startNodeId],
        endNodeInfo = rgdMap[endNodeId],
        startNode = new CytoNode(startNodeId, startNodeInfo, randColor() , 'gene'),
        endNode = new CytoNode(endNodeId, endNodeInfo, randColor(), 'gene');

      nodesObj[startNodeId] = startNode;
      nodesObj[endNodeId] = endNode;

      console.log(data[1]);
      cytoLinks.push(new CytoLink(startNodeId, endNodeId, data[1].toLowerCase()));
    });

  },'text')

  .done(function() {
      console.log('created cytoLinks');
      _.each(nodesObj, function(cytoNode) {
        cytoNodes.push(cytoNode);
      });
      cytoInfo = {
        nodes : cytoNodes,
        links : cytoLinks
      };;
    console.log('earlier')
  }, 

  function() {
    console.log('registered ' +cytoNodes.length+ ' cytoNodes');
  }, 

  //render the cytoscape network when finished with reqs
  function() {
    console.log('later');
    renderCyto(cytoInfo);
  });

});

var randColor = function randColor(decimal) {
  decimal = decimal || Math.random();

  var red = Math.random() * 255,
    green = Math.random() * 255;

    var buffer = Math.round(green - red);

    green = (buffer >= 0)? Math.abs(buffer) : 0;
    red = (buffer >= 0)? 0 : Math.abs(buffer);

    return rgbToHex(red,green,0); //returns something between red and green
};
