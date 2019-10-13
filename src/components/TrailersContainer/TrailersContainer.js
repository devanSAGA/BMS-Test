import React, { Component } from "react";
import { Video } from "react-feather";
import EventCard from "../EventCard";
import EventTrailerRow from "../EventTrailerRow";
import "./TrailersContainer.css";

class TrailersContainer extends Component {
  state = {
    eventsData: [],
    isLoading: false,
    error: "",
    isTrailerRowShowing: false,
    eventsList: []
  };

  componentDidMount() {
    let API_URL =
      "https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs";
    this.setState({ isLoading: true });
    fetch(API_URL, {})
      .then(response => response.text())
      .then(data =>
        this.setState(
          { eventsData: JSON.parse(data), isLoading: false },
          () => {
            this.renderEventsList(this.state.eventsData[1]);
          }
        )
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  getNumberOfColumns = () => {
    let screenWidth = window.innerWidth;
    let margin = 60;
    let eventCardWidth = 260;
    let numberOfColumns = Math.floor((screenWidth - margin) / eventCardWidth);
    return numberOfColumns;
  };

  renderEventsList = (eventsData, indexOfClickedEvent = null) => {
    const eventsList = [];
    let insertTrailerBeforeIndex = null;
    let idOfClickedEvent = null;
    if (indexOfClickedEvent) {
      let numberOfColumns = this.getNumberOfColumns();
      let rowNumberOfClickedEvent =
        Math.ceil(indexOfClickedEvent / numberOfColumns) - 1;
      insertTrailerBeforeIndex = rowNumberOfClickedEvent * numberOfColumns;
    }
    Object.keys(eventsData).forEach((movieId, index) => {
      const { EventTitle, ShowDate } = eventsData[movieId];
      if (
        insertTrailerBeforeIndex !== null &&
        index === insertTrailerBeforeIndex &&
        this.state.isTrailerRowShowing
      ) {
        idOfClickedEvent = Object.keys(eventsData)[indexOfClickedEvent - 1];
        const {
          EventTitle,
          ShowDate,
          TrailerURL,
          EventLanguage,
          EventDimension
        } = eventsData[idOfClickedEvent];
        let videoId = TrailerURL.split("=")[1].split("&")[0];
        eventsList.push(
          <EventTrailerRow
            title={EventTitle}
            date={ShowDate}
            eventLanguage={EventLanguage}
            dimension={EventDimension}
            trailerURL={`https://www.youtube.com/embed/${videoId}`}
            hideTrailer={this.hideTrailer}
          />
        );
      }
      eventsList.push(
        <EventCard
          isSelected={idOfClickedEvent === movieId}
          key={movieId}
          title={EventTitle}
          date={ShowDate}
          posterURL={`https://in.bmscdn.com/events/moviecard/${movieId}.jpg`}
          onClick={() => this.showTrailer(index + 1)}
        />
      );
    });
    this.setState({ eventsList });
  };

  showTrailer = indexOfClickedEvent => {
    this.setState(
      {
        isTrailerRowShowing: true
      },
      () => {
        this.renderEventsList(this.state.eventsData[1], indexOfClickedEvent);
      }
    );
  };

  hideTrailer = () => {
    this.setState(
      {
        isTrailerRowShowing: false
      },
      () => {
        this.renderEventsList(this.state.eventsData[1]);
      }
    );
  };

  render() {
    const { isLoading, eventsData, eventsList } = this.state;
    return (
      <div className="trailers-page">
        <div className="header">
          <Video className="header__logo" size={45} />
          <h1 className="header__title">BookMyShow</h1>
        </div>
        {isLoading ? <p>Loading...</p> : null}
        {eventsData[1] ? (
          Object.keys(eventsData[1]).length === 0 ? (
            <p>No data</p>
          ) : (
            <div className="events-list">{eventsList}</div>
          )
        ) : null}
      </div>
    );
  }
}

export default TrailersContainer;
