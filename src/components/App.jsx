import React, { useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Heading from "./Heading";
import { NavBar, PageLinks } from "./Navigation";
import Gallery from "./Gallery";

function App(){

    const location = useLocation();

    // Simplifies location hash - pass to <Heading> and <Gallery>
    // 1st replace hyphens with spaces, 2nd remove special characters, 3rd capitalize first letter of every word
    const pageTitle = location.hash.replace(/-/g, ' ').replace(/[^a-zA-Z ]/g, "").replace(/(^\w{1})|(\s{1}\w{1})|(?:- |\d\. ).*/g, match => match.toUpperCase());

    // current image index
    const [imageNum, setImageNum] = useState(0);
    // list length of current image
    const dictLengthRef = useRef();
    // display state for load screen 
    const [loaderVisibility , setLoaderVisibility ] = useState("inline-block");

    function increaseImageNum(imageNum){
        
        if ((imageNum + 1 ) > (dictLengthRef.current) ){

            setImageNum(_prevImageNum => 0);
        }
        else {    
            setImageNum(prevImageNum => prevImageNum + 1);
        }
    }

    function decreaseImageNum(imageNum){

        if ( imageNum === 0 ){
            setImageNum(_prevImageNum => (dictLengthRef.current - 1) );
        }
        else{
            setImageNum(prevImageNum => prevImageNum - 1);
        }
    }

    return(
        <div id="grid">
            <Heading 
                // takes Heading title from url pathname
                urlTitle= {pageTitle}
            />
            <Gallery 
                // sets ref to current dictionary length
                getDictLength = {(e) => {dictLengthRef.current = parseInt(e.target.id)}}
                currentPage = {location.hash}
                imageRequest = {imageNum}
                pageTitle = {pageTitle}
                 // toggle display style for load screen - not visible
                isImageLoading = {(e) => {setLoaderVisibility(_prevloaderVisibility => "none")}}
                loaderVisibility= {loaderVisibility}
            />
            <NavBar 
                nextImg={(e) => {increaseImageNum(imageNum)}}
                prevImg={(e) => {decreaseImageNum(imageNum)}}
                // load screen visible
                isImageLoading = {(e) => {setLoaderVisibility(_prevloaderVisibility => "inline-block")}}
            />
            <PageLinks 
                currentPage = {location.hash} 
                // resets imageNum to 0 when link is pressed
                resetImgNum = {(e) => {setImageNum(_prevImageNum => 0)}}
                // load screen visible
                isImageLoading = {(e) => {setLoaderVisibility(_prevloaderVisibility => "inline-block")}}
            />
        </div>
    );
}

export default App;