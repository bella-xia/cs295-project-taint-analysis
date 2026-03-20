mkdir node_modules
cp -r ../../test-utils/jalangi3 node_modules

node node_modules/jalangi3/src/commands/instrument.js \
	--only_include "core:routes:config:server.js" \
	--analysis /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
	--outputDir /analysis/codes/dvna-src/dvna-es6-inst \
	/analysis/codes/dvna-src/dvna

cd ../dvna-es6-inst 
cp -r dvna/* .
rm -rf dvna

