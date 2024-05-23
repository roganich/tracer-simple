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

// FUNCTION B: Update node size based on the current size attribute
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

// FUNCTION A: Update the node size based on the selected attribute
function setSizeby(attribute) {
  // Update current color attribute
  currentSizeAttribute = attribute;

  // Update node colors based on the selected attribute
  updateNodeSize();
}

// FUNCTION A: Load the data from a JSON file






Promise.all([
  loadDataFromFile('cy-style.json'),
  loadDataFromFile('./organization.json')
])
  .then(function(dataArray) {
    var h = function(tag, attrs, children){
      var el = document.createElement(tag);

      Object.keys(attrs).forEach(function(key){
        var val = attrs[key];

        el.setAttribute(key, val);
      });

      children.forEach(function(child){
        el.appendChild(child);
      });

      return el;
    };

    var t = function(text){
      var el = document.createTextNode(text);

      return el;
    };

    var $ = document.querySelector.bind(document);

    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      style: dataArray[0],
      elements: dataArray,
      layout: { name: 'random' }
    });

    var params = {
      name: 'cola',
      nodeSpacing: 5,
      edgeLengthVal: 45,
      animate: true,
      randomize: false,
      maxSimulationTime: 1500
    };
    var layout = makeLayout();

    layout.run();

    var $btnParam = h('div', {
      'class': 'param'
    }, []);

    var $config = $('#config');

    $config.appendChild( $btnParam );

    var sliders = [
      {
        label: 'Edge length',
        param: 'edgeLengthVal',
        min: 1,
        max: 200
      },

      {
        label: 'Node spacing',
        param: 'nodeSpacing',
        min: 1,
        max: 50
      }
    ];

    var buttons = [
      {
        label: h('span', { 'class': 'fa fa-random' }, []),
        layoutOpts: {
          randomize: true,
          flow: null
        }
      },

      {
        label: h('span', { 'class': 'fa fa-long-arrow-down' }, []),
        layoutOpts: {
          flow: { axis: 'y', minSeparation: 30 }
        }
      }
    ];

    sliders.forEach( makeSlider );

    buttons.forEach( makeButton );

    function makeLayout( opts ){
      params.randomize = false;
      params.edgeLength = function(e){ return params.edgeLengthVal / e.data('weight'); };

      for( var i in opts ){
        params[i] = opts[i];
      }

      return cy.layout( params );
    }

    function makeSlider( opts ){
      var $input = h('input', {
        id: 'slider-'+opts.param,
        type: 'range',
        min: opts.min,
        max: opts.max,
        step: 1,
        value: params[ opts.param ],
        'class': 'slider'
      }, []);

      var $param = h('div', { 'class': 'param' }, []);

      var $label = h('label', { 'class': 'label label-default', for: 'slider-'+opts.param }, [ t(opts.label) ]);

      $param.appendChild( $label );
      $param.appendChild( $input );

      $config.appendChild( $param );

      var update = _.throttle(function(){
        params[ opts.param ] = $input.value;

        layout.stop();
        layout = makeLayout();
        layout.run();
      }, 1000/30);

      $input.addEventListener('input', update);
      $input.addEventListener('change', update);
    }

    function makeButton( opts ){
      var $button = h('button', { 'class': 'btn btn-default' }, [ opts.label ]);

      $btnParam.appendChild( $button );

      $button.addEventListener('click', function(){
        layout.stop();

        if( opts.fn ){ opts.fn(); }

        layout = makeLayout( opts.layoutOpts );
        layout.run();
      });
    }

    var makeTippy = function(node, html){
      return tippy( node.popperRef(), {
        html: html,
        trigger: 'manual',
        arrow: true,
        placement: 'bottom',
        hideOnClick: false,
        interactive: true
      } ).tooltips[0];
    };

    var hideTippy = function(node){
      var tippy = node.data('tippy');

      if(tippy != null){
        tippy.hide();
      }
    };

    var hideAllTippies = function(){
      cy.nodes().forEach(hideTippy);
    };

    cy.on('tap', function(e){
      if(e.target === cy){
        hideAllTippies();
      }
    });

    cy.on('tap', 'edge', function(e){
      hideAllTippies();
    });

    cy.on('zoom pan', function(e){
      hideAllTippies();
    });

    cy.nodes().forEach(function(n){
      
      n.on('click', function(e){
        tippy.show();
        descriptionContent = n.data('description');
        cy.nodes().not(n).forEach(hideTippy);
      });
    });

    $('#config-toggle').addEventListener('click', function(){
      $('body').classList.toggle('config-closed');

      cy.resize();
    });

  });


