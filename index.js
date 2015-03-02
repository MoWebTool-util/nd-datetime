/**
 * @module: nd-datetime
 * @author: crossjs <liwenfu@crossjs.com> - 2015-03-02 20:03:53
 */

'use strict';

var DateTime = function(timestamp, format) {
  this._date = timestamp ? new Date(timestamp) : new Date();
  this._format = format || 'yy-mm-dd hh:ii:ss';
};

DateTime.prototype.format = function(format) {
  var that = this;

  return (format || this._format).replace(/(y|m|d|h|i|s)\1?/g, function($0) {
    var f = that['_' + $0];
    return f ? f.call(that) : '';
  });
};

DateTime.prototype.toString = function() {
  return this.format();
};

DateTime.prototype._y = function() {
  return this._date.getYear();
};

DateTime.prototype._yy = function() {
  return this._date.getFullYear();
};

DateTime.prototype._m = function() {
  return this._date.getMonth() + 1;
};

DateTime.prototype._mm = function() {
  var m = this._m();

  return m < 10 ? '0' + m : m;
};

DateTime.prototype._d = function() {
  return this._date.getDate();
};

DateTime.prototype._dd = function() {
  var d = this._d();

  return d < 10 ? '0' + d : d;
};

DateTime.prototype._h = function() {
  return this._date.getHours();
};

DateTime.prototype._hh = function() {
  var h = this._h();

  return h < 10 ? '0' + h : h;
};

DateTime.prototype._i = function() {
  return this._date.getMinutes();
};

DateTime.prototype._ii = function() {
  var i = this._i();

  return i < 10 ? '0' + i : i;
};

DateTime.prototype._s = function() {
  return this._date.getSeconds();
};

DateTime.prototype._ss = function() {
  var s = this._s();

  return s < 10 ? '0' + s : s;
};

module.exports = function(timestamp, format) {
  return new DateTime(timestamp, format);
};
