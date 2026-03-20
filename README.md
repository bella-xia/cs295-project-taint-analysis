# cs295-project-taint-analysis

## Layout
```
codes/
  NodeGoat-src/           -> production level test case 1
    binaries/             -> binary executables for setting up NodeGoat
    NodeGoat/ (can be git cloned)

  dvna-src/               -> production level test case 2
    binaries/             -> binary executables for setting up dvna
    dvna/ (can be git cloned)

  simple-cases/
    cmd-injection/        -> basic testing
    cmd-injection-es6/    -> basic testing, updated for ES6 extended version

  test-utils/
    codeql-parser/  [UNUSED]

    jalangi-instrument/    -> contains taint analysis instrumentation JS files

    jalangi3/              -> extended partially ES6-compatible version of jalangi2

    bootstrap.js           -> bootstrap file for instrumenting jalangi2 offline

    dvna-package.json      -> updated dvna package.json to solve node versioning compatibility

dynamic/
  Dockerfile

static/
  Dockerfile

compose.yaml
```

## Procedure

0. Open container
To open Docker containers for the runtime envionment, do
```
docker compose up dynamic
```
This should open three containers: 1. the dynamic testing server instance, 2. Mongo and MySQL official image-based containers

2. Setup
```
git clone [url for test case]      # clone the source code from open-source github node servers
cp -r binaries/ [test case name]   # copy the binaries in
cd [test case name]
./binaries/setup.sh                # setup provides basic npm management / database initialization
```
If testing the original Jalangi2 version (i.e. ES5-compatible one), first transpile the code to folder [test case name]-es5 using
```
./binaries/migrate-es5.sh
```
2. Instrumentation
To instrument on migrated ES5 version, do:
```
cd [test case name]-es5/
./binaries/instrument-es5.sh
cd ../[test case name]-es5-inst/
./binaries/run-inst-es5.sh
```
Similarly, for running extended Es6-compatible version, do:
```
cd [test case name]/
./binaries/instrument.sh
cd ../[test case name]-es6-inst/
./binaries/run-inst.sh
```

## Test and Result
After setting up the environment and running `./binaries/run-inst.sh`, the server should be up and running.

The server GUI can be accessed on host machine using localhost. NodeGoat uses port number 4000, whereas dvna uss port number 9090. 
Both are exposed to the host machine.
