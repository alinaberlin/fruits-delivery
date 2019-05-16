import Flow from "./Flow";
import Movie from "./Movie";
import React from "react";
import Us from "./Us";

const Landing = () => {
    return (
        <div id="landing" className="content">
            <Flow />
            <Movie />
            <Us />
        </div>
    );
};

export default Landing;
