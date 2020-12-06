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

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState([])

  function onNameChange(e) {
    setName(e.target.value)
  }

  function onEmailChange(e) {
    setEmail(e.target.value)
  }

  function onMessageChange(e) {
    setMessage(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault();
    let newErrors = [];

    var letters = /^[A-Za-z]+$/;
    if (name.length === 0) {
      const nameError = {
        msg: "Write something here", 
        type: "name"
      }
      newErrors.push(nameError)
    }
    else if (!name.match(letters)){
      const nameError = {
        msg: "Please, don't use symbols", 
        type: "name"
      }
      newErrors.push(nameError)
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        const emailError = {
          msg: "Please, use a valid email", 
          type: "email"
        }
        newErrors.push(emailError)
      }


    setErrors(newErrors)
    if (newErrors.length === 0) {
      console.log("all good")
    }

  }

  let nameErrorDisplay, emailErrorDisplay;
  if (errors.length > 0) {
    errors.forEach(function(error, index){
     if (error.type === "name") nameErrorDisplay = <small>{error.msg}</small>
      else if (error.type === "email") emailErrorDisplay = <small>{error.msg}</small>
    })
  }

  return(
    <section id="contact">
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} className="form-control" placeholder="Enter Name" onChange={(e) => onNameChange(e)}/>
          {nameErrorDisplay}
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" value={email} className="form-control" placeholder="Enter email" onChange={(e) => onEmailChange(e)}/>
          {emailErrorDisplay}
        </div>
        <div class="form-group">
          <label>Your message</label>
          <textarea className="form-control" rows="5" onChange={(e) => onMessageChange(e)}>{message}</textarea>
        </div>
        <button type="submit" onClick={(e) => onSubmit(e)} className="btn btn-primary">Submit</button>
      </form>
    </section>
  )
}

export default App;
