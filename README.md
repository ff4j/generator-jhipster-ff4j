# generator-jhipster-ff4j

JHipster module, A Jhipster module to integrate FeatureToggle capability in your application using FF4j (Feature Flipping for Java)

[![NPM version][npm-image]][npm-url] 
[![Dependency Status][daviddm-image]][daviddm-url]

| JHIPSTER        | +           | FF4J  |
| ------------- |:-------------:| -----:|
| <img src="https://jhipster.github.io/images/logo/logo-jhipster-drink-coffee.png" height="120px" />      |  | <img src="http://ff4j.org/images/ff4j.png" height="120px" /> |

## Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

## Installation

### With Yarn

To install this module:

```bash
yarn global add generator-jhipster-ff4j
```

To update this module:

```bash
yarn global upgrade generator-jhipster-ff4j
```

### With NPM

To install this module:

```bash
npm install -g generator-jhipster-ff4j
```

To update this module:

```bash
npm update -g generator-jhipster-ff4j
```

## Usage

Run the module on a JHipster generated application:

```bash
yo jhipster-ff4j
```

If you want don't want to answer each question you can use

```bash
yo jhipster-ff4j default
```
This will enable auditing for all available entities (only ones created by the jhipster:entity generator) and add the audit log page under admin

## License

Apache-2.0


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-ff4j.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-ff4j
[travis-image]: https://travis-ci.org/clun/generator-jhipster-ff4j.svg?branch=master
[travis-url]: https://travis-ci.org/clun/generator-jhipster-ff4j
[daviddm-image]: https://david-dm.org/clun/generator-jhipster-ff4j.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/clun/generator-jhipster-module
