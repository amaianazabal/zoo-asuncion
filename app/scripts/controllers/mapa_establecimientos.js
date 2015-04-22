'use strict';

/**
 * @ngdoc function
 * @name yvyUiApp.controller:MapaleafletCtrl
 * @description
 * # MapaleafletCtrl
 * Controller of the yvyUiApp
 */
angular.module('yvyUiApp')
  .controller('MapaEstablecimientosCtrl', function ($scope, mapaEstablecimientoFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var parametro = {};

    parametro = { tipo:'01' }; //Cluster por departamento

    mapaEstablecimientoFactory.getDatosCluster(parametro).then(function(data){
      var e = JSON.parse(data.data[0].e_geojson);
      localStorage['cluster_departamento'] = JSON.stringify(e);
      //console.log('departamento');
      //console.log(e);
    }); 

    parametro = { tipo:'02' }; //Cluster por distrito

    mapaEstablecimientoFactory.getDatosCluster(parametro).then(function(data){
      var e = JSON.parse(data.data[0].e_geojson);
      localStorage['cluster_distrito'] = JSON.stringify(e);
      //console.log('distrito');
      //console.log(e);
    }); 

    parametro = { tipo:'03' }; //Cluster por barrio/localidad

    mapaEstablecimientoFactory.getDatosCluster(parametro).then(function(data){
      var e = JSON.parse(data.data[0].e_geojson);
      localStorage['cluster_barrio_localidad'] = JSON.stringify(e);
      //console.log('barrio_localidad');
      //console.log(e);
    });

    parametro = { tipo:'11' }; //Todos los establecimentos con periodo 2014

    mapaEstablecimientoFactory.getDatosEstablecimientos(parametro).then(function(data){
      var e = JSON.parse(data.data[0].e_geojson);
      $scope.data = e;
    }); 

    $scope.getInstituciones = function(establecimientos){
      if( typeof establecimientos !== "undefined" || establecimientos=='' ) {

        parametro = { tipo:'12', establecimientos:JSON.stringify(establecimientos) }; //Todos los instituciones en base a los establecimientos filtrados
        mapaEstablecimientoFactory.getDatosEstablecimientos(parametro).then(function(data){
          //var e = JSON.parse(data.data[0].e_geojson);
          console.log(data);
        });

      }else{
        console.log('No existen establecimientos');
      }
    };
    
  });
