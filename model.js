//lower cases everything
var lowerCase = function toLower(arr) {
  var newArr = _.map(arr, function(str) {
    return (str)? str.toLowerCase() : str;
  });
  return newArr;
};

//converts RGB to hexadecimal
var rgbToHex = function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

var RGD = function RGD(dataArr) {
  this.symbol = dataArr[0] || dataArr[3] || dataArr[7]; //defaults to human or mouse if rat does not exist
  //should be the same for all species, could be missing from rat or human

  var ratArr = dataArr.splice(0,3); //splice 3 elements starting at 0
  var mouseArr = dataArr.splice(4,5); //splice 5 elements starting with 4
  var humanArr = dataArr;

  this.rat = new Rat(ratArr);
  this.mouse = new Mouse(mouseArr);
  this.human = new Human(humanArr);
};

var Rat = function Rat(ratArr) {
  this.rgdId = ratArr[1];
  this.entrezGeneId = ratArr[2];
};

var Mouse = function Mouse(mouseArr) {
  if(mouseArr[0] === "") {  //I could use falsy value, but this is more readable
    return undefined;
  }

  this.rgdId = mouseArr[1];
  this.entrezGeneId = mouseArr[2];
  this.mgiId = mouseArr[3];
  this.source = mouseArr[4];
};

var Human = function Human(humanArr) {
  if(humanArr[0] === "") {  //I could use falsy value, but this is more readable
    return undefined;
  }

  this.rgdId = humanArr[1];
  this.entrezGeneId = humanArr[2];
  this.source = humanArr[3];
  this.hgncId = humanArr[4];
};

var CytoNode = function CytoNode(id, nodeInfo, gradient, type) {
  this.data = {
    id : id,
    name : id,
    nodeInfo : nodeInfo,
    type : type,
    color: gradient
  };
};

var CytoLink = function CytoLink(startNodeId, endNodeId, linkType) {
  this.data = {
    source : startNodeId,
    type : linkType,
    target : endNodeId
  };
};
