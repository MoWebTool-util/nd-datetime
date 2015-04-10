'use strict';

var expect = require('expect.js')
var datetime = require('../index')

/*globals describe, it*/

describe('nd-datetime', function() {

describe('1', function() {

  var ts = 342122630006
  var d = '1980-11-04'
  var t = '02:03:50'
  var dt = d + ' ' + t
  var ms = '006'
  var dtms = dt + '.' + ms;

  describe('timestamp', function() {

    it('default', function() {
      expect(datetime(ts).format()).to.be(dt)
    })

    it('isLeap', function() {
      expect(datetime(ts).isLeap()).to.be.ok()
      expect(datetime.isLeap(1980)).to.be.ok()
    })

    it('week', function() {
      expect(datetime(ts, 'EEEE').format()).to.be('Tuesday')
      expect(datetime(ts, 'EEE').format()).to.be('Tue')
      expect(datetime(ts, 'D').format()).to.be('2')
    })

    it('year', function() {
      expect(datetime(ts, 'yyyy').format()).to.be('1980')
      expect(datetime(ts, 'yy').format()).to.be('80')
    })

    it('month', function() {
      expect(datetime(ts, 'MMMM').format()).to.be('November')
      expect(datetime(ts, 'MMM').format()).to.be('Nov')
      expect(datetime(ts, 'MM').format()).to.be('11')
      expect(datetime(ts, 'M').format()).to.be('11')
    })

    it('date', function() {
      expect(datetime(ts, 'dd').format()).to.be('04')
      expect(datetime(ts, 'd').format()).to.be('4')
    })

    it('hours', function() {
      expect(datetime(ts, 'hh').format()).to.be('02')
      expect(datetime(ts, 'h').format()).to.be('2')
    })

    it('minutes', function() {
      expect(datetime(ts, 'mm').format()).to.be('03')
      expect(datetime(ts, 'm').format()).to.be('3')
    })

    it('seconds', function() {
      expect(datetime(ts, 'ss').format()).to.be('50')
      expect(datetime(ts, 's').format()).to.be('50')
    })

    it('milliseconds', function() {
      expect(datetime(ts, 'ii').format()).to.be(ms)
      expect(datetime(ts, 'i').format()).to.be('6')
    })

  })

  describe('datetime', function() {

    it('yyyy-MM-dd hh:mm:ss', function() {
      expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format()).to.be(dt)
    })

    it('yyyy-MM-dd', function() {
      expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format('yyyy-MM-dd')).to.be(d)
      expect(datetime(dt, 'yyyy-MM-dd').format()).to.be(d)
      expect(datetime(d, 'yyyy-MM-dd hh:mm:ss').format('yyyy-MM-dd')).to.be(d)
      expect(datetime(d, 'yyyy-MM-dd').format()).to.be(d)
    })

    it('hh:mm:ss', function() {
      expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format('hh:mm:ss')).to.be(t)
      expect(datetime(t, 'hh:mm:ss').format()).to.be(t)
    })

    it('ii', function() {
      expect(datetime(ms, 'ii').format()).to.be(ms)
    })

    it('toNumber()', function() {
      expect(datetime(dtms, 'yyyy-MM-dd hh:mm:ss.ii').toNumber()).to.be(ts)
    })

  })

})

describe('2', function() {

  var ts = 1428648185116
  var d = '2015-04-10'
  var t = '14:43:05'
  var dt = d + ' ' + t
  var ms = '116'
  var dtms = dt + '.' + ms;

  describe('timestamp', function() {

    it('default', function() {
      expect(datetime(ts).format()).to.be(dt)
    })

    it('isLeap', function() {
      expect(datetime(ts).isLeap()).to.not.be.ok()
      expect(datetime.isLeap(2015)).to.not.be.ok()
    })

    it('yyyy-MM-dd hh:mm:ss', function() {
      expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format()).to.be(dt)
    })

    it('week', function() {
      expect(datetime(ts, 'EEEE').format()).to.be('Friday')
      expect(datetime(ts, 'EEE').format()).to.be('Fri')
      expect(datetime(ts, 'D').format()).to.be('5')
    })

    it('year', function() {
      expect(datetime(ts, 'yyyy').format()).to.be('2015')
      expect(datetime(ts, 'yy').format()).to.be('115')
    })

    it('month', function() {
      expect(datetime(ts, 'MMMM').format()).to.be('April')
      expect(datetime(ts, 'MMM').format()).to.be('Apr')
      expect(datetime(ts, 'MM').format()).to.be('04')
      expect(datetime(ts, 'M').format()).to.be('4')
    })

    it('date', function() {
      expect(datetime(ts, 'dd').format()).to.be('10')
      expect(datetime(ts, 'd').format()).to.be('10')
    })

    it('hours', function() {
      expect(datetime(ts, 'hh').format()).to.be('14')
      expect(datetime(ts, 'h').format()).to.be('14')
    })

    it('minutes', function() {
      expect(datetime(ts, 'mm').format()).to.be('43')
      expect(datetime(ts, 'm').format()).to.be('43')
    })

    it('seconds', function() {
      expect(datetime(ts, 'ss').format()).to.be('05')
      expect(datetime(ts, 's').format()).to.be('5')
    })

    it('milliseconds', function() {
      expect(datetime(ts, 'ii').format()).to.be(ms)
      expect(datetime(ts, 'i').format()).to.be(ms)
    })

  })

  describe('datetime', function() {

    it('yyyy-MM-dd hh:mm:ss', function() {
      expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format()).to.be(dt)
    })

    it('yyyy-MM-dd', function() {
      expect(datetime(d, 'yyyy-MM-dd').format()).to.be(d)
    })

    it('hh:mm:ss', function() {
      expect(datetime(t, 'hh:mm:ss').format()).to.be(t)
    })

    it('ii', function() {
      expect(datetime(ms, 'ii').format()).to.be(ms)
    })

    it('toNumber()', function() {
      expect(datetime(dtms, 'yyyy-MM-dd hh:mm:ss.ii').toNumber()).to.be(ts)
    })

  })

  describe('dateobject', function() {

    var dobj = new Date(ts);

    it('yyyy-MM-dd hh:mm:ss', function() {
      expect(datetime(dobj, 'yyyy-MM-dd hh:mm:ss').format()).to.be(dt)
    })

    it('yyyy-MM-dd', function() {
      expect(datetime(dobj, 'yyyy-MM-dd').format()).to.be(d)
    })

    it('hh:mm:ss', function() {
      expect(datetime(dobj, 'hh:mm:ss').format()).to.be(t)
    })

    it('ii', function() {
      expect(datetime(dobj, 'ii').format()).to.be(ms)
    })

    it('toNumber()', function() {
      expect(datetime(dobj, 'yyyy-MM-dd hh:mm:ss.ii').toNumber()).to.be(ts)
    })

    it('toString()', function() {
      expect(datetime(dobj, 'yyyy-MM-dd hh:mm:ss.ii').toString()).to.be(dtms)
    })

  })

})

})
