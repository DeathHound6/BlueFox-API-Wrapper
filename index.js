const Server = require("./server.js");
const API = require("./api.js");

/**
 * A class that represents the Client User 
 */ 
class BlueFox {
  /**
   * @param {String} apiToken Your API Token
   */
  constructor(apiToken = "") {
    if (typeof apiToken != "string")
      throw new TypeError("API Token must be String");
    Object.defineProperty(this, "token", { value: apiToken, writable: false });

    /**
     * Access to the interaction methods with BlueFox Panel API
     * @type {API}
     * @private
     */
    this._api = new API(this);
  }
  get token() {
    return this.token;
  }

  /**
   * Create a new instance of a BlueFox Panel Server
   * @param {String} id The ID of the server to get
   * @returns {Promise<Server>}
   */
  async getServer(id) {
    if (typeof id != "string") throw new TypeError("Server ID must be String");
    if ((await this._api.serverExists(id)).code != 204)
      throw new Error("A server with that id does not exist");
    return new Server(this, id);
  }
}

module.exports = BlueFox;
