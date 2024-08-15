// DESCRIPTION: This file contains the code to load the graph and the configuration of the graph.

const list_entity_type = ["Entidad gubernamental", "Entidad gubernamental de salud", "Entidad internacional que lidera agendas en el sector", "Entidad no gubernamental", "Entidad no gubernamental de salud"];
const colors_entity_type = ["red", "blue", "green", "magenta", "orange"];

const list_sector_type = ["Pública", "Privada"];
const colors_sector_type = ["yellow", "brown"];

const list_org_type = ["Presidencia", "Ministerio", "Comisión/Comité/Instancia", "Sistema de vigilancia o monitoreo/Sistema de información", "Instituto/Centro de investigación", "Grupo de investigación", "Red", "Observatorio", "Gobernación", "Secretaría", "Laboratorio", "Alcaldía", "Entidad de control", "Departamento Administrativo", "Asociación científica/gremial/sindical", "Academia", "Empresas e Instituciones Prestadoras de Servicios de Salud", "Fundación/ONG", "Empresa/Sector productivo", "Organismo internacional", "Institución castrense"];
const colors_org_type = ["#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000", "#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#800080", "#FFA500", "#A52A2A", "#808080", "#000000", "#ADD8E6", "#90EE90", "#FFB6C1", "#FFD700", "#D3D3D3"];

const list_scale = ["Nacional", "Departamental", "Municipal", "Regional", "Internacional con incidencia local", "Internacional con impacto nacional"];
const colors_scale = ["#00FFFF", "#008080", "#0000FF", "#000080", "#FF00FF", "#FFA500"];

const list_rel_health_sys = ["Nivel 1", "Nivel 2", "Nivel 3"];
const colors_rel_health_sys = ["green", "magenta", "orange"];

const list_gen_user_type = ["Potencial usuario de la información", "Potencial interesado en el diseño y promoción de las herramientas", "Potencial usuario de las herramientas", "Sin determinar"];
const colors_gen_user_type = ["#FF0000", "#800000", "#FFFF00", "#808000"];

const list_act_user_type = ["Usuario consumidor", "No usuario", "Usuario legitimador"];
const colors_act_user_type = ["green", "magenta", "orange"];

const list_rel_sivigila = ["NACIÓN", "NACIONAL", "UND", "UNM", "UPGD-UI", "INTERNACIONAL"];
const colors_rel_sivigila = ["#FF0000", "#800000", "#FFFF00", "#808000", "#00FF00", "#008000"];

const list_rel_etvs = ["ETVs", "Dengue", "Zika", "Zika| Chikungunya"];
const colors_rel_etvs = ["#FF0000", "#800000", "#FFFF00", "#808000"];

// FUNCTION A: Manage the tabs that are open
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// FUNCTION A: Display the list information of the databases for each country
function displayListInfo() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      /* Toggle between adding and removing the "active" class,
      to highlight the button that controls the panel */
      this.classList.toggle("active");

      /* Toggle between hiding and showing the active panel */
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}

// FUNCTION B: Update node colors based on the current color attribute
function updateNodeColors() {
    // Reset node colors to gray
    cy.nodes().style('background-color', 'gray');

    // Set node colors based on the current color attribute
    if (currentColorAttribute === 'entity_type') {
        for (var i = 0; i < list_entity_type.length; i++) {
            cy.nodes('[entity_type="' + list_entity_type[i] + '"]').style('background-color', colors_entity_type[i]);
        }
    } else if (currentColorAttribute === 'sector_type') {
        for (var i = 0; i < list_sector_type.length; i++) {
            cy.nodes('[sector_type="' + list_sector_type[i] + '"]').style('background-color', colors_sector_type[i]);
        }
    } else if (currentColorAttribute === 'org_type') {
        for (var i = 0; i < list_org_type.length; i++) {
            cy.nodes('[org_type="' + list_org_type[i] + '"]').style('background-color', colors_org_type[i]);
        }
    } else if (currentColorAttribute === 'scale') {
        for (var i = 0; i < list_scale.length; i++) {
            cy.nodes('[scale="' + list_scale[i] + '"]').style('background-color', colors_scale[i]);
        }
    } else if (currentColorAttribute === 'rel_health_sys') {
        for (var i = 0; i < list_rel_health_sys.length; i++) {
            cy.nodes('[rel_health_sys="' + list_rel_health_sys[i] + '"]').style('background-color', colors_rel_health_sys[i]);
        }
    } else if (currentColorAttribute === 'gen_user_type') {
        for (var i = 0; i < list_gen_user_type.length; i++) {
            cy.nodes('[gen_user_type="' + list_gen_user_type[i] + '"]').style('background-color', colors_gen_user_type[i]);
        }
    } else if (currentColorAttribute === 'act_user_type') {
        for (var i = 0; i < list_act_user_type.length; i++) {
            cy.nodes('[act_user_type="' + list_act_user_type[i] + '"]').style('background-color', colors_act_user_type[i]);
        }
    } else if (currentColorAttribute === 'rel_sivigila') {
        for (var i = 0; i < list_rel_sivigila.length; i++) {
            cy.nodes('[rel_sivigila="' + list_rel_sivigila[i] + '"]').style('background-color', colors_rel_sivigila[i]);
        }
    } else if (currentColorAttribute === 'rel_etvs') {
        for (var i = 0; i < list_rel_etvs.length; i++) {
            cy.nodes('[rel_etvs="' + list_rel_etvs[i] + '"]').style('background-color', colors_rel_etvs[i]);
        }
    }
}

