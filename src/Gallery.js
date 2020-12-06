import React, { useEffect, useState } from 'react';
import './Gallery.css';

function GallerySection(props) {

    const [ showSlider, setShowSlider ] = useState(false)
    const [ currentImgIndex, setCurrentImgIndex ] = useState(0)
  
    console.log(currentImgIndex)
  
    const imgArray = [
     "1.jpg",
     "2.jpg",
     "3.jpg",
     "4.jpg",
     "5.jpg",
     "6.jpg",
     "7.jpg",
     "8.jpg",
     "9.jpg",
     "1.jpg",
     "2.jpg",
     "3.jpg",
     "4.jpg",
     "5.jpg",
     "6.jpg",
     "7.jpg",
     "8.jpg",
     "9.jpg"
    ]
  
    function onGalleryImgClick(img, index){
      setShowSlider(true)
      setCurrentImgIndex(index)
    }
  
    const galleryDisplay = imgArray.map((img, index) => (
      <GalleryImage
          img={img}
          index={index}
          onGalleryImgClick={onGalleryImgClick}
          >
      </GalleryImage>
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

  function GalleryImage(props) {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true)            
        }, ( props.index ) * 5);
    },[])

    let cssClass = "gallery-img-item";
    
    if (isVisible === true) cssClass += "  is-visible";

    return(
        <div className={cssClass}>
          <img onClick={() => props.onGalleryImgClick(props.img, props.index)} src={"img/stuff/" + props.img}/>
        </div>
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

  export default GallerySection;