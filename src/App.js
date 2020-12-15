import React, { useEffect, useState } from 'react';
import './App.css';
import GallerySection from './Gallery'
import $ from 'jquery';

function App(props) {

  const [navigation, setNavigation] = useState([])

  useEffect(() => {
    getNavigation()
  },[])

  function getNavigation() {
    fetch('/navigation')
    .then(res => res.text())
    .then(res =>{
      console.log(JSON.parse(res));
      setNavigation(JSON.parse(res));
    })
  }


  return (
    <div className="app">
      <Header
        navigation={navigation} 
      />
      <SectionsContainer
        navigation={navigation} 
      />
    </div>
  );
}

function Header(props) {

  const navItemsDisplay = props.navigation.map((menuItem) => {

    return (
      <li><a href={menuItem.nav_link}>{menuItem.title}</a></li>
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

  const sectionsDisplay = props.navigation.map((section,index) => {
      let sectionHtmlDisplay = (
        <section id={section.nav_link}>
          <h2>{section.title}</h2>
        </section>
      )
      if (section.title === "home") sectionHtmlDisplay = <GallerySection/>;
      else if (section.title === "contact") sectionHtmlDisplay = <ContactSection/>;
      else if (section.title === "about") sectionHtmlDisplay = <AboutSection/>;

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

function AboutSection(props) {


  return (
   <section id="about">
     <div className="title"><h1>About me</h1></div>

     <div class="row">
       <div class="col-4">
        <div className="profile-img-container"><img src="img/pictures/profile.jpg"/></div>
       </div>
       <div class="col-8">
        <div className="description">
          <p>Jag var verksam som sjukgymnast under drygt 15 ar, men har nu lämnat varden för att kunna fokusera pa konsten.<br/> 
            Jag har alltid varit intresserad av konst och konsthantverk, 
            arbetade tidigare mest med lera men för dryga 10 ar sedan upptäckte jag 
            glädjen och fascinationen i att uttrycka mig genom maleriet.<br/> Jag är i huvudsak autodidakt, 
            har gatt diverse kvälls- och dagkurser. Jag malar figurativt i olja
            och arbetar även med collage i tidningspaper.</p>
          </div>
        </div>
      </div>
   </section>

  )
}

function ContactSection(props) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    var letters
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
      postMessage();
    }
}

function postMessage() {
  console.log(
    "what"
  )

  $.ajax({
    url:'/messages',
    type:'POST',
    data: {name:name, email:email, msg:message }
  }).done(function(res) {
    setIsSubmitted(true)
  })
}

  let nameErrorDisplay, emailErrorDisplay;
  if (errors.length > 0) {
    errors.forEach(function(error, index){
     if (error.type === "name") nameErrorDisplay = <small>{error.msg}</small>
      else if (error.type === "email") emailErrorDisplay = <small>{error.msg}</small>
    })
  }

  let formDisplay = (
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
  )

  if (isSubmitted === true) formDisplay=<p>Form submitted!</p>

  return(
    <section id="contact">
      {formDisplay}
    </section>
  )
}

export default App;
