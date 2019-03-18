define([
    'dojo/on',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/query',
    'dojo/_base/html',
    'dojo/text!./GroupFilter.html',
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
    'jimu/LayerInfos/LayerInfos',
    '../CustomFeaturelayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, dom, domConstruct, domClass, query, html, template, lang, array, declare, _WidgetBase, _TemplatedMixin,
           _WidgetsInTemplateMixin, esriLang, jimuUtils,
           TextBox, ValidationTextBox, CheckBox, BaseWidgetSetting, LayerInfos,
           CustomFeaturelayerChooserFromMap, LayerChooserFromMapWithDropbox ) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-groupfilter-setting',
      templateString: template,

      groupfilterCounter: 0,

      // Options
      map: null,
      nls: null,

      // postMixInProperties: function() {
      //   this.nls = lang.mixin(this.nls, window.jimuNls.common);
      //   this.nls = lang.mixin(this.nls, window.jimuNls.spatialFilterByFeatures);
      // },

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
      },

      createGroupBlock: function() {
        this.groupfilterCounter++;

        var txtGroupName = new ValidationTextBox({
          name: "txtGroupName",
          class: 'groupName-textbox',
          placeHolder: this.nls.groupNameValidationBoxHint,
          required: "true"
        });
        domConstruct.place(txtGroupName.domNode, this.groupNameValidationBox);

        var deleteGroupBlock = domConstruct.create("div", {
          id: 'groupDelete_' + this.groupfilterCounter,
          class: 'groupName-delete'
        });
        var deleteGroupBlockAction = on(deleteGroupBlock, "click", lang.hitch(this, function() {
          deleteGroupBlockAction.remove();
          domConstruct.destroy(dom.byId('groupDelete_' + this.groupfilterCounter));
        }));
      },

      removeGroup: function(groupId) {
        domConstruct.destroy(dom.byId(''))
      }







    });
  });