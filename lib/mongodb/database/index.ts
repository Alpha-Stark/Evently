// installed mongoose and mongodb
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI


let cached = (global as any).mongoose || { conn: null, promise: null };
/** Initialized cached variable. Here we attempt to retreive the mongoose proprty from the global object.
   In nodeJs, "(global as any). " provide a space to store global variables.
   This cached variable in intent to hold a cached connection to our database.
*/

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
    if (!MONGODB_URI) throw new Error("MongoDB URI Missing")

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: "evently",
        bufferCommands: false
    })

    cached.conn = await cached.promise;
    return cached.conn;
};