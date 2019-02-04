# Skimmed Electron React Boilerplate

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/electron-react-blpt)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/sponsors/badge.svg)](#sponsors)

Skimmed Electron React Boilerplate is a _skimmed_ version of electron-react-boilerplate. This version uses <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a> (no Redux), <a href="https://www.typescriptlang.org/">Typescript</a> (instead of Flow), <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for rapid application development (HMR).

It also has some other changes in package dependencies and opinionated code.

<br>

<div align="center">
  <a href="https://facebook.github.io/react/"><img src="./internals/img/react-padded-90.png" /></a>
  <a href="https://webpack.github.io/"><img src="./internals/img/webpack-padded-90.png" /></a>
  <a href="http://eslint.org/"><img src="./internals/img/eslint-padded-90.png" /></a>
  <a href="https://facebook.github.io/jest/"><img src="./internals/img/jest-padded-90.png" /></a>
  <a href="https://yarnpkg.com/"><img src="./internals/img/yarn-padded-90.png" /></a>
  <a href="https://www.typescriptlang.org/"><img src="./internals/img/typescript-padded-90.png" /></a>
</div>

<br />

<div align="center">

</div>

## Install

- **If you have installation or compilation issues with this project, please see [the debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone --depth 1 --single-branch --branch master https://github.com/jonybur/skimmed-electron-react-boilerplate.git your-project-name
```

And then install the dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```

## Docs

See the original electron-react-boilerplate [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## ERB Maintainers

- [Vikram Rangaraj](https://github.com/vikr01)
- [Amila Welihinda](https://github.com/amilajack)
- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)
