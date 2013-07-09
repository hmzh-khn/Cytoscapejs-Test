var rgdMap = {},
  URL = 'http://cs.catlin.edu/~khanh/cytoscape/',
  cytoInfo = {},
  dataURL = URL + 'RGD_ORTHOLOGS.txt',
  lineSplit = /\n/,
  carriageLineSplit = /\r\n/, //<--- windows has this as a new line carraigereturn then newline (\r\n)
  _Split = '_';;

var generateCytoInfo = function() {
  var networkURL = URL + 'demo_network.sif',
  cytoNodes = [],
  cytoLinks = [],
  nodesObj = {};

  $.get(networkURL, {}, function(responseText) {
    var lines = responseText.split(carriageLineSplit);

    _.each(lines, function(line) {
      var data = line.split(_Split);

      //potenially combine lowercasing and empty string?
      data = lowerCase(data);

      //gets rid of the problem with empty strings
      //_.each(data, function(el) {
      //  el = el.split(/\r/).shift();
      //  console.log(el + " : " + el.length);
      //});

      var startNodeId = data[0],
        endNodeId = data[2],
        startNodeInfo = rgdMap[startNodeId],
        endNodeInfo = rgdMap[endNodeId],
        startNode = new CytoNode(startNodeId, startNodeInfo, 'Gene'),
        endNode = new CytoNode(endNodeId, endNodeInfo, 'Gene');

      nodesObj[startNodeId] = startNode;
      nodesObj[endNodeId] = endNode;

      cytoLinks.push(new CytoLink(startNodeId, endNodeId, data[1]));
    });

  },'text').done(function() {
      console.log('created cytoLinks');
      _.each(nodesObj, function(cytoNode) {
        cytoNodes.push(cytoNode);
      });
    }).done(console.log('registered ' +cytoNodes.length+ ' cytoNodes'));

/*  for(var i = 0; i < cytoLinks.length; i++) {
    marker = cytoLinks[i].data;
    if(!nodesObj[marker.startNodeId]) {
      nodesObj[marker.startNodeId] = new CytoNode(marker.startNodeId,rgdMap[marker.startNodeId], 'Gene');
      nodeNum++;
    }
  }*/

  return {
    nodes : cytoNodes,
    links : cytoLinks
  };
};

$.get(dataURL, {}, function(responseText){ 
  var data = responseText.split(lineSplit);    //split by new line
  var lineNum = 1;

  for(var lineNum = 1; lineNum < data.length - 1; lineNum++) {
    var dataArr = data[lineNum-1].split(_Split);  //split by tabs
    if(dataArr.length !== 13) {
      throw new Error('Error w/ data on line ' + lineNum + ' Is really ' +dataArr.length+'.\n');
    }

    dataArr = lowerCase(dataArr)

    rgdMap[dataArr[0]] = new RGD(dataArr, lineNum);  //new rgd's with rat as key
  }; 
},'text').done(function() {
  console.log('rgdMap ready');
  cytoInfo = generateCytoInfo();
});  
