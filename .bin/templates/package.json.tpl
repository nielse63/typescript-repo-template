{
  "name": "{{name}}",
  "version": "1.0.0",
  "description": "{{description}}",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "files": [
    "dist"
  ],
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "test": "jest",
    "prepare": "husky install",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "lint": "eslint --fix ./src && prettier --write ./src",
    "prebuild": "rm -rf dist/",
    "build": "tsc"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/{{user}}/{{name}}.git"
  },
  "keywords": {{keywords}},
  "author": "{{author}}",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/{{user}}/{{name}}/issues"
  },
  "homepage": "https://github.com/{{user}}/{{name}}#readme",
  "engines": {
    "node": "^16.19.0",
    "npm": "^v8.19.3"
  },
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-typescript": "^7.21.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^18.14.6",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.6.0",
    "babel-jest": "^29.5.0",
    "eslint": "^8.35.0",
    "eslint-config-airbnb-typescript": "^17.0.0",
    "eslint-config-prettier": "^8.7.0",
    "eslint-plugin-import": "^2.25.3",
    "eslint-plugin-jest": "^27.0.1",
    "eslint-plugin-jest-extended": "^2.0.0",
    "eslint-plugin-prettier": "^4.0.0",
    "fs-extra": "^11.1.0",
    "husky": "^8.0.1",
    "jest": "^29.5.0",
    "jest-extended": "^3.2.4",
    "lint-staged": "^13.1.2",
    "prettier": "^2.6.2",
    "ts-node": "^10.9.1",
    "typescript": "^4.5.3"
  },
  "lint-staged": {
    "*.{ts,js,json,md}": "prettier --write"
  }
}
