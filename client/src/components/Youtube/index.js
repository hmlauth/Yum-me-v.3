import React, { Component } from 'react';
import './style.css';
import _ from 'lodash';
import SearchBar from  "./search_bar"
import VideoList from './video_list';
import VideoDetail from './video_detail';
import API from '../../utils/API';
// import Header from "../Header"

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
       };
       this.videoSearch('heston blumenthal mushroom soup')
  }

  videoSearch = searchTerm => {
      API.videoSearch(searchTerm)
      .then(videos => {
        this.setState({ 
            videos : videos.data,
            selectedVideo: videos.data[0]
          });
      })
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
    return (
      <div>
        <h2 id='header'>
          Sharpen Your Skills!
        </h2>
        <SearchBar onSearchTermChange={videoSearch}/>
        <div className="row">
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
        </div>
      </div>
    );
  }
}  

export default Youtube;
