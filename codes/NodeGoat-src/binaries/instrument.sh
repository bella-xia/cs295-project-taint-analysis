mkdir node_modules
cp -r ../../test-utils/jalangi3 node_modules

node node_modules/jalangi3/src/commands/instrument.js \
	--only_include "app:config:server.js" \
	--analysis /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
	--outputDir /analysis/codes/NodeGoat-src/NodeGoat-es6-inst \
	/analysis/codes/NodeGoat-src/NodeGoat

cd ../NodeGoat-es6-inst 
cp -r NodeGoat/* .
rm -rf NodeGoat

