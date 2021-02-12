# BlueFox API Wrapper

```js
const BlueFox = new (require("bluefox-api-wrapper"))("myServerID", "myApiToken");

// attempt to start the server
BlueFox.start().catch(console.error);

// attempt to stop the server
BlueFox.stop().catch(console.error);

// attempt to restart the server
BlueFox.restart().catch(console.error);

// attempt to kill the server
BlueFox.kill().catch(console.error);
```
