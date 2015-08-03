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
  "__gmpz_set_ui":  [ "void",  [ mpz_ptr, "ulong" ] ],
})

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

//------------------------------------------------------------------------------
// Licensed under the GNU Lesser General Public License, Version 3
// See the LICENSE file for more information.
//------------------------------------------------------------------------------
