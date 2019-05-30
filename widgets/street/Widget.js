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
var test;
define([
  'dijit/_WidgetsInTemplateMixin',
  'dojo/on',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'jimu/BaseWidget'
  ],
function(
  _WidgetsInTemplateMixin,
  on,
  array,
  declare,
  lang,
  BaseWidget) {

  return declare([_WidgetsInTemplateMixin, BaseWidget], {
    baseClass: 'jimu-widget-street',


    postCreate: function() {
      this.inherited(arguments);

      alert("worked")

    }

  });
});