/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
        this.getPieces = function(input) {
                let regex = /[^(\d|\.|/)]/;
                let index = input.search(regex);
                let number = input.substring(0, index);
                let unit = input.substring(index);
                return {number, unit};
        }

        this.getNumberFromString = function(input) {
                let result;
                let numberOfPieces = input.split(".").length;
                if (numberOfPieces > 2) {
                        result = "invalid number";
                } else if (numberOfPieces == 2) {
                        result = parseFloat(input);
                } else {
                        result = parseInt(input);
                }

                return result;
        }

        this.getNum = function(input) {
                let result;
                let numberString = this.getPieces(input).number;
                let factors = numberString.split("/");
                if (numberString.length == 0) {
                        result = 1;
                } else if (factors.length > 2) {
                        result = "invalid number";
                } else if (factors.length == 1) {
                        result = this.getNumberFromString(numberString);
                } else {
                        let firstNumber = this.getNumberFromString(factors[0]);
                        let secondNumber = this.getNumberFromString(factors[1]);
                        if (firstNumber == "invalid number" || secondNumber == "invalidNumber") {
                                result = "invalid number";
                        } else if (secondNumber == 0) {
                                result = "invalid number";
                        } else {
                                result = firstNumber / secondNumber;
                        }
                }

                return result;
        };

  
        this.getUnit = function(input) {
                let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
                let result;
                let unitString = this.getPieces(input).unit;
                if (validUnits.includes(unitString)) {
                        result = unitString.toLowerCase()
                } else {
                        result = 'invalid unit';
                }

                return result;
        };

        this.getReturnUnit = function(initUnit) {
                let result;
                switch(initUnit) {
                        case 'gal':
                                result = 'l';
                                break;
                        case 'l':
                                result = 'gal';
                                break;
                        case 'mi':
                                result = 'km';
                                break;
                        case 'km':
                                result = 'mi';
                                break;
                        case 'lbs':
                                result = 'kg';
                                break;
                        case 'kg':
                                result = 'lbs';
                                break;
                }
                // let unitMap = {'gal': 'l', 'l': 'gal', 'mi': 'km', 'km': 'mi', 'lbs': 'kg', 'kg': 'lbs'};
                return result;
        };

        this.spellOutUnit = function(unit) {
                var result;
                switch(unit) {
                        case 'gal':
                                result = 'gallons';
                                break;
                        case 'l':
                                result = 'liters';
                                break;
                        case 'mi':
                                result = 'miles';
                                break;
                        case 'km':
                                result = 'kilometers';
                                break;
                        case 'lbs':
                                result = 'pounds';
                                break;
                        case 'kg':
                                result = 'kilograms';
                                break;
                }
                return result;
        };
  
        this.convert = function(initNum, initUnit) {
                const galToL = 3.78541;
                const lbsToKg = 0.453592;
                const miToKm = 1.60934;
                let result;
                switch(initUnit) {
                        case 'gal':
                                result = initNum * galToL;
                                break;
                        case 'l':
                                result = initNum / galToL;
                                break;
                        case 'mi':
                                result = initNum * miToKm;
                                break;
                        case 'km':
                                result = initNum / miToKm;
                                break;
                        case 'lbs':
                                result = initNum * lbsToKg;
                                break;
                        case 'kg':
                                result = initNum / lbsToKg;
                                break;
                }
                return result;
        };
  
        this.getString = function(initNum, initUnit, returnNum, returnUnit) {
                let roundedReturn = returnNum.toFixed(5);
                let longInitUnit = this.spellOutUnit(initUnit);
                if (initNum == 1) {
                        longInitUnit = longInitUnit.substring(0, longInitUnit.length - 1);
                }
          
                let longReturnUnit = this.spellOutUnit(returnUnit)
                let result = `${initNum} ${longInitUnit} converts to ${roundedReturn} ${longReturnUnit}`;
                return result;
        };
}

module.exports = ConvertHandler;
