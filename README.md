# gulp-rev-sri

[![build status](https://img.shields.io/travis/com/shaunwarman/gulp-rev-sri.svg)](https://travis-ci.com/shaunwarman/gulp-rev-sri)
[![code coverage](https://img.shields.io/codecov/c/github/shaunwarman/gulp-rev-sri.svg)](https://codecov.io/gh/shaunwarman/gulp-rev-sri)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/shaunwarman/gulp-rev-sri.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/gulp-rev-sri.svg)](https://npm.im/gulp-rev-sri)

> A gulp-rev subresource integrity plugin


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install gulp-rev-sri
```

[yarn][]:

```sh
yarn add gulp-rev-sri
```


## Usage

```js
const gulp = require('gulp');
const gulpSri = require('gulp-rev-sri');

gulp.src('./myassets/**/*')
  .pipe(rev())
  .pipe(gulp.dest('./somedestination/'))
  .pipe(rev.manifest())
  .pipe(gulpSri({ buildBase: 'some/build/path' }))
  .pipe(gulp.dest('./somedestination/'))
  .on('end', () => { ... });

// rev-manifest.json
// { <original_file>: { path: <file_with_rev_hash>, integrity: 'sha256-<hash_of_file>' } }
```


## Contributors

| Name      | Website                   |
| --------- | ------------------------- |
| **Shaun** | <https://shaunwarman.com> |


## License

[MIT](LICENSE) © [Shaun](https://shaunwarman.com)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
