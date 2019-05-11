import React, { Component } from 'react';
import './style.css';
import _ from 'lodash';
import SearchBar from  "../../components/Youtube/search_bar"
import YTSearch from 'youtube-api-search';
import VideoList from '../../components/Youtube/video_list';
import VideoDetail from '../../components/Youtube/video_detail';
const API_KEY = 'AIzaSyDVwj59JCyEm2n4lmlTC7YUZDN8z5SRANY';

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      selectedVideo: null
       };
       this.videoSearch('green salad')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos : videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
    return (
      <div>
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
