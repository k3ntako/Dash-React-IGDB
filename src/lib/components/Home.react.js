import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GameCard from './GameCard.react';

const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";
const URL = "https://api-v3.igdb.com/games";

const init = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "user-key": "14a17fa27f92934ca9043462ea7ac356"
  },
  body: "fields name,category,age_ratings,rating_count,aggregated_rating,category,cover,storyline,summary,websites,url,popularity,rating,dlcs,expansions,first_release_date,total_rating,total_rating_count; " +
   "sort popularity desc; where themes != (42) & release_dates.platform = (48,49,6); limit 24;"
}


// data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"

/**
* Homepage
*/
export default class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      games: []
    }
  }
  componentDidMount(){
    fetch(CORS_ANYWHERE + URL, init).
      then(response => response.json()).
      then(body => {
        this.setState({ games: body });
      });
  }

  renderGames(){
    const games = this.state.games;
    if( !games || !games.length ){
      return null;
    }

    return games.map( game => <GameCard game={game} /> );
  }

  render() {
    return (
      <div>
        <h1>Video Games!</h1>
        <div className="cardsGrid">
          { this.renderGames() }
        </div>
      </div>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {
  /**
  * The game info that will be displayed
  */
  game: PropTypes.object,
};
