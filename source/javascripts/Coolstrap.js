/**
* Coolstrapp.js 
*/
var COOL = COOL || {};
COOL.VERSION = '0.9';

COOL.Attributes || (COOL.Attributes = {});
COOL.Data || (COOL.Data = {});
COOL.View || (COOL.View = {});
COOL.Device || (COOL.Device = {});
COOL.dom = "undefined" !== typeof window ? window.jQuery || window.Zepto || null : null;