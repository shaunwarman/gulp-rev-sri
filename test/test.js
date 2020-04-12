const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const test = require('ava');
const gulp = require('gulp');
const rev = require('gulp-rev');
const gulpSri = require('..');

const access = promisify(fs.access);
const readFile = promisify(fs.readFile);
const remove = promisify(fs.unlink);

const fixturesPath = path.join(__dirname, 'fixtures');
const resultsPath = path.join(__dirname, 'results');

test.beforeEach(async (t) => {
  try {
    const resultsExists = await access(resultsPath);
    if (resultsExists) await remove(resultsPath);
  } catch (err) {
    t.fail(err);
  }
});

test.cb('create success of sri rev manifest', (t) => {
  gulp
    .src(`${fixturesPath}/js/*.js`)
    .pipe(rev())
    .pipe(gulp.dest(resultsPath))
    .pipe(rev.manifest({ merge: true, base: resultsPath }))
    .pipe(gulpSri({ base: resultsPath }))
    .pipe(gulp.dest(resultsPath))
    .on('error', (err) => {
      t.fail(err);
    })
    .on('end', async () => {
      try {
        const content = await readFile(`${resultsPath}/rev-manifest.json`);
        const manifest = JSON.parse(content.toString());
        t.is(typeof manifest, 'object');
      } catch (err) {
        console.error(err);
      }

      t.end();
    });
});
