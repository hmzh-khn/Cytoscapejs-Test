var rgdMap = {},
  dataURL = 'http://cs.catlin.edu/~khanh/cytoscape/RGD_ORTHOLOGS.txt',
  lineSplit = /\n/,
  spaceSplit = ' ', //could be used depending on whcih file i am using server is space
  _Split = '_';

$.get(dataURL, {}, function(responseText){ 
  console.log(responseText); 
  var data = responseText.split(lineSplit);    //split by new line
  var lineNum = 1;
  console.log(data);

  for(var lineNum = 1; lineNum < data.length - 1; lineNum++) {
    var dataArr = data[lineNum-1].split(_Split);  //split by tabs
    if(dataArr.length !== 13) {
      throw new Error('Error w/ data on line ' + lineNum + ' Is really ' +dataArr.length+'.\n');
    }

    //lower cases everything
    var dataArray = dataArr.map(function(str) {
      return (str)? str.toLowerCase() : undefined;
    });

    rgdMap[dataArray[0]] = new RGD(dataArray, lineNum);  //new rgd's with rat as key
  }; 
},'text');  

/*
$.ajax({
  url: dataURL,
  type: 'GET',
  cache: true
}).success(function() {
  
);*/
