import mongoose from "mongoose";

const connection = () => {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () =>
    console.log("Database connected Successfullly")
  );
  mongoose.connection.on("disconnected", () =>
    console.log("Database disconnected ")
  );
  mongoose.connection.on("error", (error) =>
    console.log("Error While connecting database ", error.message)
  );
};

export default connection;
