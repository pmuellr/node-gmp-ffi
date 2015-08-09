// Licensed under the LGPL-v3 License. See footer for details.

var ref   = require("ref")

var gmp   = require("./gmp")
var types = require("./types")

//------------------------------------------------------------------------------
exports.cla$$ = Rational

//------------------------------------------------------------------------------
function Rational(value, opt) {
  if (null == value) value = 0
  if (!(this instanceof Rational)) return new Rational(value, opt)

  this.mpq = gmp.mpqAlloc()
  gmp.mpq_init(this.mpq)

  var valueType = types.getType(value)

  switch(valueType) {
    case "Integer":  gmp.mpq_set_z(  this.mpq, value.mpz); break
    case "Rational": gmp.mpq_set(    this.mpq, value.mpq); break

    case "Number":
    case "Float":
      var tmpInteger = types.Integer.cla$$(value)
      gmp.mpq_set_z(this.mpq, tmpInteger.mpz)
      tmpInteger.dispose()
      break

    case "String":
      if (getType(opt) == null) opt = 10
      if (getType(opt) != "Number") throw gmp.E("invalid base: " + opt)

      var rc = gmp.mpq_set_str(this.mpq, value, opt)
      if (rc != 0) throw gmp.E("invalid number: " + value + " for base: " + opt)
      break


    default:
      throw gmp.E("unable to use initializer value: " + value)
  }
}

//------------------------------------------------------------------------------
Rational.prototype.dispose = function Rational_dispose() {
  gmp.mpq_clear(this.mpq)
}

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
