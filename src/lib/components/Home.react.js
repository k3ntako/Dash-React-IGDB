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
   "where themes != (42); limit 24; "
}

const getSearchInit = ( searchTerm ) => {
  let searchInit = Object.assign({}, init);
  searchInit.body = `search: "${searchTerm}"; ${searchInit.body}`;
  return searchInit;
}

/**
* Homepage
*/
export default class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      games: [],
      searchedGames: [],
      search: "",
      searched: false
    }
  }
  componentDidMount(){
    let homepageInit = Object.assign({}, init);
    homepageInit.body += " sort popularity desc;"
    fetch(CORS_ANYWHERE + URL, homepageInit).
      then(response => response.json()).
      then(body => {
        this.setState({ games: body });
      });
  }

  renderGames(){
    const { games, searchedGames, searched } = this.state;
    if( searchedGames && searchedGames.length ){
      return searchedGames.map( game => <GameCard game={game} /> );
    }if( searched ){
      return <h3>No results</h3>
    }else if( games && games.length ){
      return games.map( game => <GameCard game={game} /> );
    }

    return null;
  }

  onChange(e){
    this.setState({
      search: e.target.value
    })
  }

  search(){
    const search = this.state.search;

    fetch(CORS_ANYWHERE + URL, getSearchInit(search)).
      then(response => response.json()).
      then(body => {
        this.setState({
          searchedGames: body,
          searched: true
        });
      });
  }

  listenForEnter(event){
    if(event.key === 'Enter'){
      this.search();
    }
  }

  render() {
    return (
      <div>
        <div className="nav">
          <a href="/">
            <h1>Video Games!</h1>
          </a>
          <div className="search">
            <div>
              <input onChange={this.onChange.bind(this)}
                onKeyPress={this.listenForEnter.bind(this)} />
            </div>
          </div>
        </div>
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
