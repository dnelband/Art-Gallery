import React, { useEffect, useState } from 'react';
import './Gallery.css';
import { SRLWrapper } from "simple-react-lightbox";


function GallerySection(props) {

  const [pictures, setPictures] = useState([])

    const [ showSlider, setShowSlider ] = useState(false)
    const [ currentImgIndex, setCurrentImgIndex ] = useState(0)
  
    console.log(currentImgIndex)

    useEffect(() => {
      getPictures()
    },[])

    function getPictures() {
      fetch('/pictures')
      .then(res => res.text())
      .then(res =>{
        //console.log(JSON.parse(res));
        setPictures(JSON.parse(res));
      })
    }
  
    function onGalleryImgClick(img, index){
      setShowSlider(true)
      setCurrentImgIndex(index)
    }
  
    const galleryDisplay = pictures.map((picture, index) => (
      <GalleryImage
          picture={picture}
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
          pictures={pictures}
          currentImgIndex={currentImgIndex}
          setCurrentImgIndex={setCurrentImgIndex}
        />
      )
    }
    const options={
      thumbnails:{
        showThumbnails:false
      },
      buttons: {
        showDownloadButton: false
      }
    }
    return(
      <section id="gallery"> 
        <SRLWrapper 
         options={options}>
          <div id="gallery-pictures">{galleryDisplay}</div>
        </SRLWrapper>
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
          <div className="image-container">
            <img src={props.picture.filename}/>
          </div>
        </div>
    )
  }
  
  function SlideShow(props) {

    const [nextIndex, setNextIndex] = useState(null)

    function onNavButtonClick(value) {
      let indexValue = value;
      if(value < 0) indexValue = props.pictures.length -1;
      else if(value === props.pictures.length) indexValue = 0; 
      setNextIndex(indexValue)
      props.setCurrentImgIndex(indexValue)
    }
  
    return(
      <div id="overlay">
        <div id="overlay-black" onClick={props.onOverlayClick}></div>
         <div id="slideshow">
           <div className="nav-button left" onClick={() => onNavButtonClick(props.currentImgIndex -1)}></div>
            <img src={props.pictures[props.currentImgIndex].filename}/>
            <div className="nav-button right" onClick={() => onNavButtonClick(props.currentImgIndex +1)}></div>
         </div>
      </div>
    )
  }

  export default GallerySection;