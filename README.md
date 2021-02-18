# BlueFox API Wrapper

```js
const wrapper = require("bluefox-panel-api-wrapper");
const BlueFox = new wrapper("myApiToken");

async function myFunction() {
  const myServer = await BlueFox.getServer("myServerID");

  // attempt to start the server
  // available options are `start`, `stop`, `kill` and `restart`
  await myServer.power("start");
}
myFunction();
```
