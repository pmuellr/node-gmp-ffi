# Licensed under the LGPL-v3 License. See footer for details.

#-------------------------------------------------------------------------------
# assumes you have `wget` installed - for Mac, `brew install wget`
# assumes you have `unxz` installed - for Mac, `brew install xz`
#-------------------------------------------------------------------------------

GMP_VERSION      = 6.0.0
GMP_VERSION_FULL = 6.0.0a
GMP_DIR          = gmp-$(GMP_VERSION)

#-------------------------------------------------------------------------------
help:
		@echo "targets for Make:"
		@echo ""
		@echo "gmp-src    - gets the gmp source"
		@echo "darwin-x64 - builds the darwin x64 version of the shared library"

#-------------------------------------------------------------------------------
gmp-src:
		wget https://gmplib.org/download/gmp/gmp-$(GMP_VERSION_FULL).tar.xz
		unxz < gmp-$(GMP_VERSION_FULL).tar.xz > gmp-$(GMP_VERSION_FULL).tar
		tar xf gmp-$(GMP_VERSION_FULL).tar
		rm gmp-$(GMP_VERSION_FULL).tar
		rm gmp-$(GMP_VERSION_FULL).tar.xz

#-------------------------------------------------------------------------------
darwin-x64:
		cd gmp-$(GMP_VERSION); ./configure; make
		cp gmp-$(GMP_VERSION)/.libs/libgmp.dylib shared-lib/darwin-x64
		cd gmp-$(GMP_VERSION); make clean

#-------------------------------------------------------------------------------
# Licensed under the GNU Lesser General Public License, Version 3
# See the LICENSE file for more information.
#-------------------------------------------------------------------------------
