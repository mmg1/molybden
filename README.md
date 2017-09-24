# molybden
Tiny "automatic" fuzzer for chromium using puppeteer. [WIP]

#### TL;DR
[Domato](https://github.com/google/domato) generates fuzz files.        
[Puppeteer]() running in headless mode for testing.          
Make sure that you've downloaded [Chromium with ASAN](https://commondatastorage.googleapis.com/chromium-browser-asan/index.html)

### How?
1. Generate fuzz files with `domato`.
2. Serve these files using `serve`.
3. Run `puppeteer` against every generated file.

### Install

```
  git clone https://github.com/Metnew/molybden.git && cd molybden
  npm i
```

### Generate fuzz files:
> Make sure you have python and it exists in $PATH!

```bash
# Generate 100 fuzz files in ./dist folder
npm run generate
# Which is equal to:
# python ./domato/generator.py  --output_dir ./dist --no_of_files 100
```

`npm run generate` accepts env vars:
  - `DOMATO_DIR` - output_dir for domato
  - `DOMATO_NUM_FILES` - number of files to generate

```sh
# Generate 1337 fuzz files in ./hello/world folder
DOMATO_DIR=./hello/world DOMATO_NUM_FILES=1337 npm run generate
# Which is equal to:
# python ./domato/generator.py  --output_dir ./hello/world --no_of_files 1337
```

> **IMPORTANT**: domato can't generate folders for your files. You have to create empty folder for fuzz files *(e.g. ./dist)* by yourself.
Else you'll get:
```
Writing a sample to ./dist/fuzz-0.html
Error writing to output
Writing a sample to ./dist/fuzz-1.html
Error writing to output
```
*Run `mkdir ./dist` before `npm run generate`!*

### Run:

```bash
# Start puppeteer using files from DOMATO_DIR.
npm run start
# Which is equal to node `./src`
```
`npm run start` accepts env vars:
  - `DOMATO_DIR` - folder with generated fuzz files
  - `PORT` - free port for `serve`


### License
Apache-2.0 License.

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>
