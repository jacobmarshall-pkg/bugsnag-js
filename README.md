# @jacobmarshall/bugsnag-js

A bunch of small re-implementations of the Bugsnag JS notifier for modern web apps.

**Please be warned, this module is currently unstable and untested. Please do not use in production unless you know the limitations.**

This module is also useful for embedding into smaller libraries, frameworks, or SDKs which wish to report their own errors.
It does not automatically notify when there are errors uncaught on the page, you are expected to bring that functionality along with you.

## Example

```js
import { config, notify } from '@jacobmarshall/bugsnag-js';

config.apiKey = 'f48d2ed7b8e059aaf02dfda1528a1b8e'; // Add your own api key here
config.releaseStage = process.env.NODE_ENV;
config.user = {
  // Put your user's sharable information here
};
config.endpoint = 'https://bugsnag.local:49000/js'; // If you're lucky enough to run Bugsnag enterprise

try {
  throw new Error('Uh oh...');
} catch(err) {
  notify(err, {
    severity: 'info',
    metaData: {
      // Additional error metadata
    }
  });
}
```

## Configuration

These are some of the currently supported configuration options. Excuse the lack of documentation, it will be coming.

### apiKey `string`

The notifier API key for the project you want the errors to be sent to.

### endpoint `string`

The on-premise/enterprise js notifier URL. Looks something like `https://bugsnag.local:49000/js` when you're testing.

### releaseStage `string`

The current release stage - these are some common release stages; `beta`, `production`, `staging`, `testing`, `development`.

### metaData `Object<string, *>`

The global/default metaData attached to every error sent via the notify function. The notify function can override these defaults if the same key is used (top level, not deep).

### appVersion `string`

The version number of your application. Used to help track when errors were introduced.

### severity `string`

The default severity for all errors (unless overridden). This is set to `error` by default. Can be one of these three; `info`, `warning`, `error`.

## License

MIT License
