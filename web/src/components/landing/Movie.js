import React from "react";
import YouTube from "react-youtube";

class Movie extends React.Component {
    render() {
        const opts = {
            height: "390",
            width: "100%",
            playerVars: {
                // https://www.youtube.com/watch?v=5g20u8EfMdg&t=42s
                autoplay: 0
            }
        };

        return (
             <YouTube videoId="5g20u8EfMdg" opts={opts} onReady={this._onReady} />
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}

export default Movie;
