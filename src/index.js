import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
const YOUTUBE_API_KEY = "";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      mainVideo: null
    };

    this.youtubeSearch("People are Awesome");
  }

  youtubeSearch(term) {
    if (YOUTUBE_API_KEY === "") {
      Rollbar.critical("YouTube API Key Required in index.js");
    }
    YTSearch({ key: YOUTUBE_API_KEY, term: term }, videos => {
      this.setState({
        videos,
        mainVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.youtubeSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoList
          onVideoSelect={mainVideo => this.setState({ mainVideo })}
          videos={this.state.videos}
        />
        <VideoDetail video={this.state.mainVideo} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
