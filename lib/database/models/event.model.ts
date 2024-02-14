import { Document, Schema, Types, model, models } from "mongoose"

//This is why we use typescript;
export interface IEvent extends Document {
    //we must never forget to add _id propertly manually as it is create by mongoose in database automatically.
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url?: string;
    category: { _id: string, name: string };
    organizer: { _id: string, firstName: string, lastName: string };
    // we filled up by using chatGPT, and then look as if we ain't missing anything. Add added _id and modified category and organizer properties, in here.
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date, default: Date.now },
    price: { type: String },
    isFree: { type: Boolean, default: false },
    url: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    organizer: { type: Schema.Types.ObjectId, ref: "User" },
})

const Event = models.Event || model("Event", EventSchema)

export default Event;

//*** Always remember that, if we later on change the schema's content, we have to restart the server.