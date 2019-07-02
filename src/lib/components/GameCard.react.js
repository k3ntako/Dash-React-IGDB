import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ratingClassName = (ratingStr) => {
  const rating = Number(ratingStr);

  if( rating > 90 ){
    return "veryHigh";
  }else if( rating > 70 ){
    return "high";
  }else if( rating > 50 ){
    return "medium";
  }else if( rating <= 50 ){
    return "low";
  }

  return "";
}

/**
* Each card displayed
*/
export default class GameCard extends Component {
  constructor(props){
    super(props);

    this.state = {
      artwork: null
    }
  }

  render() {
    const game = this.props.game;

    const rating = Math.floor(game.rating);
    let ratingHTML, ratingCount;
    if( rating ){
      ratingHTML = <div className={"rating " + ratingClassName(rating)}>
        <span>
          { rating }
        </span>
      </div>;

      ratingCount = <div>
        Rating Count: { game.rating_count }
      </div>
    }

    let url = game.url;
    url = url.replace(/www/, "next");

    return (
      <div className="card">
        <div className="title">
          <a href={url} target="_blank">
            <h3>{game.name}</h3>
          </a>
          { ratingHTML }
        </div>
        { ratingCount }
        <p>
          { game.storyline || "No description." }
        </p>
      </div>
    );
  }
}

GameCard.defaultProps = {};

GameCard.propTypes = {
  /**
  * The game info that will be displayed
  */
  game: PropTypes.object,
};
