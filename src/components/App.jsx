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

    const [imageNum, setImageNum] = useState(0);
    const dictLengthRef = useRef();

    function increaseImageNum(imageNum){
        
        if ((imageNum + 1 ) > (dictLengthRef.current) ){

            setImageNum(prevImageNum => prevImageNum = 0);
            console.log(imageNum);
        }
        else {    
            setImageNum(prevImageNum => prevImageNum + 1);
        }
    }

    function decreaseImageNum(imageNum){

        if ( imageNum === 0 ){
            setImageNum(prevImageNum => prevImageNum = (dictLengthRef.current - 1) );
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
                getDictLength = {((e) => {dictLengthRef.current = parseInt(e.target.id)})}
                currentPage = {location.hash}
                imageRequest = {imageNum}
                pageTitle = {pageTitle}
            />
            <NavBar 
                nextImg={((e) => {increaseImageNum(imageNum)})}
                prevImg={((e) => {decreaseImageNum(imageNum)})}
            />
            <PageLinks 
                currentPage = {location.hash} 
                // resets imageNum to 0 when link is pressed
                resetImgNum = {((e) => {setImageNum(prevImageNum => prevImageNum = 0)})}
            />
        </div>
    );
}

export default App;