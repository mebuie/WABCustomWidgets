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
    'dijit/form/TextBox',
    'dijit/form/ValidationTextBox',
    'dijit/form/CheckBox',
    'jimu/BaseWidgetSetting',
    './SingleFilterSetting',
    'jimu/LayerInfos/LayerInfos',
    '../CustomFeaturelayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, domConstruct, domClass, query, html, template, lang, array, declare, _WidgetBase, _TemplatedMixin,
           _WidgetsInTemplateMixin, esriLang, jimuUtils,
           TextBox, ValidationTextBox, CheckBox, BaseWidgetSetting, SingleSetting, LayerInfos,
           CustomFeaturelayerChooserFromMap, LayerChooserFromMapWithDropbox ) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-singlefilter-setting',
      templateString: template,

      // Options
      map: null,
      nls: null,

      postCreate: function(){
        // the config objects are passed in
        this.setConfig(this.config);

        // do other stuff here.
      },

      startup: function() {
        this.createGroupBlock();
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