import React, { useState } from 'react';
import './App.css';

function App(props) {

  const navArray = [
    "home",
    "paintings",
    "sculptures",
    "about",
    "contact"
  ]

  return (
    <div className="app">
      <Header
        navArray={navArray} 
      />
      <SectionsContainer
        navArray={navArray} 
      />
    </div>
  );
}

function Header(props) {

  const navItemsDisplay = props.navArray.map((menuItem) => {

    let menuItemId = menuItem;

    if (menuItem === "home") menuItemId = "gallery";

    return (
      <li><a href={"#" + menuItemId}>{menuItem}</a></li>
    )
  })
  
  return (
    <header>
      <h1>Charlotte Karlbom</h1>
      <nav>
        <ul>
         {navItemsDisplay}
        </ul>
      </nav>
    </header>
  )
}

function SectionsContainer(props) {

  const sectionsDisplay = props.navArray.map((section,index) => {
      let sectionHtmlDisplay = (
        <section id={section}>
          <h2>{section}</h2>
        </section>
      )
      if (section === "home") sectionHtmlDisplay = <GallerySection/>;

      return (
        <React.Fragment key={index}>
          {sectionHtmlDisplay}
        </React.Fragment>
      )
    }
  )
  return(
    <main>
     {sectionsDisplay}
    </main>
  )
}

function GallerySection(props) {

  const [ showSlider, setShowSlider ] = useState(false)

  const [ currentImgIndex, setCurrentImgIndex ] = useState(0)

  console.log(currentImgIndex)

  const imgArray = [
    "61emzBXXDdL._AC_SY450_.jpg", 
    "223254_4897046472283_boti_stuff_a_loons_01.jpg",
    "fluffstore-fluffstuff-ai3-stoffwindel-ueberhose.png",
    "kawaii-girls-stuff_74565-647.jpg",
    "logo.png",
    "maxresdefault.jpg",
    "mezzanine_731.jpg",
    "peppapig1711a.jpg",
    "stuff.png",
    "The-Stuff-poster.jpg",
    "twitter_1024x512px_var1-300x150.png"
  ]

  function onGalleryImgClick(img, index){
    setShowSlider(true)
    setCurrentImgIndex(index)
  }

  const galleryDisplay = imgArray.map((img, index) => (
    <img onClick={() => onGalleryImgClick(img, index)} src={"img/stuff/" + img}/>
  ))

  function onOverlayClick() {
    setShowSlider(false)
  }
    
  let overlayDisplay;
  if(showSlider === true){
    overlayDisplay = (
      <SlideShow
        onOverlayClick={onOverlayClick}
        imgArray={imgArray}
        currentImgIndex={currentImgIndex}
        setCurrentImgIndex={setCurrentImgIndex}
      />
    )
  }

  return(
    <section id="gallery">
      <div id="gallery-pictures">{galleryDisplay}</div>
      {overlayDisplay}
    </section>
  )
}

function SlideShow(props) {
  console.log("Slide Show Component");
  console.log(props);

  const [sliderWidth, setSliderWidth] = useState(window.innerWidth / 2)
  console.log(sliderWidth)
  
  function onNavButtonClick(value) {

    let indexValue = value;
    if(value < 0) indexValue = props.imgArray.length -1;
    else if(value === props.imgArray.length) indexValue = 0; 

    props.setCurrentImgIndex(indexValue)
  }

  function onSlideShowImageLoad(e) {
    setSliderWidth(e.target.clientWidth)
    console.log(e.target.clientWidth);
  }

  return(
    <div id="overlay">
      <div id="overlay-black" onClick={props.onOverlayClick}></div>
       <div id="slideshow" style={{marginLeft:"-" + ((sliderWidth / 2) + 100) + "px"}}>
         <div className="nav-button left" onClick={() => onNavButtonClick(props.currentImgIndex -1)}></div>
          <img src={"img/stuff/" + props.imgArray[props.currentImgIndex]} onLoad={(e) => onSlideShowImageLoad(e)}></img>
          <div className="nav-button right" onClick={() => onNavButtonClick(props.currentImgIndex +1)}></div>
       </div>
    </div>
  )
}

export default App;
