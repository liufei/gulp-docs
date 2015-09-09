# Gulp Documentation

This is an **unofficial** site for better reading experience.

* [English](http://gulpjs.org/en/)
* [简体中文](http://gulpjs.org/zh-cn/) [@lisposter](https://github.com/lisposter/gulp-docs-zh-cn)

## Install

To edit and build in local machine, run following command:

```shell
# install gitbook-cli
npm install -g gitbook-cli

# use custom version of gitbook
gitbook versions:link 2.3.0-custom ./gitbook

# install depdencies
cd ./gitbook
npm install

# install plugin
cd ..
gitbook install
```

## Usage

To start edit, run command:

```shell
gitbook serve
```

To start build, run command:

```shell
gitbook build
```
