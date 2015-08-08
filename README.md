node interface to the GNU Multiple Precision Arithmetic Library
================================================================================

This package provides a multiple precision arithmetic library for node,
implemented on top of the
[GNU Multiple Precision Arithmetic Library](https://gmplib.org/).


module exports
================================================================================

`mpz`
--------------------------------------------------------------------------------

The `mpz` export is a function which can be used as a constructor or invoked
as a function (which will invoke the constructor), to create an `mpz` object.

An `mpz` object has the following methods:

* `mpz_init()`
* `mpz_clear()`
* `mpz_get_ui()`
* `mpz_get_si()`
* `mpz_set_ui(ulong)`
* `mpz_set_si(long)`
* `mpz_add(mpzOther, mpzResult)`
* `mpz_mul(mpzOther, mpzResult)`
* `mpz_toString(base)`


rebuild
================================================================================

To rebuild the shared libraries, you'll need to:

* download the source
* invoke the appropriate Makefile target

To download the source, you can use the Makefile target `gmp-src`:

    make gmp-src

The shared libraries built from the gmp source are all stored as the expected
shared library file name, in a directory based on the os name and architecture.

The following line, when executed in a terminal, will print the expected
directory name containing the shared library:

    node -e 'os = require("os"); console.log(os.platform()+"-"+os.arch())'



license
================================================================================

This package is licensed under the GNU LESSER GENERAL PUBLIC LICENSE, version 3.

See the LICENSE file for more information
