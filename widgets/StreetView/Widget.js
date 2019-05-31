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
      var streetContainer = domConstruct.toDom("<div class='street-view-container'>\n" +
        "    <div id='street-view-viewport' class=\"street-view-viewport\">\n" +
        "        <p>+</p>\n" +
        "    </div>\n" +
        "    <div id='street-view-button' class=\"street-view-button\">\n" +
        "        <img class=\"street-view-icon\" src='" + pegman + "'>\n" +
        "    </div>\n" +
        "</div>");
      domConstruct.place(streetContainer, this.id, "only")

      // Make the widget draggable
      this.dragElement(dom.byId(this.id))

      // Add a click handler on the pegman button.
      this.onClick(dom.byId('street-view-button'))
    },


    /**
     *
     * Source: Modified from w3schools.com Draggable HTML Element tutorial
     *         https://www.w3schools.com/howto/howto_js_draggable.asp
     *
     * @param elmnt
     */
    dragElement: function(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (dom.byId(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        dom.byId(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    },

    onClick: function(element) {
      var id = this.id
      var map = this.map

      element.onclick = getViewportCoordinates

      function getViewportCoordinates(e) {
        e = e || window.event;

        var viewportContainer = document.getElementById(id)
        var viewport = document.getElementById('street-view-viewport')

        var x = viewportContainer.offsetLeft + viewport.offsetWidth / 2
        var y = viewportContainer.offsetTop + viewport.offsetHeight / 2

        var coordinates = map.toMap({x: x, y: y})
        console.log(coordinates)

        var value = webMercatorUtils.xyToLngLat(coordinates.x, coordinates.y, true);
        console.log(value)

        var googleURL = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint='

        var url = googleURL + value[1] + "," + value[0]

        window.open(url)

      }
    }



  });
});