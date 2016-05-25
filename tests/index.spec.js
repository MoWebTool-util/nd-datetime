'use strict';

var expect = require('chai').expect
var datetime = require('../index')

var DAY_NAMES = datetime.DAY_NAMES
var DAY_NAMES_ABBR = datetime.DAY_NAMES_ABBR

function zeroPad(m, n) {
  n || (n = 2);
  m = '' + m;
  n -= m.length;

  while (n--) {
    m = '0' + m;
  }

  return m;
}

/*globals describe, it*/

describe('parse', function() {

  describe('date', function() {
    it('is 00', function() {
      expect(datetime('2016-05-00').d()).to.equal(30)
    })
  })

  describe('1970', function() {
    var fmt = 'yyyy'
    it(fmt, function() {
      var inst = datetime(null)
      expect(inst.format(fmt)).to.equal(inst.zone() <= 0 ? '1970' : '1969')
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
      var inst = datetime(val)
      expect(inst.add('m', inst.zone()).format()).to.equal(res)
    })
  })

  describe('function', function() {
    it('new Date(val)', function() {
      var inst = datetime(function() {
        return datetime(val).toDate()
      })
      expect(inst.add('m', inst.zone()).format()).to.equal(res)
    })
  })

})

describe('format', function() {

  describe('0', function() {
    var val = '2015-04-22T02:32:27.068+0000';
    it('ABC is skipped and preserved', function() {
      expect(datetime(val).format('AByyyyC')).to.equal('AB2015C')
    })

    it('115-04-22 is 2015-04-22', function() {
      expect(datetime('115-04-22', 'yyyy-MM-dd').format()).to.equal('2015-04-22')
    })

    it('2015-04-00 is 2015-03-31', function() {
      expect(datetime('2015-04-00', 'yyyy-MM-dd').format()).to.equal('2015-03-31')
    })

    it('2015-04-0 is 2015-03-31', function() {
      expect(datetime('2015-04-0', 'yyyy-MM-dd').format()).to.equal('2015-03-31')
    })

    it('2015-04-1 is 2015-04-01', function() {
      expect(datetime('2015-04-1', 'yyyy-MM-dd').format()).to.equal('2015-04-01')
    })

    it('2015-00-01 is 2014-12-01', function() {
      expect(datetime('2015-00-01', 'yyyy-MM-dd').format()).to.equal('2014-12-01')
    })

    it('2015-0-01 is 2014-12-01', function() {
      expect(datetime('2015-0-01', 'yyyy-MM-dd').format()).to.equal('2014-12-01')
    })

    it('2015-18-01 is 2016-06-01', function() {
      expect(datetime('2015-18-01', 'yyyy-MM-dd').format()).to.equal('2016-06-01')
    })
  })

  describe('1', function() {

    // 1980-11-03T18:00:00.000Z
    var ts = 342122400006
    var d = '1980-11-03'
    var t = '18:00:00'
    var dt = d + ' ' + t
    var ms = '006'
    var dtms = dt + '.' + ms;

    describe('timestamp', function() {

      it('default', function() {
        var inst = datetime(ts)
        expect(inst.add('m', inst.zone()).format()).to.equal(dt)
      })

      it('isLeap', function() {
        expect(datetime(ts).isLeap()).to.equal(true)
        expect(datetime.isLeap(1980)).to.equal(true)
        expect(datetime.isLeap(2000)).to.equal(true)
      })

      it('week', function() {
        var inst = datetime(ts)
        var index = inst.zone() <= -360 ? 2 : 1
        expect(inst.format('EEEE')).to.equal(DAY_NAMES[index])
        expect(inst.format('EEE')).to.equal(DAY_NAMES_ABBR[index])
        expect(inst.format('EE')).to.equal('')
        expect(inst.format('E')).to.equal('')
        expect(inst.format('D')).to.equal('' + index)
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
        var inst = datetime(ts)
        var date = inst.zone() <= -360 ? 4 : 3
        expect(inst.format('dd')).to.equal(zeroPad(date))
        expect(inst.format('d')).to.equal('' + date)
      })

      it('hours', function() {
        var inst = datetime(ts)
        var hours = (18 + (-inst.zone() / 60)) % 24
        expect(inst.format('hh')).to.equal(zeroPad(hours))
        expect(inst.format('h')).to.equal('' + hours)
      })

      it('minutes', function() {
        expect(datetime(ts, 'mm').format()).to.equal('00')
        expect(datetime(ts, 'm').format()).to.equal('0')
      })

      it('seconds', function() {
        expect(datetime(ts, 'ss').format()).to.equal('00')
        expect(datetime(ts, 's').format()).to.equal('0')
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
        var inst = datetime(dtms, 'yyyy-MM-dd hh:mm:ss.ii')
        expect(inst.add('m', -inst.zone()).toNumber()).to.equal(ts)
      })

    })

  })

})

describe('modify', function() {
  var val = '2015-04-22T02:32:27.068+0000';
  var dt = datetime(val)

  describe('add', function() {

    it('year', function() {
      expect(dt.add('y', 1).format('yyyy')).to.equal('2016')
    })

    it('month', function() {
      expect(dt.add('M', 1).format('M')).to.equal('5')
    })

    it('date', function() {
      var d = dt.zone() / 60 > 2 ? 22 : 23;
      expect(dt.add('d', 1).format('d')).to.equal('' + d)
    })

    it('hours', function() {
      var h = (26 - dt.zone() / 60 + 1) % 24
      expect(dt.add('h', 1).format('h')).to.equal('' + h)
    })

    it('minutes', function() {
      expect(dt.add('m', 1).format('m')).to.equal('33')
    })

    it('seconds', function() {
      expect(dt.add('s', 1).format('s')).to.equal('28')
    })

    it('milliseconds', function() {
      expect(dt.add('i', 1).format('i')).to.equal('69')
    })

  })

})
