import React from "react";
import "./EventTrailerRow.css";
import { ThumbsDown, ThumbsUp, HelpCircle, Calendar, X } from "react-feather";

const EventTrailerRow = props => {
  return (
    <div className="event-trailer">
      <div className="event-trailer__iframe">
        <div className="iframe-container">
          <iframe
            title="trailer"
            width="560"
            height="315"
            src={props.trailerURL}
            frameBorder="0"
            allow="accelerometer; Hautoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="event-trailer-rightbox">
        <div className="event-trailer__info">
          <div className="title-and-closeicon">
            <div className="event-trailer__info--title">{props.title}</div>
            <button className="icon close-button" onClick={props.hideTrailer}>
              <X className="close-icon" size={35} />
            </button>
          </div>
          <div className="event-trailer__info--lang">
            {props.eventLanguage} | {props.dimension}
          </div>
          <div className="rating-date-conatiner">
            <div className="event-trailer__info--votes">
              <ThumbsUp className="icon thumbsup-icon" size={40} />
              100%
            </div>
            <div className="event-trailer__info--date">
              <Calendar className="icon calendar-icon" size={40} />
              {props.date}
            </div>
          </div>
        </div>
        <div className="event-trailer__actions">
          <div className="event-trailer__actions--icon thumbsup">
            <ThumbsUp className="icon thumbsup-icon" size={40} />
            <div>WILL WATCH</div>
          </div>
          <div className="event-trailer__actions--icon helpcircle">
            <HelpCircle className="icon help-icon" size={40} />
            <div>MAYBE</div>
          </div>
          <div className="event-trailer__actions--icon thumbsdown">
            <ThumbsDown className="icon thumbsdown-icon" size={40} />
            <div>WON'T WATCH</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTrailerRow;
