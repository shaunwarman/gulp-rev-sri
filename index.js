const fs = require('fs');
const path = require('path');
const hasha = require('hasha');
const through = require('through2');
const Vinyl = require('vinyl');
const { promisify } = require('util');
const access = promisify(fs.access);
const readFile = promisify(fs.readFile);

module.exports = (options) => {
  const { base, manifestName = 'sri-manifest.json' } = options;
  return through.obj(
    async (file, enc, cb) => {
      try {
        const manifest = {};
        const { _contents } = file;
        const original = JSON.parse(_contents.toString());
        const files = Object.keys(original);

        let originalManifest = {};
        try {
          await access(path.join(base, manifestName));
          const file = await readFile(path.join(base, manifestName));
          originalManifest = JSON.parse(file.toString());
        } catch (_) {}

        await Promise.all(
          files.map(async (file) => {
            const content = await readFile(path.join(base, original[file]));
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

        const finalManifest = Object.assign(originalManifest, manifest);
        const sriManifest = new Vinyl({
          contents: Buffer.from(JSON.stringify(finalManifest, null, 2)),
          path: manifestName
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
