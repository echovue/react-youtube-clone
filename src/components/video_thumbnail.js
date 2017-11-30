import React from "react";

const VideoThumbnail = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    <li onClick={() => onVideoSelect(video)} className="list-group-item">
      <div class="media-body">
        <div class="media-heading">{video.snippet.title}</div>
      </div>
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>
      </div>
    </li>
  );
};

export default VideoThumbnail;
