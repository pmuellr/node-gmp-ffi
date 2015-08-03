// Licensed under the LGPL-v3 License. See footer for details.

var ffi       = require("ffi")
var ref       = require("ref")
var refStruct = require("ref-struct")

var mpz_t   = refStruct({
  _mp_alloc: "int",
  _mp_size:  "int",
  _mp_d:     "pointer"
})

var mpz_ptr = ref.refType(mpz_t)

var libgmp = ffi.Library("libgmp", {
  "__gmpz_init":    [ "void",  [ mpz_ptr ] ],
  "__gmpz_clear":   [ "void",  [ mpz_ptr ] ],
  "__gmpz_add":     [ "void",  [ mpz_ptr, mpz_ptr, mpz_ptr ] ],
  "__gmpz_get_ui":  [ "ulong", [ mpz_ptr ] ],
  "__gmpz_get_si":  [ "long",  [ mpz_ptr ] ],
  "__gmpz_set_ui":  [ "void",  [ mpz_ptr, "ulong" ] ],
  "__gmpz_set_si":  [ "void",  [ mpz_ptr, "long" ] ],
})

//------------------------------------------------------------------------------
function mpz(init) {
  if (!(this instanceof mpz)) return new mpz(init)

  this.mpzPtr = ref.alloc(mpz_t)
  this.init()

  if (init) this.set_si(init)
}

//------------------------------------------------------------------------------
mpz.from_ui = function mpz_from_ui(ui) {
  var result = new mpz()
  result.set_ui(ui)
  return result
}

//------------------------------------------------------------------------------
mpz.from_si = function mpz_from_si(si) {
  var result = new mpz()
  result.set_si(si)
  return result
}

//------------------------------------------------------------------------------
mpz.prototype.init = function mpz_init() {
  libgmp.__gmpz_init(this.mpzPtr)
  return this
}

//------------------------------------------------------------------------------
mpz.prototype.clear = function mpz_clear() {
  libgmp.__gmpz_clear(this.mpzPtr)
}

//------------------------------------------------------------------------------
mpz.prototype.get_ui = function mpz_get_ui() {
  return libgmp.__gmpz_get_ui(this.mpzPtr)
}

//------------------------------------------------------------------------------
mpz.prototype.get_si = function mpz_get_si() {
  return libgmp.__gmpz_get_si(this.mpzPtr)
}

//------------------------------------------------------------------------------
mpz.prototype.set_ui = function mpz_set_ui(ulong) {
  libgmp.__gmpz_set_ui(this.mpzPtr, ulong)
  return this
}

//------------------------------------------------------------------------------
mpz.prototype.set_si = function mpz_set_si(long) {
  libgmp.__gmpz_set_si(this.mpzPtr, long)
  return this
}

//------------------------------------------------------------------------------
mpz.prototype.add = function mpz_add(mpzOther, mpzResult) {
  if (!mpzResult) mpzResult = new mpz()

  libgmp.__gmpz_add(mpzResult.mpzPtr, this.mpzPtr, mpzOther.mpzPtr)

  return mpzResult
}

//------------------------------------------------------------------------------
function basic_test() {
  var num1 = mpz(1)
  var num2 = mpz(2)
  var num3 = mpz()

  num1.add(num2, num3)

  var val = num3.get_ui()

  console.log("1 + 2 =", val)

  num1.clear()
  num2.clear()
  num3.clear()
}

//------------------------------------------------------------------------------
function basic_basic_test() {
  var num1 = ref.alloc(mpz_t)
  var num2 = ref.alloc(mpz_t)
  var num3 = ref.alloc(mpz_t)

  libgmp.__gmpz_init(num1)
  libgmp.__gmpz_init(num2)
  libgmp.__gmpz_init(num3)

  libgmp.__gmpz_set_ui(num1, 1)
  libgmp.__gmpz_set_ui(num2, 2)

  libgmp.__gmpz_add(num3, num1, num2)

  var val = libgmp.__gmpz_get_ui(num3)

  console.log("1 + 2 =", val)

  libgmp.__gmpz_clear(num1)
  libgmp.__gmpz_clear(num2)
  libgmp.__gmpz_clear(num3)
}

if (require.main == module) basic_test()

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
