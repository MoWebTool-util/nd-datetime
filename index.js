/**
 * @module: nd-datetime
 * @author: crossjs <liwenfu@crossjs.com> - 2015-03-02 20:03:53
 */

'use strict';

var MONTH_NAMES = ['January', 'February', 'March',  'April', 'May', 'June',  'July', 'August', 'September',  'October', 'November', 'December'];
var MONTH_NAMES_ABBR = ['Jan', 'Feb', 'Mar',  'Apr', 'May', 'Jun',  'Jul', 'Aug', 'Sep',  'Oct', 'Nov', 'Dec'];
var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var DAY_NAMES_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss';

function zeroPad(m, n) {
  n || (n = 2);
  m = '' + m;
  n -= m.length;
  while (n--) {
    m = '0' + m;
  }
  return m;
}

var helpers = {

  MMMM: function(date) {
    return MONTH_NAMES[helpers.M(date) - 1];
  },

  MMM: function(date) {
    return MONTH_NAMES_ABBR[helpers.M(date) - 1];
  },

  EEEE: function(date) {
    return DAY_NAMES[helpers.D(date)];
  },

  EEE: function(date) {
    return DAY_NAMES_ABBR[helpers.D(date)];
  },

  // TODO: 一年中的第几周
  EE: function(/*date*/) {
    return '';
  },

  // TODO: 一月中的第几周
  E: function(/*date*/) {
    return '';
  },

  D: function(date) {
    return date.getDay();
  },

  yyyy: function(date) {
    return date.getFullYear();
  },

  yy: function(date) {
    return date.getYear();
  },

  MM: function(date) {
    return zeroPad(helpers.M(date));
  },

  M: function(date) {
    return date.getMonth() + 1;
  },

  dd: function(date) {
    return zeroPad(helpers.d(date));
  },

  d: function(date) {
    return date.getDate();
  },

  hh: function(date) {
    return zeroPad(helpers.h(date));
  },

  h: function(date) {
    return date.getHours();
  },

  mm: function(date) {
    return zeroPad(helpers.m(date));
  },

  m: function(date) {
    return date.getMinutes();
  },

  ss: function(date) {
    return zeroPad(helpers.s(date));
  },

  s: function(date) {
    return date.getSeconds();
  },

  ii: function(date) {
    return zeroPad(helpers.i(date), 3);
  },

  i: function(date) {
    return date.getMilliseconds();
  }

};

function parseVal(timestamp, format) {
  format || (format = DATETIME_FORMAT);
  // '2015-04-10 14:43:05'
  // 'yyyy-MM-dd hh:mm:ss'
  // ["2015", "04", "10", "14", "43", "05"]
  // ["yyyy", "MM", "dd", "hh", "mm", "ss"]

  var tArr = timestamp.split(/\D+/);
  var fArr = format.split(/[^yMdhmsiED]+/);

  var y, M, d, h, m, s, i;
  var map = {};

  for (i = 0; i < fArr.length; i++) {
    map[fArr[i]] = parseInt(tArr[i], 10);
  }

  y = map.yyyy || map.yy || 1970;
  M = map.MM || map.M || 0;
  d = map.dd || map.d || 1;
  h = map.hh || map.h || 0;
  m = map.mm || map.m || 0;
  s = map.ss || map.s || 0;
  i = map.ii || map.i || 0;

  return new Date(y < 1900 ? y + 1900 : y, M - 1, d, h, m, s, i);
}

function parseDate(timestamp, format) {
  if (typeof timestamp === 'function') {
    return timestamp(format);
  }

  if (timestamp) {

    if (timestamp.constructor === Date) {
      return timestamp;
    }

    if (!/\D/.test(timestamp)) {
      return new Date(+timestamp);
    }

    // string
    return parseVal(timestamp, format);

  } else {

    if (typeof timestamp === 'undefined') {
      // now
      return new Date();
    }

    // 1970-01-01 ...
    return new Date(0);

  }
}

var DateTime = function(timestamp, format) {
  this._date = parseDate(timestamp, format);
  this._format = format || 'yyyy-MM-dd hh:mm:ss';
};

DateTime.prototype.format = function(format) {
  var date = this._date;

  return (format || this._format).replace(/(y|M|d|h|m|s|i|E|D)+/g, function($0) {
    return ($0 in helpers) ? helpers[$0](date) : '';
  });
};

DateTime.prototype.toNumber = function() {
  return this._date.getTime();
};

DateTime.prototype.toString = function(format) {
  return this.format(format);
};

module.exports = function(timestamp, format) {
  return new DateTime(timestamp, format);
};
