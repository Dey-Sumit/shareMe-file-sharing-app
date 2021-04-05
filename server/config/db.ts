import mongose from "mongoose";

const connectDB = async () => {
  try {
    await mongose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log("connection error ", error.message);
  }

  const connection = mongose.connection;

  if (connection.readyState >= 1) {
    console.log("connected to database");
    return;
  }

  connection.on("connected", () => console.log("connected to database"));

  connection.on("error", () => console.log("database connection failed"));
};
export default connectDB;
