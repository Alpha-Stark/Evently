//here we'll have server actions, hence immediately, define it as "use server"
"use server"

import { CreateEventParams, GetAllEventsParams } from "@/types"
import { handleError } from "../utils"
import User from "../database/models/user.model"
import { connectToDatabase } from "../database"
import Event from "../database/models/event.model"
import Category from "../database/models/category.model"

const populateEvent = async (query: any) => {
    return query
        .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
        .populate({ path: 'category', model: Category, select: '_id name' })
}

export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {
        await connectToDatabase();

        const organizer = await User.findById(userId);
        if (!organizer) {
            throw new Error("Organizer not found");
        }

        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId
        })
        return JSON.parse(JSON.stringify(newEvent));

    } catch (error) {
        handleError(error);
    }
}

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase()

        // const event = await Event.findById(eventId);
        const event = await populateEvent(Event.findById(eventId));
        if (!event) {
            throw new Error("Event not found")
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
}
export const getAllEvents = async ({ query, limit = 6, page, category }: GetAllEventsParams) => {
    try {
        await connectToDatabase()

        const conditions = {};
        // Understand why there is no awit in the below statement
        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
            .skip(0)
            .limit(limit)
        // Event.find() method in Mongoose returns a Query object, not a promise. Therefore, you don't need to use await in this specific context. if we want to use await keyword, then we had to add .exec() method at the end, which returns promise.

        const events = await populateEvent(eventsQuery);
        // We need total no of events received, as from it we can implement pagination.
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        }
    } catch (error) {
        handleError(error);
    }
}

