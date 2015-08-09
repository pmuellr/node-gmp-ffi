// Licensed under the LGPL-v3 License. See footer for details.

var _ = require("lodash")

var Integer  = require("./Integer")
var Rational = require("./Rational")
var Float    = require("./Float")

exports.Integer  = Integer
exports.Rational = Rational
exports.Float    = Float

//------------------------------------------------------------------------------
exports.getType = function getType(o) {
  if (_.isNumber(o))    return "Number"
  if (_.isString(o))    return "String"

  if (o instanceof Integer.cla$$)  return "Integer"
  if (o instanceof Rational.cla$$) return "Rational"
  if (o instanceof Float.cla$$)    return "Float"

  return null
}

//------------------------------------------------------------------------------
exports.getArgType = function getArgType(o) {
  if (_.isNumber(o)) return "Number"

  if (o instanceof Integer.cla$$)  return "Integer"
  if (o instanceof Rational.cla$$) return "Rational"
  if (o instanceof Float.cla$$)    return "Float"

  return null
}

//------------------------------------------------------------------------------
exports.getResultType = function getResultType(o) {
  if (o instanceof Integer.cla$$)  return "Integer"
  if (o instanceof Rational.cla$$) return "Rational"
  if (o instanceof Float.cla$$)    return "Float"

  return null
}

//------------------------------------------------------------------------------
exports.newType = function newTyped(type, value) {
  if (type == "Integer")  return Integer.cla$$(value)
  if (type == "Rational") return Rational.cla$$(value)
  if (type == "Float")    return Float.cla$$(value)

  return null
}

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
