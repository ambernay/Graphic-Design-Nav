import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Heading from "./Heading";
import { NavBar, PageLinks } from "./Navigation";
import Gallery from "./Gallery";

function App(){

    const location = useLocation();
    
    // Simplifies location pathname - pass to <Heading> and <Gallery>
    // 1st remove everything before last slash, 2nd replace hyphens with spaces, 3rd remove special characters, 4th capitalize first letter of every word
    const pageTitle = location.pathname.replace(/^\/[^\/\r\n]+(?=\/)/, "").replace(/-/g, ' ').replace(/[^a-zA-Z ]/g, "").replace(/(^\w{1})|(\s{1}\w{1})|(?:- |\d\. ).*/g, match => match.toUpperCase());
    
    // #region - generate number for button press
    const [imageNum, setImageNum] = useState(0);

    function increaseImageNum() {
        setImageNum(imageNum + 1);
    }
    function decreaseImageNum() {
        setImageNum(imageNum - 1);
    }

    // #endregion - generate number for button press

    return(
        <div id="grid">
            <Heading 
                // takes Heading title from url pathname
                urlTitle= {pageTitle}
            />
            <Gallery 
                currentPage = {location.pathname}
                imageRequest = {imageNum}
                pageTitle = {pageTitle}
            />
            <NavBar 
                nextImg={((e) => increaseImageNum(e))}
                prevImg={((e) => decreaseImageNum(e))}
            />
            <PageLinks 
                currentPage = {location.pathname}
            />
        </div>
    );
}

export default App;