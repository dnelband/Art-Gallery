import React from 'react';
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

  const galleryDisplay = imgArray.map((img) => (
    <img src={"img/stuff/" + img}/>
  ))


  return(
    <section id="gallery">
      {galleryDisplay}
    </section>
  )

}

export default App;
