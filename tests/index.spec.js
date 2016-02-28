'use strict';

var expect = require('chai').expect
var datetime = require('../index')

var offset = new Date().getTimezoneOffset()

/*globals describe, it*/

describe('parse', function() {

  describe('simple', function() {
    var val = new Date()
    var fmt = 'yyyy-MM-dd hh:mm'
    it(val, function() {
      expect(datetime().format(fmt)).to.equal(datetime(val, fmt).format())
    })
  })

  describe('1970', function() {
    var fmt = 'yyyy'
    it(fmt, function() {
      expect(datetime(null).format(fmt)).to.equal('1970')
    })
  })

  describe('Now', function() {
    var val = new Date()
    var fmt = 'yyyy-MM-dd hh:mm'
    it(val, function() {
      expect(datetime(val, fmt).format()).to.equal(datetime().format(fmt))
    })
  })

  var val = '2015-04-22T02:32:27.068+0000'
  var res = '2015-04-22 02:32:27'

  describe('ISO-8601', function() {
    it(val, function() {
      expect(datetime(val).add('m', offset).format()).to.equal(res)
    })
  })

  describe('function', function() {
    it('new Date(val)', function() {
      expect(datetime(function() {
        return datetime(val).toDate()
      }).add('m', offset).format()).to.equal(res)
    })
  })

})

