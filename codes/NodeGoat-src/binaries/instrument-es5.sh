npm install
npm install jalangi2

node node_modules/jalangi2/src/js/commands/instrument.js \
	--only_include "app:config:server.js" \
	--analysis /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
	--outputDir /analysis/codes/NodeGoat-src/NodeGoat-es5-inst \
	/analysis/codes/NodeGoat-src/NodeGoat-es5

cd ../NodeGoat-es5-inst 
cp -r NodeGoat-es5/* .
rm -rf NodeGoat-es5

