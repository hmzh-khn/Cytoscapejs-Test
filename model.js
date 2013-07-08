//lower cases everything
var lowerCase = function toLower(arr) {
  var newArr = arr.map(function(str) {
    return (str)? str.toLowerCase() : str;
  });
  return newArr;
};

var RGD = function RGD(dataArr, lineNum) {
  this.symbol = dataArr[0];
  this.line = lineNum;
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

var CytoNode = function CytoNode(id, nodeInfo, type) {
  this.data = {
    id : id,
    name : id,
    nodeInfo : nodeInfo,
    type : type
  };
};

var CytoLink = function CytoLink(startNode, endNode, linkType) {
  this.data = {
    source : startNode.data.id,
    type : linkType,
    target : endNode.data.id
  };
};
