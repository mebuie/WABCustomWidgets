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
var test;
define([
  './Group',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/on',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'jimu/BaseWidget',
  'jimu/FilterManager',
  'jimu/LayerStructure'],
function(
  Group,
  _WidgetsInTemplateMixin,
  on,
  array,
  declare,
  lang,
  BaseWidget,
  FilterManager,
  LayerStructure) {

  return declare([_WidgetsInTemplateMixin, BaseWidget], {
    baseClass: 'jimu-widget-MultiFilter',


    postCreate: function() {
      this.inherited(arguments);


      // Config architecture:
      //
      // this.config
      //  groups: Array
      //   0:
      //    groupId:
      //    groupName:
      //    layerFilters: Array
      //     0:
      //      filterId:
      //      id:
      //      partsObj:

      // Let's create the filter groups in config.
      if ( this.config.groups ) {
        array.forEach( this.config.groups, lang.hitch( this, function ( group ) {
          this._initGroup( group )
        }));
      }
    },


    startup: function() {
      console.log('startup');
    },


    _initGroup: function( group ) {
      var filterGroup = new Group({
        id: group.groupId,
        map: this.map,
        nls: this.nls,
        name: group.groupName,
        layerFilters: group.layerFilters
      })
      filterGroup.placeAt(this.groupFilter)

      on(filterGroup, "click", lang.hitch(this, function(){
        filterGroup.toggleMultiFilter();
      }));
    }

  });
});