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
    './SingleFilter',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dijit/registry',
    'dijit/form/ValidationTextBox',
    'dojo/on',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/_base/array',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/text!./GroupFilter.html'
  ],
  function(SingleFilter, _TemplatedMixin, _WidgetBase, _WidgetsInTemplateMixin, registry, ValidationTextBox, on, domConstruct, query, array, declare, lang, template ) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-groupfilter-setting',
      templateString: template,

      filterCounter: 0,

      // Options
      map: null,
      nls: null,
      parameters: null,


      postMixInProperties:function(){
        this.inherited(arguments);
      },


      postCreate: function(){
        // Let's create the block group.
        this.createGroupBlock();

        // If widget parameters exist, we may need to recreate previously input layer filters.
        if (this.parameters) {
          this.setConfig(this.parameters);
        }
      },


      setConfig: function( parameters ){
        // If there are any layerFilters in the parameters object, let's recreate the layer filters.
        if ( parameters.layerFilters && parameters.layerFilters.length > 0 ) {
          array.forEach( parameters.layerFilters, lang.hitch(this, function( layerFilter ) {
            this.createLayerFilter( layerFilter )
          }));
        }
      },


      getConfig: function(){
        // Empty array to store layer filter parameters before passing them to config object.
        var layerFilters = [];

        // Let's grab all the SingleFilter widgets that the user created.
        var filterWidgetsNode = query('#' + this.id + ' #filter-container'); // limit search to current filter group.
        var allFilterWidgets = registry.findWidgets( filterWidgetsNode[0] );

        // For each SingleFilter widget, lets pass the parameters to layerFilters so we can recreate it later.
        array.forEach( allFilterWidgets, lang.hitch( this, function ( filterWidget ) {
          var filterWidgetConfig = filterWidget.getConfig();
          if ( filterWidgetConfig ) {
            layerFilters.push( filterWidgetConfig )
          }
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