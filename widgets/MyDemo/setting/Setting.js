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
    './SingleFilterSetting',
    './GroupFilter',
    'jimu/LayerInfos/LayerInfos',
    '../CustomFeaturelayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, domConstruct, domClass, query, html, lang, array, declare, _WidgetsInTemplateMixin, esriLang, jimuUtils, BaseWidgetSetting,
           SingleSetting, GroupFilter, LayerInfos, CustomFeaturelayerChooserFromMap, LayerChooserFromMapWithDropbox ) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-mydemo-setting',

    groupCounter: 0,

    postCreate: function(){
      // the config objects are passed in
      this.setConfig(this.config);

      // do other stuff here.
    },


    setConfig: function(config){
      // assigns the config.json values to elements.
      // this.textNode.value = config.inputText;
    },

    getConfig: function(){
      // Returns a new config object with updated values, when the user selects OK on setting screen.
      // console.log(this.textNode.value)
      // return {
      //   inputText: this.textNode.value
      // };
    },

    //*************************************************   BEGIN WIDGET METHODS   ***************************************

    _onBtnAddGroupClicked: function() {
      console.log("Group button clicked")
      // if (this.layerChooserSelect) {
      //   this.layerChooserSelect.destroy();
      // }
      // this.layerChooserSelect = null;
      // console.log(this.layerChooserSelect)
      // var layerChooser = new CustomFeaturelayerChooserFromMap({
      //   showLayerFromFeatureSet: false,
      //   showTable: false,
      //   onlyShowVisible: false,
      //   onlyShowWebMapLayers: true,
      //   createMapResponse: this.map.webMapResponse
      // })
      // this.layerChooserSelect = new LayerChooserFromMapWithDropbox({
      //   layerChooser: layerChooser
      // })
      // this.layerChooserSelect.placeAt(this.layerTd)

      var filterGroup = new GroupFilter({
        nls: this.nls
      });
      console.log(filterGroup)
      filterGroup.placeAt(this.groupFilter);

    },

    createGroupBlock: function () {
      // this.groupCounter++;
      //
      // var dsNode = domConstruct.create("div", {
      //   id: 'grpDiv_' + this.groupCounter,
      //   'class': 'group-block'
      // });
      //
      // domConstruct.place(dsNode, this.layerMappingBlock);
      //
      // var groupSetting = domConstruct.create("div", {
      //   'class': 'group-setting-table'
      // })
      //
      // var layerChooserSelect= new SingleSetting({
      //   map: this.map,
      //   nls: this.nls
      // });
      // layerChooserSelect.placeAt(dsNode)

    }


  });
});