// FUNCTION B: Update legend content based on the current color attribute
function updateLegend() {
  var legendContent = ''; // Initialize legend content

  // Update legend based on the current color attribute
  if (currentColorAttribute === 'entity_type') {
      legendContent += '<h4>Entity Type Legend</h4>';
      for (var i = 0; i < list_entity_type.length; i++) {
          legendContent += '<div style="color: ' + colors_entity_type[i] + ';">' + list_entity_type[i] + '</div>';
      }
  } else if (currentColorAttribute === 'sector_type') {
      legendContent += '<h4>Sector Type Legend</h4>';
      for (var i = 0; i < list_sector_type.length; i++) {
          legendContent += '<div style="color: ' + colors_sector_type[i] + ';">' + list_sector_type[i] + '</div>';
      }
  } else if (currentColorAttribute == 'org_type') {
      legendContent += '<h4>Organization Type Legend</h4>';
      for (var i = 0; i < list_org_type.length; i++) {
          legendContent += '<div style="color: ' + colors_org_type[i] + ';">' + list_org_type[i] + '</div>';
      }
  } else if (currentColorAttribute == 'scale') {
      legendContent += '<h4>Scale Legend</h4>';
      for (var i = 0; i < list_scale.length; i++) {
          legendContent += '<div style="color: ' + colors_scale[i] + ';">' + list_scale[i] + '</div>';
      }
  } else if (currentColorAttribute == 'rel_health_sys') {
      legendContent += '<h4>Health System Relationship Legend</h4>';
      for (var i = 0; i < list_rel_health_sys.length; i++) {
          legendContent += '<div style="color: ' + colors_rel_health_sys[i] + ';">' + list_rel_health_sys[i] + '</div>';
      }
  } else if (currentColorAttribute == 'gen_user_type') {
      legendContent += '<h4>User Type (General) Legend</h4>';
      for (var i = 0; i < list_gen_user_type.length; i++) {
          legendContent += '<div style="color: ' + colors_gen_user_type[i] + ';">' + list_gen_user_type[i] + '</div>';
      }
  } else if (currentColorAttribute == 'act_user_type'){
      legendContent += '<h4>User Type (Active) Legend</h4>'
      for (var i = 0; i < list_act_user_type.length; i++) {
          legendContent += '<div style="color: ' + colors_act_user_type[i] + ';">' + list_act_user_type[i] + '</div>';
      }
  } else if (currentColorAttribute == 'rel_sivigila') {
      legendContent += '<h4>Relationaship with SIVIGILA Legend</h4>';
      for (var i = 0; i < list_rel_sivigila.length; i++) {
          legendContent += '<div style="color: ' + colors_rel_sivigila[i] + ';">' + list_rel_sivigila[i] + '</div>';
      }
  } else if (currentColorAttribute == 'rel_etvs') {
      legendContent += '<h4>Relationaship with ETVs Legend</h4>';
      for (var i = 0; i < list_rel_etvs.length; i++) {
          legendContent += '<div style="color: ' + colors_rel_etvs[i] + ';">' + list_rel_etvs[i] + '</div>';
      }
  }
  // Update legend content
  document.getElementById('legend').innerHTML = legendContent;
}

