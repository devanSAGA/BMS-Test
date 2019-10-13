import React, { Component } from "react";
import { Video } from "react-feather";
import MovieCard from "../MovieCard";
import TrailerRow from "../TrailerRow";
import "./TrailersContainer.css";

class TrailersContainer extends Component {
  state = {
    moviesData: [],
    isLoading: false,
    error: "",
    showTrailerRow: false,
    moviesList: []
  };

  componentDidMount() {
    let API_URL =
      "https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs";
    this.setState({ isLoading: true });
    fetch(API_URL, {})
      .then(response => response.text())
      .then(data =>
        this.setState(
          { moviesData: JSON.parse(data), isLoading: false },
          () => {
            this.renderMoviesList(this.state.moviesData[1]);
          }
        )
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  getNumberOfColumns = () => {
    let screenWidth = window.innerWidth;
    let margin = 60;
    let movieCardWidth = 260;
    let numberOfColumns = Math.floor((screenWidth - margin) / movieCardWidth);
    return numberOfColumns;
  };

  renderMoviesList = (moviesData, indexOfClickedMovie = null) => {
    const moviesList = [];
    let insertTrailerBeforeIndex = null;
    let idOfClickedMovie = null;
    if (indexOfClickedMovie) {
      let numberOfColumns = this.getNumberOfColumns();
      let rowNumberOfClickedMovie =
        Math.ceil(indexOfClickedMovie / numberOfColumns) - 1;
      insertTrailerBeforeIndex = rowNumberOfClickedMovie * numberOfColumns;
    }
    Object.keys(moviesData).forEach((movieId, index) => {
      const { EventTitle, ShowDate } = moviesData[movieId];
      if (
        insertTrailerBeforeIndex !== null &&
        index === insertTrailerBeforeIndex &&
        this.state.showTrailerRow
      ) {
        idOfClickedMovie = Object.keys(moviesData)[indexOfClickedMovie - 1];
        const {
          EventTitle,
          ShowDate,
          TrailerURL,
          EventLanguage,
          EventDimension
        } = moviesData[idOfClickedMovie];
        let videoId = TrailerURL.split("=")[1].split("&")[0];
        moviesList.push(
          <TrailerRow
            title={EventTitle}
            date={ShowDate}
            eventLanguage={EventLanguage}
            dimension={EventDimension}
            trailerURL={`https://www.youtube.com/embed/${videoId}`}
            hideTrailer={this.hideTrailer}
          />
        );
      }
      moviesList.push(
        <MovieCard
          isSelected={idOfClickedMovie === movieId}
          key={movieId}
          title={EventTitle}
          date={ShowDate}
          posterURL={`https://in.bmscdn.com/events/moviecard/${movieId}.jpg`}
          onClick={() => this.showTrailer(index + 1)}
        />
      );
    });
    this.setState({ moviesList });
  };

  showTrailer = indexOfClickedMovie => {
    this.setState(
      {
        showTrailerRow: true
      },
      () => {
        this.renderMoviesList(this.state.moviesData[1], indexOfClickedMovie);
      }
    );
  };

  hideTrailer = () => {
    this.setState(
      {
        showTrailerRow: false
      },
      () => {
        this.renderMoviesList(this.state.moviesData[1]);
      }
    );
  };

  render() {
    const { isLoading, moviesData, moviesList } = this.state;
    return (
      <div className="trailers-page">
        <div className="header">
          <Video className="header__logo" size={45} />
          <h1 className="header__title">BookMyShow</h1>
        </div>
        {isLoading ? <p>Loading...</p> : null}
        {moviesData[1] ? (
          Object.keys(moviesData[1]).length === 0 ? (
            <p>No data</p>
          ) : (
            <div className="movies-list">
              {/* {Object.keys(moviesData[1]).map((movieId, index) => {
                const { EventTitle, ShowDate } = moviesData[1][movieId];
                return (
                  <MovieCard
                    key={movieId}
                    title={EventTitle}
                    date={ShowDate}
                    posterURL={`https://in.bmscdn.com/events/moviecard/${movieId}.jpg`}
                  />
                );
              })} */}
              {moviesList}
            </div>
          )
        ) : null}
      </div>
    );
  }
}

export default TrailersContainer;
