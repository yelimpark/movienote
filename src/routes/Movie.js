import React, { useState, useRef } from "react";
// import { render } from "@testing-library/react";
import Review from "../components/Review";
import Axios from "axios";
import "./Movie.css";
import MovieReviewSample from "./MovieReviewSample.js";

class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.location.state.id,
      poster: props.location.state.poster,
      title: props.location.state.title,
      date: props.location.state.date,
      overview: props.location.state.overview,
      casts: [],
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    /* 원래는 디비로 전송, 페이지 새로고침 */
 }

  componentDidMount() {
    this.getMovieCasts();
  }

  getMovieCasts = async (id = this.state.id) => {
    const cast_url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b1306395631dc84cde154096963c13db`;
    const { data } = await Axios.get(cast_url);
    this.setState({
      casts: data.cast,
    });
  };

  render() {
    const { id, poster, title, date, overview, casts } = this.state;
    const posterSrc =
      poster === null ? null : "http://image.tmdb.org/t/p/w185" + poster;

    function showReview() {}

    return (
      <div>
        <div className="movie_detail_header">
          {poster === null ? (
            <div className="header_noposter poster"></div>
          ) : (
            <img className="header_poster poster" src={posterSrc} alt={title} />
          )}
          <div className="header_info">
            <h2>{title}</h2>
            <p>{date}</p>

            <button>Movie Note</button>
            <button onClick="showReview()">Review</button>
          </div>
        </div>

        <form className="reviewPage" onSubmit={this.handleSubmit}>
          <header>
            <div className="reviewCancel">취소</div>
            <input type="submit" value="저장" class="reviewSave" />
            <em> {title}</em>
          </header>
          <div className="reviewTextarea">
            <textarea value={this.state.value} onChange={this.handleChange} placeholder="리뷰 작성"></textarea>
          </div>
        </form>

        <div className="movie_detail_contents">
          <section className="overview">
            <h3 className="section_header">Overview</h3>
            <p>{overview}</p>
          </section>

          <section className="Top Billed Cast">
            <h3 className="section_header">Top_Billed_Cast</h3>
            <div className="casts">
              {casts.map((cast) => {
                return (
                  <CastInfo
                    key={cast.id}
                    character={cast.character}
                    name={cast.name}
                    profile_path={cast.profile_path}
                  />
                );
              })}
            </div>
          </section>

          <section className="Review">
            <h3 className="section_header">Review</h3>
            <div>
              <MovieReviewSample />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

class CastInfo extends React.Component {
  render() {
    const { character, name, profile_path } = this.props;
    const new_profile_path =
      profile_path === null
        ? null
        : "https://image.tmdb.org/t/p/w138_and_h175_face/" + profile_path;
    return (
      <div className="cast">
        {profile_path === null ? (
          <div className="profile_null"></div>
        ) : (
          <img className="profile_img" src={new_profile_path} alt={name} />
        )}
        <div className="cast_info">
          <p className="cast_name">{name}</p>
          <p className="cast_character">{character}</p>
        </div>
      </div>
    );
  }
}

export default Movie;
