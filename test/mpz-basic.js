// Licensed under the LGPL-v3 License. See footer for details.

var gmp = require("..")

var test = require('tape')

//------------------------------------------------------------------------------
test("add", function(t) {
  var num1 = gmp.mpz(1)
  var num2 = gmp.mpz(2)
  var num3 = gmp.mpz()

  num1.add(num2, num3)

  var numr = num1.add(num2)

  t.equal(num3.get_ui(), 3)
  t.equal(numr.get_ui(), 3)

  num1.clear()
  num2.clear()
  num3.clear()
  numr.clear()

  t.end()
})

//------------------------------------------------------------------------------
test("mul", function(t) {
  var num2 = gmp.mpz(2)
  var num3 = gmp.mpz(3)
  var num6 = gmp.mpz()

  num2.mul(num3, num6)

  var numr = num2.mul(num3)

  t.equal(num6.get_ui(), 6)
  t.equal(numr.get_ui(), 6)

  num2.clear()
  num3.clear()
  num6.clear()
  numr.clear()

  t.end()
})

//------------------------------------------------------------------------------
test("factorial test", function(t){
  var expected = "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"
  var fact100  = factorial(100)
  var actual   = fact100.toString()

  fact100.clear()

  t.equal(actual, expected)
  t.end()
})

//------------------------------------------------------------------------------
function factorial(n) {
  var result = gmp.mpz(1)
  var impz   = gmp.mpz()

  for (var i=2; i<=n; i++) {
    impz.set_ui(i)
    result.mul(impz, result)
  }

  impz.clear()

  return result
}

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
