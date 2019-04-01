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
    'jimu/dijit/Filter',
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
           _WidgetsInTemplateMixin, esriLang, jimuUtils, Filter,
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


      getConfig: function() {
        // Pack all the user defined parameters and return them as a config object.
        this.layerObject = this.layerChooserSelect.getSelectedItem()
        if ( this.layerObject && this.layerObject.layerInfo.id ) {
          this.config = {
            filterId: this.id,
            id: this.layerObject.layerInfo.id
          }
          return this.config;
        } else {
          return null;
        }
      },


      createLayerFilter: function() {
        // Let's create a layer chooser drop down box.
        var layerChooser = new LayerChooserFromMap({
          createMapResponse: this.map.webMapResponse,
          multiple: false, //Can select multiple layers or a single layer.
          onlyShowVisible: false,
          updateWhenLayerInfosIsShowInMapChanged: false,
          onlyShowWebMapLayers: false,
          displayTooltipForTreeNode: false
        });
        this.layerChooserSelect = new LayerChooserFromMapWithDropbox({
          layerChooser: layerChooser
        });
        this.layerChooserSelect.placeAt(this.layerChooserNode);

        // If we were given parameters, let's assign them to the layer filter.
        if ( this.parameters ) {
          this.layerChooserSelect.setSelectedLayer( this.parameters )
        }

        // TODO: Create a filter expression widget if the layer changes.
        on( this.layerChooserSelect, 'selection-change', lang.hitch(this, this.createLayerExpression))

        // Let's create a way for the user to delete a layer filter.
        var deleteFilter = domConstruct.create("div", {
          id: 'filter_' + this.groupfilterCounter,
          class: 'filter-delete-button'
        });
        var deleteFilterAction = on(deleteFilter, "click", lang.hitch(this, function() {
          console.log("delete")
          deleteFilterAction.remove();
          this.destroy();
        }));
        domConstruct.place(deleteFilter, this.filterDeleteNode)
      },

      createLayerExpression: function() {
        // Get the selected layer in the dropdown box.
        var selectedLayer = this.layerChooserSelect.getSelectedItem()

        // If the layer has layerInfo, create an expression widget.
        if ( selectedLayer.layerInfo ) {
          var layerInfo = selectedLayer.layerInfo
          var layer = layerInfo.layerObject

          this.filter = new Filter({
            enableAskForValues: true,
            featureLayerId: layer.id
          });
          this.filter.buildByExpr(layer.url, "1=1", layer)
          this.filter.placeAt(this.layerFilterNode)
        }

      }

    });
  });