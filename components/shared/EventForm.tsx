"use client"

type EventFromProps = {
    userId: string;
    type: "Create" | "Update";
}

const EventForm = ({ userId, type }: EventFromProps) => {
    return (
        <div>EventForm {type}</div>
    )
}

export default EventForm