var dataURL = 'http://cs.catlin.edu/~khanh/cytoscape/rgdMap.json',
  rgdMap,
  req;

req = $.getJSON(dataURL+'?callback=?', null, function(data) {
  rgdMap = data;
});
