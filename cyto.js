var msgBox = document.getElementById('msg'),
  geneInfoLink = 'http://www.ncbi.nlm.nih.gov/gene/';

var renderCyto = function renderCyto(cytoVar) {
  var cNodes = [],
  cLinks = [];

  _.each(cytoInfo.nodes, function(node) {
      cNodes.push({data: node.data});
  });

  _.each(cytoInfo.links, function(link) {
      cLinks.push({data: link.data});
  });
  
  $('#cy').cytoscape({
    style: cytoscape.stylesheet()
      .selector('core')
        .css({
          'panning-cursor': 'crosshair' //what does this do?
        })
      .selector('node')
        .css({
          'content': 'data(name)',
          'text-valign': 'center',
          'color': 'white',
          'text-outline-width': 2,
          'text-outline-color': '#888',

        })
      .selector('edge')
        .css({
          'target-arrow-shape': 'none'
        })
      .selector(':selected')
        .css({
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black'
        })
      .selector('.faded')
        .css({
          'opacity': 0.25,
          'text-opacity': 0
        }),
    
    elements: {
      nodes: cNodes,
      edges: cLinks
    },
    
    ready: function(){
      window.cy = this;
      cy.elements().unselectify();
      
      //click and touch events
      cy.on('tap', 'node', function(e){
        var node = e.cyTarget; 
        var neighborhood = node.neighborhood().add(node);
        var nodeInfo = rgdMap[node.id()];
        
        msgBox.innerHTML = node.data('id') + ' : ' + node.data('name') + '\n';
        msgBox.innerHTML += "<a href='" + geneInfoLink + nodeInfo.human.entrezGeneId + "'>Additional Information</a>"

        cy.elements().addClass('faded');
        neighborhood.removeClass('faded');
      });
      
      cy.on('tap', function(e){
        if( e.cyTarget === cy ){
          cy.elements().removeClass('faded');
        }
      });

    }
  });
};

renderCyto(cytoInfo);

