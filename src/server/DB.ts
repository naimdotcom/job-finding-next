import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

const connect = async () => {
  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URL is not defined in environment variables.");
  }

  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("✅ Already connected to MongoDB.");
    return;
  }

  if (connectionState === 2) {
    console.log("🔄 Connecting to MongoDB...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "jobfinder",
      bufferCommands: true,
    });

    console.log("✅ Connected to MongoDB.");
  } catch (err: any) {
    console.error("❌ MongoDB Connection Error:", err.message);
    // throw new Error(err.message);
  }
};

// Enable Mongoose debugging in development mode
// if (process.env.NODE_ENV === "development") {
//   mongoose.set("debug", true);
// }

export default connect;
