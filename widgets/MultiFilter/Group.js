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
  'dijit/_WidgetsInTemplateMixin',
  'dojo/on',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/text!./Group.html',
  'jimu/BaseWidget',
  'jimu/FilterManager',
  'jimu/LayerInfos/LayerInfos', // v2.6
  // 'jimu/LayerStructure', // v2.11
  './ToggleButton'

  ],  function(
    _WidgetsInTemplateMixin,
    on,
    array,
    declare,
    lang,
    template,
    BaseWidget,
    FilterManager,
    LayerInfos, // v2.6
    // LayerStructure, // v2.11
    ToggleButton) {

    return declare([_WidgetsInTemplateMixin, BaseWidget], {
      baseClass: 'jimu-widget-group',
      templateString: template,
      map: null,
      nls: null,
      name: null,
      layerFilters: null,

      isFilterSet: false,


      postCreate: function() {
        this.inherited(arguments);
        this.layerInfosObj = LayerInfos.getInstanceSync(); // v2.6
        // this.layerStructure = LayerStructure.getInstance(); // v2.11
        this.filterManager = FilterManager.getInstance();

        // Let's add the group filter name.
        this.groupName.innerHTML = this.name;

        // Let's add a toggle button for the filter.
        this.toggleButton = new ToggleButton({}, this.filterButton)
        this.toggleButton.startup();
        this.toggleButton.setValue(false);
      },


      toggleMultiFilter: function( parentId ) {
        if (!this.isFilterSet) {
          this.setMultiFilter( parentId );
        } else {
          this.setMultiFilter( parentId );
        }
      },


      setMultiFilter: function()  {
        array.forEach(this.layerFilters, lang.hitch( this, function( layerFilter ){
          var layer = this.layerInfosObj.getLayerInfoById( layerFilter.id ); //v2.6
          // var layer = this.layerStructure.getNodeById( layerFilter.id ); // v2.11
          var expr = ""

          // Let's determine whether the filter needs to be applied or removed.
          if ( !this.isFilterSet ) {
            expr = layerFilter.partsObj.expr
          } else {
            expr = ""
          }

          // @param  {[string]} layerId       [the layer id]
          // @param  {[type]} widgetId        [description]
          // @param  {[type]} expression      [description]
          // @param  {[type]} enableMapFilter [true/false or null or undefined]
          // @param  {[type]} useAND [true/false or null or undefined]
          // @param  {[type]} zoomAfterFilter [true/false or null or undefined]
          this.filterManager.applyWidgetFilter( layer.id, this.id, expr, true, false, true )
        }));

        // Let's update the toggle button status.
        if ( !this.isFilterSet ) {
          this.isFilterSet = true;
          this.toggleButton.setValue(true);
        } else {
          this.isFilterSet = false;
          this.toggleButton.setValue(false);
        }
      }

    });
  });