// TODO FUNCTION B: Update node size based on the current size attribute
function updateNodeSize() {
  // Reset node colors to gray
  cy.nodes().style('width', '20px');

  // Set node colors based on the current color attribute
  if (currentSizeAttribute === 'edges') {
      cy.nodes().style('width', '20px');
  } else if (currentSizeAttribute === 'followers') {
      cy.nodes().style('width', '30px');
  }
}

// FUNCTION B: Update the layout of the graph based on the current layout attribute
function setLayoutBy(attribute) {
    currentLayoutAttribute = attribute;

    if (currentLayoutAttribute === 'random') {
      cy.layout({ name: 'random' }).run();
    } else if (currentLayoutAttribute === 'grid') {
      cy.layout({ name: 'grid' }).run();
    } else if (currentLayoutAttribute === 'circle') {
      cy.layout({ name: 'circle' }).run();
    } else if (currentLayoutAttribute === 'concentric') {
      cy.layout({ name: 'concentric' }).run();
    } else if (currentLayoutAttribute === 'breadthfirst') {
      cy.layout({ name: 'breadthfirst' }).run();
    } else if (currentLayoutAttribute === 'cose') {
      cy.layout({ name: 'cose' }).run();
    }
    loadNodes();
}

// FUNCTION A: Update the node colors and legend based on the selected attribute
function setColorBy(attribute) {
  // Update current color attribute
  currentColorAttribute = attribute;

  // Update node colors based on the selected attribute
  updateNodeColors();
  updateLegend();
}

// TODO FUNCTION A: Update the node size based on the selected attribute
function setSizeby(attribute) {
  // Update current color attribute
  currentSizeAttribute = attribute;

  // Update node colors based on the selected attribute
  updateNodeSize();
}

// FUNCTION A: Load the data from a JSON file

// FUNCTION C: Count the number of nodes
function countNodes(cy) {
  var nodes = cy.nodes();
  return nodes.length;
}

// FUNCTION C: Count the number of edges
function countIsolatedNodes(cy) {
  var isolatedNodes = cy.nodes().filter(function(ele) {
    return ele.connectedEdges().length === 0;
  });
  return isolatedNodes.length;
}

// FUNCTION C: Calculate the network density
function calculateNetworkDensity(cy) {
  var nodes = cy.nodes().length;  
  var edges = cy.edges().length;
  return (2 * edges) / (nodes * (nodes - 1));
}

// FUNCTION C: Calculate the average degree of the network
function calculateAverageDegree(cy) {
  var nodes = cy.nodes();
  var connectedNodes = nodes.filter(function(node) {
    return node.connectedEdges().length > 0;
  });
  var totalDegree = 0;
  for (var i = 0; i < connectedNodes.length; i++) {
    totalDegree += connectedNodes[i].connectedEdges().length;
  }
  return totalDegree / connectedNodes.length;
}

// FUNCTION C: Find connected components
function findConnectedComponents() {
  

}

// FUNCTION C: Calculate the Estrada Normalized Index
function calculateEstradaNormIndex(cy) {
  var estradaIndex = 0;
  var nodes = cy.nodes();
  var connectedNodes = nodes.filter(function(node) {
    return node.connectedEdges().length > 0;
  });
  for (var i = 0; i < connectedNodes.length; i++) {
    var temp_connectedEdges = connectedNodes[i].connectedEdges();
    var temp_neighbors = temp_connectedEdges.connectedNodes();
    for (let j of temp_neighbors) {
      if (i !== j) {
        estradaIndex += Math.pow((1/Math.sqrt(connectedNodes[i].connectedEdges().length) - 1/Math.sqrt(j.connectedEdges().length)), 2);
      }
    }
  }
  var N = nodes.length;
  var estradaNormIndex = estradaIndex/(N - 2*Math.pow((N-1), 1/2));
  return estradaNormIndex;
}

// FUNCTION C: Calculate the clustering coefficient
function calculateClusteringCoefficient(cy) {


}

// FUNCTION C: Calculate the Tendency to Make Hub
function calculateTMH(cy) {
  var nodes = cy.nodes();
  var squared_sum = 0;
  var sum = 0;
  for (var i = 0; i < nodes.length; i++) {
    squared_sum += Math.pow(nodes[i].connectedEdges().length, 2);
    sum += nodes[i].connectedEdges().length;
  }
  var TMH = squared_sum/sum;
  return TMH;
}

