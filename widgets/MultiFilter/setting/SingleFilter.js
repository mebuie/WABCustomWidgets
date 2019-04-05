///////////////////////////////////////////////////////////////////////////
// Copyright © 2019 Mark Buie - www.markbuie.com
//
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// This file was created by modifying Esri's Filter and GroupFilter widgets,
// as well as custom code and logic by Mark Buie to add support for grouped
// layer filter to the Filter Widget.
///////////////////////////////////////////////////////////////////////////

define([
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-construct',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/_base/declare',
    'dojo/text!./SingleFilter.html',
    'jimu/dijit/FeaturelayerChooserFromMap',
    'jimu/dijit/Filter',
    'jimu/dijit/LayerChooserFromMapWithDropbox'
  ],
  function(_TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, domConstruct, on, lang,
           declare, template, FeaturelayerChooserFromMap, Filter, LayerChooserFromMapWithDropbox ) {

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

        // If widget parameters exist, we may need to recreate previously input jimu/Filters.
        if ( this.parameters ) {
          this.setConfig( this.parameters )
        }
      },


      setConfig: function( parameters ){
        // If there are any partsObj in the parameters object, let's recreate the jimu/Filter.
        // If there is parameters.id but no partsObj, the user has already selected a layer, but with no expression.
        if ( parameters.partsObj || parameters.id) {
          this.createLayerExpression( parameters.partsObj );
        }
      },


      getConfig: function() {
        // Create a config object to store persistent user settings.
        this.layerObject = this.layerChooserSelect.getSelectedItem()
        if ( this.layerObject && this.layerObject.layerInfo.id ) {
          this.config = {
            filterId: this.id,
            id: this.layerObject.layerInfo.id,
            partsObj: this.filter.toJson()
          }
          return this.config;
        } else {
          return null;
        }
      },


      createLayerFilter: function() {
        // Let's create a layer chooser drop down box.
        var layerChooser = new FeaturelayerChooserFromMap({
          createMapResponse: this.map.webMapResponse,
          multiple: false, //Can select multiple layers or a single layer.
          onlyShowVisible: false,
          updateWhenLayerInfosIsShowInMapChanged: false,
          onlyShowWebMapLayers: true,
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

        // If the user selects a new layer, update the jimu/Filter.
        on( this.layerChooserSelect, 'selection-change', lang.hitch(this, function() {
          this.createLayerExpression( null )
        }));

        // Let's create a way for the user to delete a layer filter.
        var deleteFilter = domConstruct.create("div", {
          id: 'filter_' + this.groupfilterCounter,
          class: 'filter-delete-button'
        });
        var deleteFilterAction = on(deleteFilter, "click", lang.hitch(this, function() {
          deleteFilterAction.remove();
          this.destroy();
        }));
        domConstruct.place(deleteFilter, this.filterDeleteNode)
      },


      createLayerExpression: function( parameters ) {
        parameters = parameters || null;

        // Let's get rid of any filters that may exist.
        if ( this.filter ) {
          this.filter.destroy();
        }

        // Get the selected layer in the dropdown box.
        var selectedLayer = this.layerChooserSelect.getSelectedItem()

        // If the layer has layerInfo, create the jimu/Filter widget.
        if ( selectedLayer.layerInfo ) {
          var layerInfo = selectedLayer.layerInfo
          var layer = layerInfo.layerObject

          this.filter = new Filter({
            enableAskForValues: false
          });

          /*
          options.url: required,
          options.partsObj: {logicalOperator,parts,expr}
          options.expr: sql expression
          options.partsObj or options.expr is required. options.partsObj has priority.
          options.layerDefinition: optional
          options.featureLayerId: optional
          */
          this.filter.build({
            url: layer.url,
            partsObj: parameters,
            expr: '1=1',
            featureLayerId: layer.id
          })
          this.filter.placeAt(this.layerFilterNode)
        }
      }

    });
  });