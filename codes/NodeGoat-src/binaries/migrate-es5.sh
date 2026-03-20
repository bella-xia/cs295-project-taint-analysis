#!/bin/bash

set -e
APP_DIR="/analysis/codes/NodeGoat-src/NodeGoat"
TRANSPILED_DIR="/analysis/codes/NodeGoat-src/NodeGoat-es5"

echo "[*] Cleaning previous transpiled output..."
rm -rf $TRANSPILED_DIR
mkdir -p $TRANSPILED_DIR

echo "[*] Copying project structure..."
cp -r $APP_DIR/* $TRANSPILED_DIR/
cd $TRANSPILED_DIR

echo "[*] Transpiling app files with Babel..."
npx babel server.js -o server.js --presets @babel/preset-env
npx babel app/ -d app/ --presets @babel/preset-env --ignore "app/assets"
npx babel config/ -d config/ --presets @babel/preset-env