// FUNCTION C: Plot centrality measures
function plotCentralityMeasures(cy) {
  var nodes = cy.nodes();
  var connectedNodes = nodes.filter(function(node) {
    return node.connectedEdges().length > 0;
  });
  var degreeCentrality = [];
  var closenessCentrality = [];
  var betweennessCentrality = [];
  var bc = cy.elements().betweennessCentrality();

  for (var i = 0; i < connectedNodes.length; i++) {
    degreeCentrality.push(connectedNodes[i].connectedEdges().length);
    closenessCentrality.push(cy.$().closenessCentrality({ root: connectedNodes[i] }));
    betweennessCentrality.push(bc.betweennessNormalized(connectedNodes[i]));
  }

  var info = {
    x: closenessCentrality,
    y: betweennessCentrality,
    mode: 'markers',
    type: 'scatter',
    color: degreeCentrality,
    size: 40,
    colorscale: 'Portland',
    width: 750,
    height: 250,
  }

  var data = [info];
  var layout = {
    xaxis: {range: [Math.min(closenessCentrality), Math.max(closenessCentrality)]},
    
  };
  Plotly.newPlot('row-centrality', data, layout);
}

function plotOrganizationalDistribution(cy, attribute) {
  var node = cy.nodes();
  var edge = cy.edges();
  current_attribute = attribute;
  console.log(current_attribute);
  var classes = [... new Set(node.map(function(d) { return d.data(attribute); }))];
  var size_classes = classes.map(function(d) { return node.filter(function(e) { return e.data(attribute) === d; }).length; });
  
  var data_donut = [{
      values: size_classes,
      labels: classes,
      type: 'pie',
      hole: 0.4,  // This value defines the size of the hole in the donut chart
      textinfo: 'label+percent',
      textposition: 'outside',
      automargin: true
  }];

  var x_names = classes;
  var y_names = classes;
  var z_vals = [];

  for (let i = 0; i < x_names.length; i++) {
    let row = [];
    for (let j = 0; j < y_names.length; j++) {
        row.push(0);
    }
    z_vals.push(row);
  }

  for (var i = 0; i < node.length; i++) {
    var connectedEdges = node[i].connectedEdges();
    var temp_class = node[i].data(attribute);
    var temp_index = classes.indexOf(temp_class);
    connectedEdges.forEach(function(edge) {
      var targetNode = edge.target();
      var targetClass = targetNode.data(attribute);
      var targetIndex = classes.indexOf(targetClass);
      var temp_value = z_vals[temp_index][targetIndex];
      z_vals[temp_index][targetIndex] = temp_value + 1;
    });
  }

  

  var data_heatmap = [{ 
      x: x_names,
      y: y_names,
      z: z_vals,
      type: 'heatmap',
      hoverongaps: false,
  }]

  console.log(z_vals);

  var data = [data_donut, data_heatmap];
  
  var layout = {
      showlegend: true,
      grid: {rows: 1, columns: 2, pattern: 'independent'},
      margin: { t: 50, l: 50, r: 50, b: 50 },
      annotations: [{
          font: {
              size: 20
          },
          showarrow: false,
          text: 'Total',
          x: 0.5,
          y: 0.5
      }]
  };
  
  Plotly.newPlot('row-organization', data, layout);
}

function plotCentralityMap(cy) {
  var node = cy.nodes();
  var edge = cy.edges();
  var closenessCentrality = node.map(function(d) { return cy.$().closenessCentrality({ root: d }); });
  var betweennessCentrality = node.map(function(d) { return cy.elements().betweennessCentrality().betweennessNormalized(d); });
  var degreeCentrality = node.map(function(d) { return d.connectedEdges().length; });
  var bc = cy.elements().betweennessCentrality();
  var info = {
    x: closenessCentrality,
    y: betweennessCentrality,
    mode: 'markers',
    type: 'scatter',
    color: degreeCentrality,
    size: 40,
    colorscale: 'Portland',
    width: 750,
    height: 250,
  }

  var data = [info];
  var layout = {
    xaxis: {range: [Math.min(closenessCentrality), Math.max(closenessCentrality)]},
    
  };
  Plotly.newPlot('row-centrality', data, layout);
}


