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
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/query',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'esri/lang',
    'jimu/utils',
    'jimu/BaseWidgetSetting',
    './GroupFilter',
    'jimu/LayerInfos/LayerInfos',
    '../CustomFeaturelayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, domConstruct, domClass, query, html, lang, array, declare, _WidgetsInTemplateMixin, esriLang, jimuUtils,
           BaseWidgetSetting, GroupFilter, LayerInfos, CustomFeaturelayerChooserFromMap, LayerChooserFromMapWithDropbox ) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-mydemo-setting',

    groupFilterCounter: 0,

    postCreate: function(){
      // the config objects are passed in from config.json
      this.setConfig(this.config);

      // do other stuff here.
    },

    setConfig: function(config){
      this.config = config;
      if (this.config.groups.length > 0) {
        // Load parameters here.
        // TODO: for each group filter, recreate the group filter.
      } else {
        return false
      }

    },

    getConfig: function(){
      // When the user is done configuring the widget, pass any widget parameters to config.json
      if (this.config.groups.length > 0) {
        console.log(this.config)
        return this.config
      } else {
        return false
      }


    },

    //*************************************************   BEGIN WIDGET METHODS   ***************************************

    _onBtnAddGroupClicked: function() {

      this.createGroupBlock();

    },

    createGroupBlock: function () {
      this.groupFilterCounter++

      var filterGroup = new GroupFilter({
        id: "filterGroup_" + this.groupFilterCounter,
        nls: this.nls
      });
      filterGroup.placeAt(this.groupFilter);
    }


  });
});