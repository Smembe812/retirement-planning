
// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-offline-sync
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var GLOBAL_CONFIG = require('../global-config');

var env = (process.env.NODE_ENV || 'development');
var isDevEnv = env === 'development' || env === 'test';

module.exports = {
  hostname: GLOBAL_CONFIG.hostname,
  restApiRoot: GLOBAL_CONFIG.restApiRoot,
  isDevEnv: isDevEnv,
  indexFile: require.resolve('../client/index.html'),
  port: GLOBAL_CONFIG.port,
  legacyExplorer: GLOBAL_CONFIG.legacyExplorer
};
