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
      parameters: null,

      // postMixInProperties: function() {
      //   this.nls = lang.mixin(this.nls, window.jimuNls.common);
      //   this.nls = lang.mixin(this.nls, window.jimuNls.spatialFilterByFeatures);
      // },

      postCreate: function(){
        console.log("GroupFilter postCreate")
        this.createGroupBlock();

        // do other stuff here.
      },

      setConfig: function(config){
        console.log("GroupFilter setConfig")
      },

      getConfig: function(){
        console.log("GroupFilter getConfig")

        // Let's create a config file to store the parameters of the group filter.
        var config = {
          groupId: this.id,
          groupName: this.groupNameValidationBox.get('value')
        }

        return config;
      },

      createGroupBlock: function() {

        // Let's index the group filter blocks so we can reference them later.
        this.groupfilterCounter++;

        // Let's add a validation box to receive the group filter name.
        this.groupNameValidationBox = new ValidationTextBox({
          name: "txtGroupName",
          class: 'groupName-textbox',
          placeHolder: this.nls.groupNameValidationBoxHint,
          required: "true"
        });
        domConstruct.place(this.groupNameValidationBox.domNode, this.groupNameValidationBoxNode);

        // If we were given parameters, let's assign them to the group filter.
        if ( this.parameters ) {
          this.groupNameValidationBox.set('value', this.parameters.groupName)
        }


        // Let's create a way for the user to delete a group filter.
        var deleteGroupBlock = domConstruct.create("div", {
          id: 'groupDelete_' + this.groupfilterCounter,
          'class': 'group-block-delete-button'
        });
        var deleteGroupBlockAction = on(deleteGroupBlock, "click", lang.hitch(this, function() {
          console.log("delete")
          deleteGroupBlockAction.remove();
          this.destroy();
        }));
        domConstruct.place(deleteGroupBlock, this.groupBlockDelete)

      }
    });
  });