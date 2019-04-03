define([
    'dijit/_WidgetsInTemplateMixin',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/text!./Group.html',
    'jimu/BaseWidget',
    'jimu/FilterManager',
    'jimu/LayerStructure'],
  function(
    _WidgetsInTemplateMixin,
    array,
    declare,
    lang,
    template,
    BaseWidget,
    FilterManager,
    LayerStructure) {

    return declare([_WidgetsInTemplateMixin, BaseWidget], {
      baseClass: 'jimu-widget-group',
      templateString: template,
      map: null,
      nls: null,
      parameters: null,


      postCreate: function() {
        console.log("Group: postCreate")

        this.groupName.innerHTML = this.parameters.groupName;

        // this.inherited(arguments);
        // this.layerStructure = LayerStructure.getInstance();
        // this.filterManager = FilterManager.getInstance();
        //
        // if ( this.config.groups ) {
        //   array.forEach( this.config.groups, lang.hitch( this, function ( group ) {
        //     this._initFilters( group );
        //   }));
        // }

        // this.layerStructure.traversal( function( layerNode ) {
        //   for( var i = 0; i < layerNode.getNodeLevel(); i++) {
        //     console.log(layerNode)
        //   }
        // })


      },


      startup: function() {
        console.log('startup');
      },

      _initFilters0: function( filter ) {


      }

    });
  });