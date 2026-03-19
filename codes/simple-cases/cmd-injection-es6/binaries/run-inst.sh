npm install
cp -r ../../test-utils/jalangi3 node_modules

node \
        --require /analysis/codes/simple-cases/cmd-injection-inst/node_modules/jalangi3/src/bootstrap.js \
        --require /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
        src/app.js
