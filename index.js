'use strict';

const fs = require('fs');
const path = require('path');
const git = require('git-rev-sync');
const DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-git-artefacts',

  createDeployPlugin: function(options) {
    const DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        enabled: true,
        distDir: function(context) {
          return context.distDir;
        }
      },

      requiredConfig: ['git'],

      prepare: function(/* context */) {
        if (this.readConfig('enabled') === false) { return; }

        const plugin    = this;
        const distDir   = this.readConfig('distDir');
        const artefacts = this.readConfig('git');

        artefacts.forEach(function(obj) {
          const artefact = obj.artefact;
          const filepath = path.join(distDir, obj.file);

          fs.writeFileSync(filepath, plugin._getArtefact(artefact));
        });

        return {
          distFiles: artefacts.map(function(a) { return a.file })
        };
      },

      _getArtefact: function(artefact) {
        switch (artefact) {
          case 'branch-name':
            return git.branch();
          case 'tag-name':
            return git.tag();
          case 'commit-hash-long':
            return git.long();
          case 'commit-hash-short':
            return git.short();
          default:
            throw `Unknown aftefact "${artefact}"`;
        }
      }
    });
    return new DeployPlugin();
  }
};
