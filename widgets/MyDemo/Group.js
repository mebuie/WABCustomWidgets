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
        this.inherited(arguments);
        this.layerStructure = LayerStructure.getInstance();
        this.filterManager = FilterManager.getInstance();

        // Let's add the group filter name.
        this.groupName.innerHTML = this.parameters.groupName;
      },


      startup: function() {
        console.log('startup');
      },

      _initFilters0: function( filter ) {


      }

    });
  });