cp -r ../../test-utils/jalangi3 node_modules

node \
        --require /analysis/codes/NodeGoat-src/NodeGoat-es6-inst/node_modules/jalangi3/src/bootstrap.js \
        --require /analysis/codes/test-utils/jalangi-instrument/strlit-naive.js \
        server.js
