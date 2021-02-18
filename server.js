const BlueFox = require("./index.js");

/**
 * Represents a Server with BlueFox host
 */
class Server {
  /**
   * @param {BlueFox} client The BlueFox Panel Client
   * @param {String} id The ID of the Server
   */
  constructor(client, id) {
    Object.defineProperty(this, "client", { value: client, writable: false });

    Object.defineProperty(this, "id", { value: id, writable: false });
  }
  get id() {
    return this.id;
  }
  get client() {
    return this.client;
  }

  /**
   * Change the power state of the server
   * @param {String} newState The new power state for the server
   * @returns {Promise<Boolean>}
   * @example
   * Server.power("start");
   * @example
   * Server.power("stop");
   * @example
   * Server.power("kill");
   * @example
   * Server.power("restart");
   */
  async power(newState) {
    const response = await this.client._api.power(this.id, newState);
    if (response.message) throw new Error(response.message);
    return true;
  }
}

module.exports = Server;
