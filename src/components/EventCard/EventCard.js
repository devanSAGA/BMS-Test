import React from "react";
import { PlayCircle } from "react-feather";
import "./EventCard.css";

const EventCard = props => {
  return (
    <div
      onClick={props.onClick}
      className={"event-card " + (props.isSelected ? "selected" : "")}
    >
      <div className="poster-container">
        <div className="event-card--date">{props.date.split(",")[0]}</div>
        <div className="event-card--playicon">
          <PlayCircle className="icon playicon" size={50} />
        </div>
        <img
          className="event-card--poster"
          src={props.posterURL}
          alt={props.title}
        />
      </div>
      <div className="event-card--title">{props.title}</div>
    </div>
  );
};

export default EventCard;
