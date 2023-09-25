require("dotenv").config();

export default {
  port: process.env.PORT ?? 3000,
  mongoUrl: process.env.MONGO_URL,
  saltRound: process.env.SALTROUND,
  secret_key: process.env.SECRETKEY,
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "restaurant-bot-admin",
  },

};
