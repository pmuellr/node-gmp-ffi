// Licensed under the LGPL-v3 License. See footer for details.

var os   = require("os")
var path = require("path")

var ffi       = require("ffi")
var ref       = require("ref")
var refStruct = require("ref-struct")

var debug = require("debug")
var D     = debug("gmp")

//------------------------------------------------------------------------------
function setExports() {
  exports.mpz = mpz
}

//------------------------------------------------------------------------------
var mpz_t   = refStruct({
  _mp_alloc: "int",
  _mp_size:  "int",
  _mp_d:     "pointer"
})

var mpz_ptr = ref.refType(mpz_t)

//------------------------------------------------------------------------------
var platArch  = os.platform() + "-" + os.arch()
var sharedLib = path.join("shared-lib", platArch, "libgmp")

var libgmp = ffi.Library(sharedLib, {
  "__gmpz_init":       [ "void",    [ mpz_ptr ] ],
  "__gmpz_clear":      [ "void",    [ mpz_ptr ] ],
  "__gmpz_add":        [ "void",    [ mpz_ptr, mpz_ptr, mpz_ptr ] ],
  "__gmpz_sub":        [ "void",    [ mpz_ptr, mpz_ptr, mpz_ptr ] ],
  "__gmpz_mul":        [ "void",    [ mpz_ptr, mpz_ptr, mpz_ptr ] ],
  "__gmpz_get_ui":     [ "ulong",   [ mpz_ptr ] ],
  "__gmpz_get_si":     [ "long",    [ mpz_ptr ] ],
  "__gmpz_set_ui":     [ "void",    [ mpz_ptr, "ulong" ] ],
  "__gmpz_set_si":     [ "void",    [ mpz_ptr, "long" ] ],
  "__gmpz_get_str":    [ "string",  [ "pointer", "int", mpz_ptr ] ],
  "__gmpz_sizeinbase": [ "size_t",  [ mpz_ptr, "int"  ] ],
})

for (var key in libgmp) {
  if (key.match(/^__gmpz_/)) libgmp[key.slice(3)] = libgmp[key]
}

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
  libgmp.mpz_init(this.mpzPtr)
  return this
}

//------------------------------------------------------------------------------
mpz.prototype.clear = function mpz_clear() {
  libgmp.mpz_clear(this.mpzPtr)
}

//------------------------------------------------------------------------------
mpz.prototype.get_ui = function mpz_get_ui() {
  return libgmp.mpz_get_ui(this.mpzPtr)
}

//------------------------------------------------------------------------------
mpz.prototype.get_si = function mpz_get_si() {
  return libgmp.mpz_get_si(this.mpzPtr)
}

//------------------------------------------------------------------------------
mpz.prototype.set_ui = function mpz_set_ui(ulong) {
  libgmp.mpz_set_ui(this.mpzPtr, ulong)
  return this
}

//------------------------------------------------------------------------------
mpz.prototype.set_si = function mpz_set_si(long) {
  libgmp.mpz_set_si(this.mpzPtr, long)
  return this
}

//------------------------------------------------------------------------------
mpz.prototype.add = function mpz_add(mpzOther, mpzResult) {
  if (!mpzResult) mpzResult = new mpz()

  libgmp.mpz_add(mpzResult.mpzPtr, this.mpzPtr, mpzOther.mpzPtr)

  return mpzResult
}

//------------------------------------------------------------------------------
mpz.prototype.mul = function mpz_mul(mpzOther, mpzResult) {
  if (!mpzResult) mpzResult = new mpz()

  libgmp.mpz_mul(mpzResult.mpzPtr, this.mpzPtr, mpzOther.mpzPtr)

  return mpzResult
}

//------------------------------------------------------------------------------
mpz.prototype.toString = function mpz_toString(base) {
  D("mpz::toString " + this.get_ui())

  if (!base) base = 10
  D("   base: " + base)

  var size = 2 + libgmp.mpz_sizeinbase(this.mpzPtr, base)
  D("   size: " + size)

  var buf = new Buffer(size)

  var result = libgmp.mpz_get_str(buf, base, this.mpzPtr)
  D("   buff: 0x" + buf.toString("hex"))

  return result
}

//------------------------------------------------------------------------------
setExports()

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
