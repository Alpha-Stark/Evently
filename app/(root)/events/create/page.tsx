import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs";
import React from "react";

const createEvent = () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string; //added question mark because it was showing error that "sessionClaims can be null"
    // We must not forget to add the userId to the clerk metadata, to actually reterive it as we are doing in the above line. And to do it we need to customize the clerk session token. Docs: https://clerk.com/docs/backend-requests/making/custom-session-token => {"userId": "{{user.public_metadata.userId}}"}


    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Create Event</h3>
            </section>
            <div className="wrapper my-8">
                <EventForm userId={userId} type="Create" />
            </div>
        </>
    );
};

export default createEvent;