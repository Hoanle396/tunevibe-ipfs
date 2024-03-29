const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;
const { logger } = require("../utils/logger");

module.exports = {
  connect: async function connectDB() {
    mongoose
      .connect(MONGODB_URL)
      .then(() => logger.success("🚀 Connect database successfully!"))
      .catch((error) => {
        logger.error("🚀 Connect database failed");
        logger.error(error);
      });
    return mongoose.connection;
  },
};
