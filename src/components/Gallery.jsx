import React from "react";

import MacComp from "../images/gallery/mac-desktop.svg";
import Whisky from "../images/gallery/Whisky_Final.jpg";
import Typewriter from "../images/gallery/Shining_Typewriter.svg";
import Wine from "../images/gallery/red_wine_final.svg";

import HangryPart1 from "../images/the-cat-says-moo/1_Hangry.jpg";
import HangryPart2 from "../images/the-cat-says-moo/2_Hangry.jpg";
import HangryPart3 from "../images/the-cat-says-moo/3_Hangry.jpg";

function Gallery(props){

    const OctoKaiserLogoAnimation = "octo-animation/Octo-animation.html";

    const imageDatabase = {
        VectorArt: [
            [OctoKaiserLogoAnimation, "Octo-Kaiser Logo"],
            [MacComp, "Mac Desktop Computer"],
            [Typewriter, "Shining Typewriter"],
            [Whisky, "Whisky Glass"],
            [Wine, "Wine Glass"]  
        ],
        CatSaysMoo: [
            [HangryPart1, "Hangry Part 1"], 
            [HangryPart2, "Hangry Part 2"], 
            [HangryPart3, "Hangry Part 3"]
        ]
    };
    
    // gets the url location and removes spaces
    const pageRequest = props.pageTitle.replace(/\s/g, '');
    const imgRequest = parseInt(props.imageRequest);

    //gets length of requested dictionary 
    const dictLength = imageDatabase[pageRequest].length;
    // calculates to last image when belwo zero and to zero once imgRequest reaches dictLength
    const imgNum = imgRequest % dictLength;

    const imageSource = imageDatabase[pageRequest][imgNum][0];
    const imgAlt = imageDatabase[pageRequest][imgNum][1];

    // chooses between img or iframe(for html animation)
    // id and onLoad passes length of current list into App
    // key moves on to next image before image has loade
    const imageTag = <img src={imageSource} key={imageSource} alt={imgAlt} id={imageDatabase[pageRequest].length} className={`${pageRequest} currentImage`} onLoad={e => {props.getDictLength(e); props.isImageLoading(e)}} ></img>;
    const iFrameTag = <iframe src={imageSource} key={imageSource} title={imgAlt} id={imageDatabase[pageRequest].length} className="animation currentImage" onLoad={e => {props.getDictLength(e); props.isImageLoading(e)}} ></iframe>;
    const imageType = ( imageSource === OctoKaiserLogoAnimation ) ? iFrameTag : imageTag;

    return (
        <div className="image-wrapper">
            <div className="img-space">
                {/* #region - for loading screen */}
                <span className="loader" style = {{display:props.loaderVisibility}}>
                    <span className="loader-inner"></span>
                </span>
                {/* #endregion - for loading screen */}
                {imageType}
            </div>
        </div>
    )
}

export default Gallery