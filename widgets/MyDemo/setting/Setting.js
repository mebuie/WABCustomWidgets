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


define([
    'dojo/on',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/query',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'esri/lang',
    'jimu/utils',
    'jimu/BaseWidgetSetting',
    './GroupFilter',
    'jimu/LayerInfos/LayerInfos',
    '../CustomFeaturelayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, dom, domConstruct, domClass, query, html, lang, array, declare, _WidgetsInTemplateMixin, registry, esriLang, jimuUtils,
           BaseWidgetSetting, GroupFilter, LayerInfos, CustomFeaturelayerChooserFromMap, LayerChooserFromMap, LayerChooserFromMapWithDropbox ) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-mydemo-setting',

    groupFilterCounter: 0,

    postMixInProperties:function(){
      this.inherited(arguments);
    },

    postCreate: function(){
      // the config objects are passed in from config.json
      this.setConfig(this.config);

      // do other stuff here.
    },

    onOpen: function() {
      console.log("MyDemo Fired")
    },


    setConfig: function(config){
      this.config = config;

      if (this.config.groups.length > 0) {

        array.forEach( this.config.groups, lang.hitch(this, function ( group ) {
          this.createGroupBlock( group )
        }));

      } else {
        // No persistent group filters need to be created, so let's create an initial one on startup.
        this.createGroupBlock();
      }

    },

    getConfig: function(){
      // When the user is done configuring the widget, pass any widget parameters to config.json

      // Let's clear out any filter groups that may exist.
      this.config.groups = [];

      // Let's grab all the GroupFilter widgets that the user created.
      var groupFilterWidgetsNode = dom.byId('group-filter-container');
      var allGroupFilterWidgets = registry.findWidgets(groupFilterWidgetsNode);

      // For each GroupFilter widget, lets pass the parameters to config.json so we can recreate it later.
      array.forEach( allGroupFilterWidgets, lang.hitch(this, function( group ) {
        this.config.groups.push( group.getConfig() )
      }));

      return this.config
    },

    //*************************************************   BEGIN WIDGET METHODS   ***************************************

    _onBtnAddGroupClicked: function() {

      this.createGroupBlock();

    },

    createGroupBlock: function (parameters) {
      parameters = parameters || null;

      this.groupFilterCounter++

      var id = "filterGroup_" + this.groupFilterCounter;

      var filterGroup = new GroupFilter({
        id: id,
        class: id,
        map: this.map,
        nls: this.nls,
        parameters: parameters
      });
      filterGroup.placeAt(this.groupFilter);
    }

  });
});