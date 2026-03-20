npm install
npm install jalangi2

node node_modules/jalangi2/src/js/commands/instrument.js \
	--only_include "core:routes:config:server.js" \
	--exclude "app/assets" \
	--analysis /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
	--outputDir /analysis/codes/dvna-src/dvna-es5-inst \
	/analysis/codes/dvna-src/dvna-es5

cd ../dvna-es5-inst 
cp -r dvna-es5/* .
rm -rf dvna-es5
