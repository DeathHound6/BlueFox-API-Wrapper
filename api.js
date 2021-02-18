const fetch = require("node-fetch");

const BlueFox = require("./index.js");

/**
 * A class to interact with the BlueFox Panel API endpoints
 */
class API {
  /**
   * @param {BlueFox} client The BlueFox Panel client
   */
  constructor(client) {
    Object.defineProperty(this, "client", { value: client, writable: false });

    Object.defineProperty(this, "baseURL", {
      value: "https://panel.bluefoxhost.com/api/client",
      writable: false
    });
  }
  get client() {
    return this.client;
  }
  get baseURL() {
    return this.baseURL;
  }

  /**
   * Check if a server exists with the provided id
   * @param {String} id The ID of a server
   * @returns {Object}
   * @private
   */
  async serverExists(id) {
    try {
      await fetch(`${this.baseURL}/servers/${id}`);
      return { code: 204 };
    } catch (err) {
      return { code: 500, message: err.message };
    }
  }

  /**
   * Change the power state of a server
   * @param {String} serverID The ID of a server to change the state of
   * @param {String} powerState The state to change to
   * @returns {Object}
   * @private
   */
  async power(serverID, powerState) {
    if ((await this.serverExists(serverID)).code != 204)
      return { code: 404, message: "No server with that ID exists" };
    if (
      !["start", "stop", "kill", "restart"].includes(powerState.toLowerCase())
    )
      return {
        code: 400,
        message:
          "New server power state must be from ['start', 'stop', 'kill', 'restart']"
      };

    try {
      await fetch(`${this.baseURL}/servers/${serverID}/power`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.client.token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ signal: powerState.toLowerCase() })
      });
      return { code: 204 };
    } catch (err) {
      return { code: 500, message: err.message };
    }
  }
}

module.exports = API;
