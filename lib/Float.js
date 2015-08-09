// Licensed under the LGPL-v3 License. See footer for details.

var ref   = require("ref")

var gmp   = require("./gmp")
var types = require("./types")

//------------------------------------------------------------------------------
exports.cla$$ = Float

//------------------------------------------------------------------------------
function Float(value, opt) {
  if (null == value) value = 0
  if (!(this instanceof Float)) return new Float(value, opt)

  this.mpf = gmp.mpfAlloc()
  gmp.mpf_init(this.mpf)

  var valueType = types.getType(value)

  switch(valueType) {
    case "Number":   gmp.mpf_set_d(  this.mpf, value); break
    case "Integer":  gmp.mpf_set_z(  this.mpf, value.mpz); break
    case "Rational": gmp.mpf_set_q(  this.mpf, value.mpq); break
    case "Float":    gmp.mpf_set(    this.mpf, value.mpf); break

    case "String":
      if (types.getType(opt) == null) opt = 10
      if (types.getType(opt) != "Number") throw gmp.E("invalid base: " + opt)

      var rc = gmp.mpf_set_str(this.mpf, value, opt)
      if (rc != 0) throw gmp.E("invalid number: " + value + " for base: " + opt)
      break

    default:
      throw gmp.E("unable to use initializer value: " + value)
  }
}

//------------------------------------------------------------------------------
Float.prototype.dispose = function Float_dispose() {
  gmp.mpf_clear(this.mpf)
}

//------------------------------------------------------------------------------
Float.prototype._basicOperation = function _basicOperation(name, operand) {
  var operand_ = Float(operand)
  var result = Float()

  gmp["mpf_" + name](result.mpf, this.mpf, operand_.mpf)

  operand_.dispose()

  return result
}

//------------------------------------------------------------------------------
Float.prototype.add = function FloatAdd(operand) {
  return this._basicOperation("add", operand)
}

//------------------------------------------------------------------------------
Float.prototype.sub = function FloatSub(operand) {
  return this._basicOperation("sub", operand)
}

//------------------------------------------------------------------------------
Float.prototype.mul = function FloatMul(operand) {
  return this._basicOperation("mul", operand)
}

//------------------------------------------------------------------------------
Float.prototype.div = function FloatDiv(operand) {
  return this._basicOperation("div", operand)
}

//------------------------------------------------------------------------------
Float.prototype.toString = function FloatToString() {
  return "" + gmp.mpf_get_d(this.mpf)
}

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
