import React from "react";
import { PlayCircle } from "react-feather";
import "./MovieCard.css";

const MovieCard = props => {
  return (
    <div
      onClick={props.onClick}
      className={"movie-card " + (props.isSelected ? "selected" : "")}
    >
      <div className="poster-container">
        <div className="movie-card--date">{props.date.split(",")[0]}</div>
        <div className="movie-card--playicon">
          <PlayCircle className="icon playicon" size={50} />
        </div>
        <img
          className="movie-card--poster"
          src={props.posterURL}
          alt={props.title}
        />
      </div>
      <div className="movie-card--title">{props.title}</div>
    </div>
  );
};

export default MovieCard;
