(function() {
  var connection, diff, doc, getDelta, init, sharedb, socket, stringDiff, toDom, toJson, _ref;

  sharedb = require('sharedb/lib/client');

  _ref = require('./domParse.coffee'), toJson = _ref.toJson, toDom = _ref.toDom;

  stringDiff = require('fast-diff');

  diff = (require('jsondiffpatch')).create();

  socket = new WebSocket('ws://localhost:8080');

  connection = new sharedb.Connection(socket);

  doc = connection.get('examples', 'counter');

  window.doc = doc;

  init = function() {
    doc.subscribe(function() {
      if (doc.data.data) {
        toDom(doc.data.data);
        return localStorage.setItem('article-init', JSON.stringify(doc.data.data));
      }
    });
    return doc.on('op', function(op, source) {
      return console.log(op[0]);
    });
  };

  getDelta = function(data, key) {
    var command, data2, delta, deltaData, itemDiff, k, obj, offset, strDiff, type, v, val, _results;
    data2 = JSON.stringify(data);
    delta = diff.diff(JSON.parse(localStorage.getItem('article-init')), data);
    if (delta) {
      localStorage.setItem('article-init', data2);
      deltaData = delta.data;
      console.log(deltaData);
      _results = [];
      for (k in deltaData) {
        v = deltaData[k];
        obj = {};
        obj[k] = v;
        if (Array.isArray(v)) {
          if (k[0] === '_') {
            k = (k.split('_'))[1];
          }
          command = {
            p: ['data', 'data', k]
          };
          if (v.length === 1) {
            command.li = v[0];
          } else {
            command.ld = v[0];
          }
          doc.submitOp(command);
        }
        if (v.type) {
          command = {
            p: ['data', 'data', k, 'type'],
            oi: v.type[1]
          };
          doc.submitOp(command);
        }
        if (v.center) {
          command = {
            p: ['data', 'data', k, 'center']
          };
          if (v.center.length === 1) {
            command.oi = v.center[0];
          } else {
            command.od = v.center[0];
          }
          doc.submitOp(command);
        }
        if (v.content) {
          if (v.content.length && v.content.length !== 2) {
            command = {
              p: ['data', 'data', k, 'content']
            };
            if (v.content.length === 1) {
              command.oi = v.content[0];
            } else {
              command.od = v.content[0];
            }
            _results.push(doc.submitOp(command));
          } else {
            strDiff = stringDiff(v.content[0], v.content[1]);
            offset = 0;
            _results.push((function() {
              var _i, _len, _results1;
              _results1 = [];
              for (_i = 0, _len = strDiff.length; _i < _len; _i++) {
                itemDiff = strDiff[_i];
                type = itemDiff[0];
                val = itemDiff[1];
                if (type === 0) {
                  _results1.push(offset += val.length);
                } else {
                  command = {};
                  if (type === 1) {
                    command = {
                      p: ['data', 'data', k, 'content', offset],
                      si: val
                    };
                    doc.submitOp(command);
                    _results1.push(offset += val.length);
                  } else if (type === -1) {
                    command = {
                      p: ['data', 'data', k, 'content', offset],
                      sd: val
                    };
                    _results1.push(doc.submitOp(command));
                  } else {
                    _results1.push(void 0);
                  }
                }
              }
              return _results1;
            })());
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  module.exports = {
    getDelta: getDelta,
    init: init
  };

}).call(this);
