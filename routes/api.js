/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      if (initNum == 'invalid number') {
          if (initUnit == 'invalid unit') {
                  res.send('invalid number and unit');
            return;
          }

          res.send('invalid number');
        return;
      }

      if (initUnit == 'invalid unit') {
              res.send('invalid unit');
        return;
      }
    
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      initUnit = initUnit == 'l' ? 'L' : initUnit;
      returnUnit = returnUnit == 'l' ? 'L' : returnUnit;
      res.json({initNum, initUnit, returnNum, returnUnit, string: toString});
    });
    
};