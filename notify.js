var request = require('./request');
var config = require('./config');
var notifierVersion = require('./version').notifierVersion;

function merge(target, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = obj[key];
    }
  }
  return target;
}

function notify(err, options) {
  if (!options) options = {};
  request(config.endpoint, {
    payloadVersion: '3',
    notifierVersion: notifierVersion,

    apiKey: config.apiKey,
    projectRoot: config.projectRoot || window.location.protocol + '//' + window.location.host,
    context: config.context || window.location.pathname,
    user: config.user,
    metaData: merge({}, merge(options.metaData || {}, config.metaData)),
    releaseStage: config.releaseStage,

    appVersion: config.appVersion,
    url: window.location.href,
    userAgent: navigator.userAgent,

    language: navigator.language || navigator.userLanguage,

    severity: options.severity || config.severity,
    name: err.name,
    message: err.message,
    stacktrace: err.stack || err.backtrace || err.stacktrace,
    file: err.fileName || err.sourceURL,
    lineNumber: -1,
    columnNumber: -1,
    breadcrumbs: []
  });
}

module.exports = notify;
