[![npm](https://badgen.now.sh/npm/v/jest-spin-reporter)](https://www.npmjs.com/package/jest-spin-reporter)

# Jest spin reporter

Dead simple spinner based test reporter for jest.

![](https://user-images.githubusercontent.com/1210596/43618452-44f29b52-967d-11e8-9dd7-c94478606d97.gif)

# Install

First, install `jest-spin-reporter`

```sh
npm install --save-dev jest-spin-reporter
```

then configure it via `reporters` section in jest.

```
jest configuration
{
  ...
  "reporters": [
      "jest-spin-reporter"
  ],
  ...
}
```

Each time run test reporter will pick up spinner randonmly.

# License
[MIT](https://github.com/kwonoj/jest-spin-reporter/blob/master/LICENSE)
