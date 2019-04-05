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
    './GroupFilter',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'dojo/on',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'jimu/BaseWidgetSetting',
    'jimu/dijit/Message'
  ],
  function(GroupFilter, _WidgetsInTemplateMixin, registry, on, dom, domConstruct,
           array, declare, lang, BaseWidgetSetting,  Message) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-MultiFilter-setting',

    groupFilterCounter: 0,


    postMixInProperties:function(){
      this.inherited(arguments);
    },


    postCreate: function(){
      // the config objects are passed in from config.json
      this.setConfig(this.config);
    },


    setConfig: function(config){
      this.config = config;

      // If there are any filter groups in the config, let's recreate the filter group.
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
      // Let's clear out any filter groups that may exist.
      this.config.groups = [];

      // Let's grab all the GroupFilter widgets that the user created.
      var groupFilterWidgetsNode = dom.byId('group-filter-container');
      var allGroupFilterWidgets = registry.findWidgets(groupFilterWidgetsNode);

      // For each GroupFilter widget, lets pass the parameters to config.json so we can recreate it later.
      array.forEach( allGroupFilterWidgets, lang.hitch(this, function( group ) {
        this.config.groups.push( group.getConfig() )
      }));

      // Let's valid the input parameters before we close the settings page.
      if ( !this._validate(this.config) ) {
        return false
      } else {
        return this.config
      }
    },


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
    },


    _validate: function(config ) {
      var errCount = 0;
      array.some( config.groups, lang.hitch(this, function( group ) {
        // Check if any group names are blank.
        if ( lang.trim(group.groupName) === "") {
          errCount++
          this._showMessage(this.nls.errName)
          return errCount > 0
        }

        //If a group filter has a name, at least one layer must be selected.
        if ( lang.trim(group.groupName) !== "" && group.layerFilters.length === 0 ) {
          errCount++
          this._showMessage(this.nls.errLayer)
          return errCount > 0
        }

        // Check for valid expression in each jimu/Filter
        if ( array.some( group.layerFilters, lang.hitch(this, function ( filter ) {
          return filter.id && !filter.partsObj}))) {
          errCount++
          this._showMessage(this.nls.errSQL)
          return errCount > 0
        }

      }));
      return errCount === 0
    },


    _showMessage: function ( msg ) {
      new Message({
        type: 'error',
        message: msg
      })
    }


  });
});