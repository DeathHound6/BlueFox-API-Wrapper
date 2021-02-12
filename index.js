const fetch = require("node-fetch");

/**
 * The class to easily interact with BlueFoxHost API
 */
class BlueFox {
  /**
   * @param {String} serverID The ID for the server to change power state for
   * @param {String} apiToken The token for a user or subuser for this server
   */
  constructor(serverID = "", apiToken = "") {
    if (typeof serverID != "string")
      throw new TypeError("Server ID must be a string");
    if (typeof apiToken != "string")
      throw new TypeError("API Token must be a string");

    fetch(`https://panel.bluefoxhost.com/api/client/servers/${serverID}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiToken}` }
    }).catch(err => {
      throw new Error("No server with the provided ID exists");
    });
    this.server = serverID;
    this.token = apiToken;
  }

  /**
   * Start the server using the ID provided
   * @returns {Promise<Boolean>}
   */
  async start() {
    await fetch(
      `https://panel.bluefoxhost.com/api/client/servers/${this.server}/power`,
      {
        method: "POST",
        body: JSON.stringify({ signal: "start" }),
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    return true;
  }

  /**
   * Stop the server using the ID provided
   * @returns {Promise<Boolean>}
   */
  async stop() {
    await fetch(
      `https://panel.bluefoxhost.com/api/client/servers/${this.server}/power`,
      {
        method: "POST",
        body: JSON.stringify({ signal: "stop" }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    return true;
  }

  /**
   * Kill the server using the ID provided
   * @returns {Promise<Boolean>}
   */
  async kill() {
    await fetch(
      `https://panel.bluefoxhost.com/api/client/servers/${this.server}/power`,
      {
        method: "POST",
        body: JSON.stringify({ signal: "kill" }),
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    return true;
  }

  /**
   * Restart the server using the ID provided
   * @returns {Promise<Boolean>}
   */
  async restart() {
    await fetch(
      `https://panel.bluefoxhost.com/api/client/servers/${this.server}/power`,
      {
        method: "POST",
        body: JSON.stringify({ signal: "restart" }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`
        }
      }
    );
    return true;
  }
}

module.exports = BlueFox;
