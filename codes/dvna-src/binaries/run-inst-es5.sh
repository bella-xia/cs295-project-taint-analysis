cp ../../test-utils/bootstrap.js node_modules/jalangi2/src/js/

node \
	--require /analysis/codes/dvna-src/dvna-es5-inst/node_modules/jalangi2/src/js/bootstrap.js \
	--require /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
	server.js
