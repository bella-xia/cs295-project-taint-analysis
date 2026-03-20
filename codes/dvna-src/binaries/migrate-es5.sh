#!/bin/bash

set -e

APP_DIR="/analysis/codes/dvna-src/dvna"
TRANSPILED_DIR="/analysis/codes/dvna-src/dvna-es5"

echo "[*] Cleaning previous transpiled output..."
rm -rf $TRANSPILED_DIR
mkdir -p $TRANSPILED_DIR

echo "[*] Copying project structure..."
cp -r $APP_DIR/* $TRANSPILED_DIR/
cd $TRANSPILED_DIR

echo "[*] Transpiling app files with Babel..."
npx babel server.js -o server.js --presets @babel/preset-env
npx babel core/ -d core/ --presets @babel/preset-env
npx babel config/ -d config/ --presets @babel/preset-env
npx babel models/ -d models/ --present @babel/preset-env
npx babel routes/ -d routes/ --preset @babel/preset-env

