define([
    'dojo/on',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/query',
    'dojo/_base/html',
    'dojo/text!./SingleFilter.html',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    'esri/lang',
    'jimu/utils',
    'dijit/form/TextBox',
    'dijit/form/ValidationTextBox',
    'dijit/form/CheckBox',
    'jimu/BaseWidgetSetting',
    'jimu/LayerInfos/LayerInfos',
    '../CustomFeaturelayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, domConstruct, domClass, query, html, template, lang, array, declare, _WidgetBase, _TemplatedMixin,
           _WidgetsInTemplateMixin, esriLang, jimuUtils,
           TextBox, ValidationTextBox, CheckBox, BaseWidgetSetting, LayerInfos,
           CustomFeaturelayerChooserFromMap, LayerChooserFromMap, LayerChooserFromMapWithDropbox ) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-singlefilter-setting',
      templateString: template,

      // Options
      map: null,
      nls: null,
      parameters: null,

      postMixInProperties:function(){
        this.inherited(arguments);
      },

      postCreate: function(){
        this.createLayerFilter();

      },

      startup: function() {

      },


      setConfig: function(config){

      },

      getConfig: function() {

      },

      createLayerFilter: function() {

        // Let's create a layer chooser drop down box. 
        var layerChooser = new LayerChooserFromMap({
          createMapResponse: this.map.webMapResponse
        });
        var layerChooserSelect = new LayerChooserFromMapWithDropbox({
          layerChooser: layerChooser
        });
        layerChooserSelect.placeAt(this.layerChooserNode);
      }
    });
  });