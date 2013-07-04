var msgBox = document.getElementById('msg'),
  geneInfoLink = 'http://www.ncbi.nlm.nih.gov/gene/';

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
    nodes: [
      { data: { id: 'a1bg', name: 'Jerry'  } },
      { data: { id: 'a1cf', name: 'Elaine' } },
      { data: { id: 'a2m', name: 'Kramer' } },
      { data: { id: 'a3galt2', name: 'George' } },
      { data: { id: 'a4galt', name: 'Hamzah' } }
    ],
    edges: [
      { data: { source: 'a1bg', target: 'a1cf' } },
      { data: { source: 'a1bg', target: 'a2m' } },
      { data: { source: 'a1bg', target: 'a3galt2' } },
      { data: { source: 'a1cf', target: 'a1bg' } },
      { data: { source: 'a1cf', target: 'a2m' } },
      { data: { source: 'a2m', target: 'a1bg' } },
      { data: { source: 'a2m', target: 'a1cf' } },
      { data: { source: 'a2m', target: 'a3galt2' } },
      { data: { source: 'a3galt2', target: 'a1bg' } },
      { data: { source: 'a3galt2', target: 'a4galt' } },
      { data: { source: 'a4galt', target: 'a1cf' } }
    ]
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
