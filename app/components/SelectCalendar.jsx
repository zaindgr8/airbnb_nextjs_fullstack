// https://hypeserver.github.io/react-date-range/

"use client"
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import {DateRange} from "react-date-range"
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";

const SelectCalendar = ({reservation}) => {

  const [state, setState]= useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }
  ])

    let disabledDates;
    reservation?.forEach((reservationItem) => {
      const dateRange= eachDayOfInterval({
        start: new Date(reservationItem.startDate),
        end: new Date(reservationItem.endDate)
      })
      disabledDates= [disabledDates, ...dateRange]
    })
  
  return (
    <div className="border-2 border-black">
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />

      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection])}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </div>
  );
};

export default SelectCalendar;
