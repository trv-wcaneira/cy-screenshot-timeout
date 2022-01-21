# cy-screenshot-timeout
Minimal repro of cy.screenshot timeout/hang as discussed in [issue 5016](https://github.com/cypress-io/cypress/issues/5016).

## The symptom
On Windows, `cypress` test failures cannot take screenshots, instead, they timeout after 30 seconds (or, seen outside this repro, crash cypress w/error code 3221225477, evidently an access violation).  

The timeout occurs frequently, but not 100% of the time.

This repo demonstrates the timeout:
```console
CypressError: `cy.screenshot()` timed out waiting `30000ms` to complete.
```
...this also seems to prevent cypress from exiting normally.

## Environment to repro
- Windows
- Cypress 9.2.1 (and older, according to the aforementioned GH issue)
- headless mode
- built-in electron browser
- Node 12, 14, or 16

## Running the demo
After installing the dependencies via `npm i`, to run the demo, simply run `npm start`.  

This demo is created from the default "cypress" folder that a fresh installation gives you the first time you open `cypress`.  I removed the demo tests so there is only a single file `repro.spec.js` that should be executed.

Please note that the `cypress run` command here uses the recently released `CYPRESS_VERIFY_TIMEOUT` env var as we have found that necessary to run cypress the first time on new machines.

## Observations 
- a simple `cy.screenshot()` call (not associated with a failure) will work, AND will prevent subsequent failing assertions from timing out on their screenshots (?)
- enabling video, using a `cypress.json` config setting of `video` w/a value of `true` will (oddly) prevent the timeouts, which I learned from the aforementioned GH issue, specifically [this comment](https://github.com/cypress-io/cypress/issues/5016#issuecomment-972961696).
- disabling failure screenshots altogether with a `cypress.json` config setting of `screenshotOnRunFailure` w/a value of `false` will prevent the timeouts
- if you enable `DEBUG=cypress:*`, the timeout occurs less frequently for some reason, but when/if it DOES timeout, you will see the last trace line before the timeout as 
```console
  cypress:server:browsers:electron debugger: sending Page.captureScreenshot with params { format: 'png' }
```