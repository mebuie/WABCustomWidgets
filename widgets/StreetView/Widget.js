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
// This file was created using Esri's Web Appbuilder for ArcGIS
// Developers Edition API Reference Guide.
///////////////////////////////////////////////////////////////////////////
var test;
define([
  'dijit/_WidgetsInTemplateMixin',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/on',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'esri/geometry/webMercatorUtils',
  'jimu/BaseWidget'
  ],
function(
  _WidgetsInTemplateMixin,
  dom,
  domConstruct,
  on,
  array,
  declare,
  lang,
  webMercatorUtils,
  BaseWidget) {

  return declare([_WidgetsInTemplateMixin, BaseWidget], {
    baseClass: 'jimu-widget-streetview',


    postCreate: function() {
      this.inherited(arguments);
    },

    onOpen: function() {

      // Create the widget dom.
      var pegman = this.folderUrl + 'images/pegman.png'
      var streetContainer = domConstruct.toDom(
        "<div class='street-view-container'>" +
        " <div id='street-view-viewport' class='street-view-viewport'>" +
        "   <p>+</p>" +
        " </div>" +
        " <div class='street-view-button-container'>" +
        "   <div id='street-view-button' class='street-view-button'>" +
        "     <img class='street-view-icon' src=" + pegman + " height='45' width='31'/>" +
        "   </div>" +
        " </div>" +
        "</div>"
      );
      domConstruct.place(streetContainer, this.id, "only")

      // Make the widget draggable
      on(dom.byId("street-view-viewport"), "mousedown", lang.hitch(this, function(e) {
        this.moveParentElement(e, dom.byId(this.id))
      }));

      // Add a click handler on the pegman button.
      this.onClick(dom.byId('street-view-button'))
    },

    moveParentElement: function(e, parentElement) {
      e.stopPropagation();
      var pos3 = e.clientX
      var pos4 = e.clientY

      var dragEvent = on(document, "mousemove", lang.hitch(this, function(e) {
        var pos1 = pos3 - e.clientX
        var pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        parentElement.style.top = (parentElement.offsetTop - pos2) + "px"
        parentElement.style.left = (parentElement.offsetLeft - pos1) + "px"
      }))

      var endDragEvent = on(document, "mouseup", lang.hitch(this, function(e){
        dragEvent.remove()
        endDragEvent.remove()
      }))

    },

    onClick: function(element) {
      var id = this.id
      var map = this.map

      element.onclick = getViewportCoordinates

      function getViewportCoordinates(e) {

        // Get the map coordinates that correspond to the middle of #street-view-viewport
        var viewportContainer = document.getElementById(id)
        var viewport = document.getElementById('street-view-viewport')
        var x = viewportContainer.offsetLeft + viewport.offsetWidth / 2
        var y = viewportContainer.offsetTop + viewport.offsetHeight / 2
        var coordinates = map.toMap({x: x, y: y})

        
        var value = webMercatorUtils.xyToLngLat(coordinates.x, coordinates.y, true);
        console.log(value)

        var googleURL = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint='

        var url = googleURL + value[1] + "," + value[0]

        window.open(url)

      }
    }



  });
});