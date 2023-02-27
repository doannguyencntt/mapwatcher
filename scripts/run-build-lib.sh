#!/bin/bash
npm install
npm run build:lib
echo '//npm-registry.channelprecision.com/:_authToken=${NPM_TOKEN}'>.npmrc
npm publish --registry http://npm-registry.channelprecision.com --access public