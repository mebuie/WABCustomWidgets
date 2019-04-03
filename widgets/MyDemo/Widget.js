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
// This file has been modified from the Filter widget by Mark Buie to add support
// for group filtering.
///////////////////////////////////////////////////////////////////////////
var test;
define([
  './Group',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'jimu/BaseWidget',
  'jimu/FilterManager',
  'jimu/LayerStructure'],
function(
  Group,
  _WidgetsInTemplateMixin,
  array,
  declare,
  lang,
  BaseWidget,
  FilterManager,
  LayerStructure) {

  return declare([_WidgetsInTemplateMixin, BaseWidget], {
    baseClass: 'jimu-widget-mydemo',


    postCreate: function() {
      this.inherited(arguments);
      this.layerStructure = LayerStructure.getInstance();
      this.filterManager = FilterManager.getInstance();

      if ( this.config.groups ) {
        array.forEach( this.config.groups, lang.hitch( this, function ( group ) {
          // this._initFilters( group );
          var group = new Group({
            nls: this.nls
          })
          group.placeAt(this.groupFilter)
        }));
      }

      // this.layerStructure.traversal( function( layerNode ) {
      //   for( var i = 0; i < layerNode.getNodeLevel(); i++) {
      //     console.log(layerNode)
      //   }
      // })
    },


    startup: function() {
      console.log('startup');
    },

    _initFilters: function( filter ) {
      console.log(filter)

    }

  });
});