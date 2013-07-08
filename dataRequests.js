var rgdMap = {},
  URL = 'http://cs.catlin.edu/~khanh/cytoscape/',
  cytoInfo = {},
  nodeNum = 0,
  nodesObj = {};



var dataURL = URL + 'RGD_ORTHOLOGS.txt',
  lineSplit = /\n/,
  _Split = '_';

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

/*
$.ajax({
  url: dataURL,
  type: 'GET',
  cache: true
}).success(function() {
  
);*/
