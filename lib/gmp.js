// Licensed under the LGPL-v3 License. See footer for details.

var os   = require("os")
var path = require("path")

var _ = require("lodash")

var debug = require("debug")
var D     = debug("gmp")

var ffi       = require("ffi")
var ref       = require("ref")
var refStruct = require("ref-struct")

var Integer  = require("./Integer").cla$$
var Rational = require("./Rational").cla$$
var Float    = require("./Float").cla$$

//------------------------------------------------------------------------------
exports.mpz   = refStruct({
  _mp_alloc: "int",
  _mp_size:  "int",
  _mp_d:     "pointer"
})

exports.mpq = refStruct({
  _mp_num: exports.mpz,
  _mp_den: exports.mpz
})

exports.mpf = refStruct({
  _mp_prec: "int",
  _mp_size: "int",
  _mp_exp:  "long",
  _mp_d:    "pointer"
})

exports.mpzAlloc = function mpzAlloc() { return ref.alloc(exports.mpz) }
exports.mpqAlloc = function mpqAlloc() { return ref.alloc(exports.mpq) }
exports.mpfAlloc = function mpfAlloc() { return ref.alloc(exports.mpf) }

//------------------------------------------------------------------------------
var mpz$ = ref.refType(exports.mpz)
var mpq$ = ref.refType(exports.mpq)
var mpf$ = ref.refType(exports.mpf)

//------------------------------------------------------------------------------
var platArch  = os.platform() + "-" + os.arch()
var sharedLib = path.join("shared-lib", platArch, "libgmp")

var functionDefs = {
  "mpz_init":       [ "void",    [ mpz$ ] ],
  "mpz_clear":      [ "void",    [ mpz$ ] ],
  "mpz_set":        [ "void",    [ mpz$, mpz$ ] ],
  "mpz_set_d":      [ "void",    [ mpz$, "double" ] ],
  "mpz_set_q":      [ "void",    [ mpz$, mpq$ ] ],
  "mpz_set_f":      [ "void",    [ mpz$, mpf$ ] ],
  "mpz_set_str":    [ "int",     [ mpz$, "string", "int" ] ],
  "mpz_add":        [ "void",    [ mpz$, mpz$, mpz$ ] ],
  "mpz_sub":        [ "void",    [ mpz$, mpz$, mpz$ ] ],
  "mpz_mul":        [ "void",    [ mpz$, mpz$, mpz$ ] ],
  "mpz_get_ui":     [ "ulong",   [ mpz$ ] ],
  "mpz_get_si":     [ "long",    [ mpz$ ] ],
  "mpz_get_str":    [ "string",  [ "pointer", "int", mpz$ ] ],
  "mpz_sizeinbase": [ "size_t",  [ mpz$, "int"  ] ],

  "mpq_init":       [ "void",    [ mpq$ ] ],
  "mpq_clear":      [ "void",    [ mpq$ ] ],
  "mpq_set":        [ "void",    [ mpq$, mpq$ ] ],
  "mpf_set_d":      [ "void",    [ mpq$, "double" ] ],
  "mpq_set_z":      [ "void",    [ mpq$, mpz$ ] ],
  "mpq_set_f":      [ "void",    [ mpq$, mpf$ ] ],
  "mpq_set_str":    [ "int",     [ mpq$, "string", "int" ] ],
  "mpq_add":        [ "void",    [ mpq$, mpq$, mpq$ ] ],
  "mpq_sub":        [ "void",    [ mpq$, mpq$, mpq$ ] ],
  "mpq_mul":        [ "void",    [ mpq$, mpq$, mpq$ ] ],
  "mpq_div":        [ "void",    [ mpq$, mpq$, mpq$ ] ],
  "mpq_get_num":    [ "void",    [ mpq$, mpq$ ] ],
  "mpq_get_den":    [ "void",    [ mpq$, mpq$ ] ],
  "mpq_set_num":    [ "void",    [ mpq$, mpz$ ] ],
  "mpq_set_den":    [ "void",    [ mpq$, mpz$ ] ],

  "mpf_init":       [ "void",    [ mpf$ ] ],
  "mpf_clear":      [ "void",    [ mpf$ ] ],
  "mpf_set":        [ "void",    [ mpf$, mpq$ ] ],
  "mpf_set_d":      [ "void",    [ mpf$, "double" ] ],
  "mpf_set_z":      [ "void",    [ mpf$, mpz$ ] ],
  "mpf_set_q":      [ "void",    [ mpf$, mpq$ ] ],
  "mpf_set_str":    [ "int",     [ mpf$, "string", "int" ] ],
  "mpf_add":        [ "void",    [ mpf$, mpf$, mpf$ ] ],
  "mpf_sub":        [ "void",    [ mpf$, mpf$, mpf$ ] ],
  "mpf_mul":        [ "void",    [ mpf$, mpf$, mpf$ ] ],
  "mpf_div":        [ "void",    [ mpf$, mpf$, mpf$ ] ],
}

// will hold function defs we use with ffi.Library()
var ffiFunctions = {}

// add the function defs with __g prefix
for (var key in functionDefs) {
  var val = functionDefs[key]

  ffiFunctions["__g" + key] = val
}

// register the functions
var libgmp = ffi.Library(sharedLib, ffiFunctions)

// export the functions without the __g prefix
for (var key in functionDefs) {
  exports[key] = libgmp["__g" + key]
}

//------------------------------------------------------------------------------
exports.E = function E(message) {
  return new Exception(message)
}

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
