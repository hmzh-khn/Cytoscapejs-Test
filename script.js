var dataXHR = new XMLHttpRequest(),
  dataURL = 'http://cs.catlin.edu/~khanh/cytoscape/rgdMap.json',
  rgdMap;

//data parsing
dataXHR.onload = function() {
  rgdMap = dataXHR.responseText; //should be a js object
};

dataXHR.open('GET', dataURL, true);     //automatically asynchronous
dataXHR.send();
