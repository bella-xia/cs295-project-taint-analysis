mkdir node_modules
cp -r ../../test-utils/jalangi3 node_modules
node node_modules/jalangi3/src/commands/instrument.js \
        --only_include "src" \
        --analysis /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
        --outputDir /analysis/codes/simple-cases/cmd-injection-inst/ \
       /analysis/codes/simple-cases/cmd-injection-es6

cd ../cmd-injection-inst 
cp -r cmd-injection-es6/* .
rm -rf cmd-injection-es6

