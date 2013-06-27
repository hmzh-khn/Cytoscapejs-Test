$('#cy').cytoscape({
  layout: {
    name: 'circle'
  },
  
  style: cytoscape.stylesheet()
    .selector('node')
    .css({
      'shape': 'data(faveShape)',
      'width': 'mapData(weight, 40, 80, 20, 60)',
      'content': 'data(name)',
      'text-valign': 'center',
      'text-outline-width': 2,
      'text-outline-color': 'data(faveColor)',
      'background-color': 'data(faveColor)',
      'color': '#fff'
    })
  .selector(':selected')
    .css({
      'border-width': 3,
      'border-color': '#333'
    })
  .selector('edge')
    .css({
      'width': 'mapData(strength, 70, 100, 2, 6)',
      'target-arrow-shape': 'triangle',
      'source-arrow-shape': 'circle',
      'line-color': 'data(faveColor)',
      'source-arrow-color': 'data(faveColor)',
      'target-arrow-color': 'data(faveColor)'
    })
  });