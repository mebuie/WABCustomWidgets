///////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////

define([
    'dojo/on',
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
    'jimu/LayerInfos/LayerInfos',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, query, html, lang, array, declare, _WidgetsInTemplateMixin, esriLang, jimuUtils, BaseWidgetSetting,
           SingleSetting, LayerInfos) {

  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
    baseClass: 'jimu-widget-mydemo-setting',

    postCreate: function(){
      // the config objects are passed in
      this.setConfig(this.config);

      // do other stuff here.
    },

    _onBtnAddGroupClicked: function() {
      console.log("Group button clicked")

      return;
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
    }
  });
});