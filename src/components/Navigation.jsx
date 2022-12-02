import React from "react";
import { Link } from 'react-router-dom';

function NavBar(props){

    return (
        <div className="img-links-wrapper">
            <p><i className="arrow right" onClick={e => {props.nextImg(e); props.isImageLoading(e)}}></i></p>
            <p><i className="arrow left" onClick={e => {props.prevImg(e); props.isImageLoading(e)}}></i></p>
        </div>
    )
}

function PageLinks(props){

    const VectorArt = "#/vector-art";
    const CatSays = "#/cat-says-moo";
 
    const linkList = [VectorArt, CatSays];

    const currentPgIdx = linkList.indexOf(props.currentPage);
    // cycles back to begining
    const nextLink= (currentPgIdx % linkList.length) ? 0 : (currentPgIdx + 1);
    const nextPage = linkList[nextLink];

    // 1st replace hyphens with spaces, 2nd remove special characters, 3rd capitalize first letter of every word
    const nextLinkTitle = nextPage.replace(/-/g, ' ').replace(/[^a-zA-Z ]/g, "").replace(/(^\w{1})|(\s{1}\w{1})|(?:- |\d\. ).*/g, match => match.toUpperCase());


     return(
        <div className="nav-link-wrapper">
            <Link to={nextPage} className="nav-link links" onClick={e => {props.resetImgNum(e); props.isImageLoading(e)}}>{nextLinkTitle} {'>'}</Link>
        </div>
     )
}

export {NavBar, PageLinks};