describe('format', function() {

  describe('0', function() {
    var val = '2015-04-22T02:32:27.068+0000';
    it('ABC is skipped and preserved', function() {
      expect(datetime(val).add('m', offset).format('AByyyyC')).to.equal('AB2015C')
    })

    it('115-04-22 is 2015-04-22', function() {
      expect(datetime('115-04-22', 'yyyy-MM-dd').format()).to.equal('2015-04-22')
    })
  })

  describe('1', function() {

    var ts = 342122630006
    var d = '1980-11-04'
    var t = '02:03:50'
    var dt = d + ' ' + t
    var ms = '006'
    var dtms = dt + '.' + ms;

    describe('timestamp', function() {

      it('default', function() {
        expect(datetime(ts).format()).to.equal(dt)
      })

      it('isLeap', function() {
        expect(datetime(ts).isLeap()).to.equal(true)
        expect(datetime.isLeap(1980)).to.equal(true)
      })

      it('week', function() {
        expect(datetime(ts, 'EEEE').format()).to.equal('Tuesday')
        expect(datetime(ts, 'EEE').format()).to.equal('Tue')
        expect(datetime(ts, 'D').format()).to.equal('2')
      })

      it('year', function() {
        expect(datetime(ts, 'yyyy').format()).to.equal('1980')
        expect(datetime(ts, 'yy').format()).to.equal('80')
      })

      it('month', function() {
        expect(datetime(ts, 'MMMM').format()).to.equal('November')
        expect(datetime(ts, 'MMM').format()).to.equal('Nov')
        expect(datetime(ts, 'MM').format()).to.equal('11')
        expect(datetime(ts, 'M').format()).to.equal('11')
      })

      it('date', function() {
        expect(datetime(ts, 'dd').format()).to.equal('04')
        expect(datetime(ts, 'd').format()).to.equal('4')
      })

      it('hours', function() {
        expect(datetime(ts, 'hh').format()).to.equal('02')
        expect(datetime(ts, 'h').format()).to.equal('2')
      })

      it('minutes', function() {
        expect(datetime(ts, 'mm').format()).to.equal('03')
        expect(datetime(ts, 'm').format()).to.equal('3')
      })

      it('seconds', function() {
        expect(datetime(ts, 'ss').format()).to.equal('50')
        expect(datetime(ts, 's').format()).to.equal('50')
      })

      it('milliseconds', function() {
        expect(datetime(ts, 'ii').format()).to.equal(ms)
        expect(datetime(ts, 'i').format()).to.equal('6')
      })

    })

    describe('datetime', function() {

      it('default', function() {
        expect(datetime(dt).format()).to.equal(dt)
      })

      it('yyyy-MM-dd hh:mm:ss', function() {
        expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format()).to.equal(dt)
      })

      it('yyyy-MM-dd', function() {
        expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format('yyyy-MM-dd')).to.equal(d)
        expect(datetime(dt, 'yyyy-MM-dd').format()).to.equal(d)
        expect(datetime(d, 'yyyy-MM-dd hh:mm:ss').format('yyyy-MM-dd')).to.equal(d)
        expect(datetime(d, 'yyyy-MM-dd').format()).to.equal(d)
      })

      it('hh:mm:ss', function() {
        expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format('hh:mm:ss')).to.equal(t)
        expect(datetime(t, 'hh:mm:ss').format()).to.equal(t)
      })

      it('ii', function() {
        expect(datetime(ms, 'ii').format()).to.equal(ms)
      })

      it('toNumber()', function() {
        expect(datetime(dtms, 'yyyy-MM-dd hh:mm:ss.ii').toNumber()).to.equal(ts)
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
        expect(datetime(ts).format()).to.equal(dt)
      })

      it('isLeap', function() {
        expect(datetime(ts).isLeap()).to.equal(false)
        expect(datetime.isLeap(2015)).to.equal(false)
      })

      it('yyyy-MM-dd hh:mm:ss', function() {
        expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format()).to.equal(dt)
      })

      it('week', function() {
        expect(datetime(ts, 'EEEE').format()).to.equal('Friday')
        expect(datetime(ts, 'EEE').format()).to.equal('Fri')
        expect(datetime(ts, 'D').format()).to.equal('5')
      })

      it('year', function() {
        expect(datetime(ts, 'yyyy').format()).to.equal('2015')
        expect(datetime(ts, 'yy').format()).to.equal('115')
      })

      it('month', function() {
        expect(datetime(ts, 'MMMM').format()).to.equal('April')
        expect(datetime(ts, 'MMM').format()).to.equal('Apr')
        expect(datetime(ts, 'MM').format()).to.equal('04')
        expect(datetime(ts, 'M').format()).to.equal('4')
      })

      it('date', function() {
        expect(datetime(ts, 'dd').format()).to.equal('10')
        expect(datetime(ts, 'd').format()).to.equal('10')
      })

      it('hours', function() {
        expect(datetime(ts, 'hh').format()).to.equal('14')
        expect(datetime(ts, 'h').format()).to.equal('14')
      })

      it('minutes', function() {
        expect(datetime(ts, 'mm').format()).to.equal('43')
        expect(datetime(ts, 'm').format()).to.equal('43')
      })

      it('seconds', function() {
        expect(datetime(ts, 'ss').format()).to.equal('05')
        expect(datetime(ts, 's').format()).to.equal('5')
      })

      it('milliseconds', function() {
        expect(datetime(ts, 'ii').format()).to.equal(ms)
        expect(datetime(ts, 'i').format()).to.equal(ms)
      })

    })

    describe('datetime', function() {

      it('yyyy-MM-dd hh:mm:ss', function() {
        expect(datetime(dt, 'yyyy-MM-dd hh:mm:ss').format()).to.equal(dt)
      })

      it('yyyy-MM-dd', function() {
        expect(datetime(d, 'yyyy-MM-dd').format()).to.equal(d)
      })

      it('hh:mm:ss', function() {
        expect(datetime(t, 'hh:mm:ss').format()).to.equal(t)
      })

      it('ii', function() {
        expect(datetime(ms, 'ii').format()).to.equal(ms)
      })

      it('toNumber()', function() {
        expect(datetime(dtms, 'yyyy-MM-dd hh:mm:ss.ii').toNumber()).to.equal(ts)
      })

    })

    describe('dateobject', function() {

      var dobj = new Date(ts);

      it('yyyy-MM-dd hh:mm:ss', function() {
        expect(datetime(dobj, 'yyyy-MM-dd hh:mm:ss').format()).to.equal(dt)
      })

      it('yyyy-MM-dd', function() {
        expect(datetime(dobj, 'yyyy-MM-dd').format()).to.equal(d)
      })

      it('hh:mm:ss', function() {
        expect(datetime(dobj, 'hh:mm:ss').format()).to.equal(t)
      })

      it('ii', function() {
        expect(datetime(dobj, 'ii').format()).to.equal(ms)
      })

      it('toNumber()', function() {
        expect(datetime(dobj, 'yyyy-MM-dd hh:mm:ss.ii').toNumber()).to.equal(ts)
      })

      it('toString()', function() {
        expect(datetime(dobj, 'yyyy-MM-dd hh:mm:ss.ii').toString()).to.equal(dtms)
      })

    })

  })

})

describe('modify', function() {
  var val = '2015-04-22T02:32:27.068+0000';

  describe('add', function() {

    it('year', function() {
      expect(datetime(val).add('y', 1).format('yyyy')).to.equal('2016')
    })

    it('month', function() {
      expect(datetime(val).add('M', 1).format('M')).to.equal('5')
    })

    it('date', function() {
      expect(datetime(val).add('d', 1).format('d')).to.equal('23')
    })

    it('hours', function() {
      expect(datetime(val).add('m', offset).add('h', 1).format('h')).to.equal('3')
    })

    it('minutes', function() {
      expect(datetime(val).add('m', 1).format('m')).to.equal('33')
    })

    it('seconds', function() {
      expect(datetime(val).add('s', 1).format('s')).to.equal('28')
    })

    it('milliseconds', function() {
      expect(datetime(val).add('i', 1).format('i')).to.equal('69')
    })

  })

})
