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
    'dijit/registry',
    'esri/lang',
    'jimu/utils',
    'dijit/form/TextBox',
    'dijit/form/ValidationTextBox',
    'dijit/form/CheckBox',
    'jimu/BaseWidgetSetting',
    'jimu/LayerInfos/LayerInfos',
    './SingleFilter',
    '../CustomFeaturelayerChooserFromMap',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/CheckBox',
    'jimu/dijit/LoadingShelter'
  ],
  function(on, dom, domConstruct, domClass, query, html, template, lang, array, declare, _WidgetBase, _TemplatedMixin,
           _WidgetsInTemplateMixin, registry, esriLang, jimuUtils,
           TextBox, ValidationTextBox, CheckBox, BaseWidgetSetting, LayerInfos, SingleFilter,
           CustomFeaturelayerChooserFromMap, LayerChooserFromMapWithDropbox ) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-groupfilter-setting',
      templateString: template,

      filterCounter: 0,

      // Options
      map: null,
      nls: null,
      parameters: null,

      // postMixInProperties: function() {
      //   this.nls = lang.mixin(this.nls, window.jimuNls.common);
      //   this.nls = lang.mixin(this.nls, window.jimuNls.spatialFilterByFeatures);
      // },

      postMixInProperties:function(){
        this.inherited(arguments);
      },

      postCreate: function(){
        // Let's create the block group.
        this.createGroupBlock();

        // If widget parameters exist, we may need to recreate previously input filters.
        if (this.parameters) {
          this.setConfig(this.parameters);
        }
      },

      setConfig: function( parameters ){
        // If there are any layerFilters in the parameters object, let's recreate the layer filters.
        if ( parameters.layerFilters && parameters.layerFilters.length > 0 ) {
          array.forEach( parameters.layerFilters, lang.hitch(this, function( layerFilter ) {
            // TODO: Only create if it has an id.
            this.createLayerFilter( layerFilter )
          }));

        }

      },

      getConfig: function(){
        console.log("GroupFilter getConfig")

        // Empty array to store layer filter parameters before passing them to config object.
        var layerFilters = [];

        // Let's grab all the SingleFilter widgets that the user created.
        var filterWidgetsNode = dom.byId('filter-container');
        var allFilterWidgets = registry.findWidgets(filterWidgetsNode);

        // For each SingleFilter widget, lets pass the parameters to layerFilters so we can recreate it later.
        array.forEach(allFilterWidgets, lang.hitch(this, function ( filter ) {
          // TODO: Check if null first.
          layerFilters.push( filter.getConfig() )
        }));

        // Let's create a config file to store the parameters of the group filter.
        var config = {
          groupId: this.id,
          groupName: this.groupNameValidationBox.get('value'),
          layerFilters: layerFilters
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

      },

      _onBtnAddGroupClicked: function() {
        this.createLayerFilter();
      },

      createLayerFilter: function(parameters) {
        parameters = parameters || null;

        this.filterCounter++
        var id = this.id + "_filterLayer_" + this.filterCounter;

        var filter = new SingleFilter({
          id: id,
          map: this.map,
          nls: this.nls,
          parameters: parameters
        });
        filter.placeAt(this.layerFilterNode);
      }


    });
  });