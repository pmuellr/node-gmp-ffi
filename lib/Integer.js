// Licensed under the LGPL-v3 License. See footer for details.

var ref   = require("ref")

var gmp   = require("./gmp")
var types = require("./types")

//------------------------------------------------------------------------------
exports.cla$$ = Integer

//------------------------------------------------------------------------------
function Integer(value, opt) {
  if (null == value) value = 0
  if (!(this instanceof Integer)) return new Integer(value, opt)

  this.mpz = gmp.mpzAlloc()
  gmp.mpz_init(this.mpz)

  var valueType = types.getType(value)

  switch(valueType) {
    case "Number":   gmp.mpz_set_d(  this.mpz, value); break
    case "Integer":  gmp.mpz_set(    this.mpz, value.mpz); break
    case "Rational": gmp.mpz_set_q(  this.mpz, value.mpq); break
    case "Float":    gmp.mpz_set_f(  this.mpz, value.mpf); break

    case "String":
      if (types.getType(opt) == null) opt = 10
      if (types.getType(opt) != "Number") throw gmp.E("invalid base: " + opt)

      var rc = gmp.mpz_set_str(this.mpz, value, opt)
      if (rc != 0) throw gmp.E("invalid number: " + value + " for base: " + opt)
      break

    default:
      throw gmp.E("unable to use initializer value: " + value)
  }
}

//------------------------------------------------------------------------------
Integer.prototype.dispose = function Integer_dispose() {
  gmp.mpz_clear(this.mpz)
}

//------------------------------------------------------------------------------
Integer.prototype._basicOperation = function Integer_basicOperation(name, operand) {
  var operand_ = Integer(operand)
  var result = Integer()

  gmp["mpz_" + name](result.mpz, this.mpz, operand_.mpz)

  operand_.dispose()

  return result
}

//------------------------------------------------------------------------------
Integer.prototype.add = function IntegerAdd(operand) {
  return this._basicOperation("add", operand)
}

//------------------------------------------------------------------------------
Integer.prototype.sub = function IntegerSub(operand) {
  return this._basicOperation("sub", operand)
}

//------------------------------------------------------------------------------
Integer.prototype.mul = function IntegerMul(operand) {
  return this._basicOperation("mul", operand)
}

//------------------------------------------------------------------------------
Integer.prototype.div = function IntegerDiv(operand) {
  return this._basicOperation("cdiv_q", operand)
}

//------------------------------------------------------------------------------
Integer.prototype.toString = function IntegerToString(base) {
  if (!base) base = 10

  var size = 2 + gmp.mpz_sizeinbase(this.mpz, base)

  var buf = new Buffer(size)

  return gmp.mpz_get_str(buf, base, this.mpz)
}
