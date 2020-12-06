import React, { useState } from 'react';
import './App.css';
import GallerySection from './Gallery'

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
      else if (section === "contact") sectionHtmlDisplay = <ContactSection/>;

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

function ContactSection(props) {

  return(
    <section id="contact">
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </section>
  )
}

export default App;
