import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ratingClassName = (ratingStr) => {
  const rating = Number(ratingStr);

  if( rating > 90 ){
    return "veryHigh";
  }else if( rating > 80 ){
    return "high";
  }else if( rating > 70 ){
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
    const ratingHTML = game.rating && <span className={"rating " + ratingClassName(rating)}>
      { rating }
    </span>;

    return (
      <div className="card">
        <div className="title">
          <a href={game.url}>
            <h3>{game.name}</h3>
          </a>
          { ratingHTML }
        </div>
        <div>
          Rating: { rating }/100
        </div>
        <div>
          Rating Count: { game.rating_count }
        </div>
        <p>
          { game.storyline }
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
