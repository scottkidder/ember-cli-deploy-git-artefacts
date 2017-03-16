# ember-cli-deploy-git-artefacts

> An ember-cli-deploy plugin to generate git artefacts

This plugin generates git artefacts into files like
```bash
○ $:> cat dist/branch.txt
release/v1.2
○ $:> cat dist/tag.txt
v1.2.0
○ $:> cat dist/revision.txt
2a8bc4a42a221e038dfec684a98aa2cd521c4ee9
```

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Installation
Run the following command in your terminal:

```bash
○ $:> ember install ember-cli-deploy-git-artefacts --save-dev
```

## Quick Start

To get up and running quickly, do the following:

* Ensure [ember-cli-deploy-build][2] is installed and configured.

* Install this plugin

* Place the following configuration into `config/deploy.js`

```javascript
  // All artefacts are optional, choose whatever you need.
  // "file" option is customizable filepath inside of a "dist" folder.
  var ENV = {
    'git-artefacts': {
      git: [{
        artefact: 'branch-name',
        file: 'branch.txt'
      }, {
        artefact: 'tag-name',
        file: 'tag.txt'
      }, {
        artefact: 'commit-hash-short',
        file: 'hash-short.txt'
      }, {
        artefact: 'commit-hash-long',
        file: 'hash-long.txt'
      }]
    }
  };
```

* Run the pipeline

```bash
○ $:> ember deploy
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Pipeline Hooks Documentation][3].

- `prepare`

## Configuration Options

### enabled

Plugin will do nothing if it's set to `false`.

*Default:* `true`

### git (`required`)

List of git artefacts and target files where to generate them.

Available artefacts are:
* `branch-name`
* `tag-name`
* `commit-hash-long`
* `commit-hash-short`

*Default:* `undefined`

### distDir

The root directory where the artefact files should be placed. By default, this option will use the `distDir` property of the deployment context, provided by [ember-cli-deploy-build][2].

*Default:* `context.distDir`

## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`      (provided by [ember-cli-deploy-build][2])

[1]: http://ember-cli-deploy.com/docs/v1.0.x/using-plugins "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: http://ember-cli-deploy.com/docs/v1.0.x/pipeline-hooks "Pipeline Hooks Documentation"
