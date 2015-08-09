// Licensed under the LGPL-v3 License. See footer for details.

var gmp = require("..")

var test = require('tape')

//------------------------------------------------------------------------------
test("Integer create", function(t) {
  var obj
  var arg

  obj = gmp.Integer()
  t.equal(obj.toString(), "0", "test no arg")
  obj.dispose()

  obj = gmp.Integer(42)
  t.equal(obj.toString(), "42", "test JS number arg")
  obj.dispose()

  arg = gmp.Integer(42)
  obj = gmp.Integer(arg)
  t.equal(obj.toString(), "42", "test Integer number arg")
  obj.dispose()
  arg.dispose()

  arg = gmp.Rational(42)
  obj = gmp.Integer(arg)
  t.equal(obj.toString(), "42", "test Rational number arg")
  obj.dispose()
  arg.dispose()

  arg = gmp.Float(42)
  obj = gmp.Integer(arg)
  t.equal(obj.toString(), "42", "test Float number arg")
  obj.dispose()
  arg.dispose()

  arg = "42"
  obj = gmp.Integer(arg)
  t.equal(obj.toString(), "42", "test string number arg")
  obj.dispose()

  t.end()
})

//------------------------------------------------------------------------------
test("Integer add", function(t) {
  var obj
  var arg
  var result

  obj = gmp.Integer(40)
  arg = 2
  result = obj.add(arg)
  t.equal(result.toString(), "42", "test JS number arg")
  obj.dispose()
  result.dispose()

  obj = gmp.Integer(40)
  arg = gmp.Integer(2)
  result = obj.add(arg)
  t.equal(result.toString(), "42", "test Integer arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(40)
  arg = gmp.Rational(2)
  result = obj.add(arg)
  t.equal(result.toString(), "42", "test Rational arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(40)
  arg = gmp.Float(2)
  result = obj.add(arg)
  t.equal(result.toString(), "42", "test Float arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  t.end()
})

//------------------------------------------------------------------------------
test("Integer sub", function(t) {
  var obj
  var arg
  var result

  obj = gmp.Integer(44)
  arg = 2
  result = obj.sub(arg)
  t.equal(result.toString(), "42", "test JS number arg")
  obj.dispose()
  result.dispose()

  obj = gmp.Integer(44)
  arg = gmp.Integer(2)
  result = obj.sub(arg)
  t.equal(result.toString(), "42", "test Integer arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(44)
  arg = gmp.Rational(2)
  result = obj.sub(arg)
  t.equal(result.toString(), "42", "test Rational arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(44)
  arg = gmp.Float(2)
  result = obj.sub(arg)
  t.equal(result.toString(), "42", "test Float arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  t.end()
})

//------------------------------------------------------------------------------
test("Integer mul", function(t) {
  var obj
  var arg
  var result

  obj = gmp.Integer(21)
  arg = 2
  result = obj.mul(arg)
  t.equal(result.toString(), "42", "test JS number arg")
  obj.dispose()
  result.dispose()

  obj = gmp.Integer(21)
  arg = gmp.Integer(2)
  result = obj.mul(arg)
  t.equal(result.toString(), "42", "test Integer arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(21)
  arg = gmp.Rational(2)
  result = obj.mul(arg)
  t.equal(result.toString(), "42", "test Rational arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(21)
  arg = gmp.Float(2)
  result = obj.mul(arg)
  t.equal(result.toString(), "42", "test Float arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  t.end()
})

//------------------------------------------------------------------------------
test("Integer div", function(t) {
  var obj
  var arg
  var result

  obj = gmp.Integer(84)
  arg = 2
  result = obj.div(arg)
  t.equal(result.toString(), "42", "test JS number arg")
  obj.dispose()
  result.dispose()

  obj = gmp.Integer(84)
  arg = gmp.Integer(2)
  result = obj.div(arg)
  t.equal(result.toString(), "42", "test Integer arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(84)
  arg = gmp.Rational(2)
  result = obj.div(arg)
  t.equal(result.toString(), "42", "test Rational arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  obj = gmp.Integer(84)
  arg = gmp.Float(2)
  result = obj.div(arg)
  t.equal(result.toString(), "42", "test Float arg")
  obj.dispose()
  arg.dispose()
  result.dispose()

  t.end()
})

//------------------------------------------------------------------------------
test("factorial test", function(t){
  var expected = "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"
  var fact100  = factorial(100)
  var actual   = fact100.toString()

  fact100.dispose()

  t.equal(actual, expected)
  t.end()
})

//------------------------------------------------------------------------------
function factorial(n) {
  var result = gmp.Integer(1)
  var tmp
  var iNum

  for (var i=2; i<=n; i++) {
    iNum = gmp.Integer(i)

    tmp = result.mul(iNum)

    iNum.dispose()
    result.dispose()

    result = tmp
  }

  return result
}

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
