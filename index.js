const fs = require('fs');
const path = require('path');
const hasha = require('hasha');
const through = require('through2');
const Vinyl = require('vinyl');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

module.exports = (options) => {
  const { buildBase } = options;
  return through.obj(
    async (file, enc, cb) => {
      try {
        const manifest = {};
        const { _contents, history } = file;
        const [revPath] = history;
        const original = JSON.parse(_contents.toString());
        const files = Object.keys(original);
        await Promise.all(
          files.map(async (file) => {
            const content = await readFile(
              path.join(buildBase, original[file])
            );
            const hash = await hasha.async(content, {
              encoding: 'base64',
              algorithm: 'sha256'
            });
            manifest[file] = {
              path: original[file],
              integrity: `sha256-${hash}`
            };
          })
        );
        const sriManifest = new Vinyl({
          contents: Buffer.from(JSON.stringify(manifest, null, 2)),
          path: revPath
        });
        cb(null, sriManifest);
      } catch (err) {
        cb(err);
      }
    },
    (cb) => {
      cb();
    }
  );
};
