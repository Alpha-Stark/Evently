"use client"
// used shadcn form, input, textarea, 
// Date picker component from React Date Time picker package npm install react-datetime-picker
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import DateTimePicker from 'react-datetime-picker';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// MUI Datetime picker:  https://mui.com/x/react-date-pickers/getting-started/
import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import {
    DateTimePickerTabs,
    DateTimePickerTabsProps,
} from '@mui/x-date-pickers/DateTimePicker';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';


import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"

type EventFromProps = {
    userId: string;
    type: "Create" | "Update";
}

function CustomTabs(props: DateTimePickerTabsProps) {
    return (
        <React.Fragment>
            <DateTimePickerTabs {...props} />
            <Box sx={{ backgroundColor: 'blueviolet', height: 5 }} />
        </React.Fragment>
    );
}

const EventForm = ({ userId, type }: EventFromProps) => {

    const initialValues = eventDefaultValues; //move it down if any error
    const [files, setFiles] = useState<File[]>([])
    const [value, onChange] = useState<Value>(new Date());

    //mui
    const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs>(dayjs('2022-04-17'));
    const [isPickerOpen, setIsPickerOpen] = React.useState(false);

    const handleDateTimeChange = (newDate: dayjs.Dayjs) => {
        setSelectedDate(newDate);
    };

    const handleOpenPicker = () => {
        setIsPickerOpen(true);
    };

    const handleClosePicker = () => {
        setIsPickerOpen(false);
    };


    // 1. Define your form.
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof eventFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 md:flex-row">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Event title" {...field} className="input-field" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl className="h-72">
                                        <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                            <Image
                                                src="/assets/icons/location-grey.svg"
                                                alt="location"
                                                width={24}
                                                height={24}
                                            />
                                            <Input placeholder="Event location or Online" {...field} className="input-field" />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="startDateTime"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        {/* <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2"> */}
                                        <div className="flex-center h-[54px] w-full overflow-visible rounded-full bg-grey-50 px-4 py-2">
                                            <Image
                                                src="/assets/icons/calendar.svg"
                                                alt="calendar"
                                                width={24}
                                                height={24}
                                                className="filter-grey"
                                            />
                                            <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                                            <DateTimePicker
                                                // selected={field.value}
                                                value={value}
                                                onChange={onChange}
                                                // showTimeSelect
                                                // timeInputLabel="Time:"
                                                format="MM-dd-yyyy h:mm aa"
                                                calendarClassName="datePicker"
                                                className="datePicker"
                                                clockClassName="datePicker"
                                            // amPmAriaLabel="Select AM/PM"
                                            // hourAriaLabel="Hour"
                                            // minuteAriaLabel="Minute"
                                            // monthAriaLabel="Month"
                                            // nativeInputAriaLabel="Date"
                                            // yearAriaLabel="Year"
                                            />


                                            {/* <button onClick={handleOpenPicker}>Select Date and Time</button>
                                            {isPickerOpen && (
                                                <StaticDateTimePicker
                                                    label="Event Date and Time"
                                                    value={selectedDate}
                                                    onChange={handleDateTimeChange}
                                                    onAccept={handleClosePicker} // Close picker on "OK"
                                                // ... other props
                                                />
                                            )}
                                            {selectedDate && (
                                                <p>Selected Date and Time: {selectedDate.format('YYYY-MM-DD HH:mm')}</p>
                                            )} */}

                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </LocalizationProvider>
    )
}

export default EventForm