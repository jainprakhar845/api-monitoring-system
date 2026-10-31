import mongoose from "mongoose";
import config from "./index.js";
import logger from "./logger.js";

class MongoConnection {
  constructor() {
    this.connection = null;
  }

  /**
   * connection to mogodb
   * @returns {Promise<mongoose.conection>}
   */
  async connect() {
    try {
      if (this.connection) {
        logger.info("Mongodb already connected");
        return this.connection;
      }

      await mongoose.connect(config.mongo.uri, {
        dbName: config.mongo.dbName,
      });

      this.connection = mongoose.connection;

      logger.info(`MongoDB connected:${config.mongo.uri}`);

      this.connection.on("erorr", (err) => {
        logger.info("MongoDB connection error", err);
      });

      this.connection.on("disconnected", () => {
        logger.error("MongoDB disconnected");
      });

      return this.connection;
    } catch (error) {
      logger.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  /**
   * disconnect active mongodb connection
   */

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        this.connection = null;
        logger.info("Mongodb disconnected!");
      }
    } catch (error) {
      logger.error("Failed to disconnect to MongoDB:", error);
      throw error;
    }
  }

  /**
   * active connection
   * @return {mongoose.conection}
   */
}

export default new MongoConnection();
