import logo from './logo.svg';
import './App.css';

function App() {

  return (
    <div className="app">
       <Header/>
        <SectionsContainer/>
    </div>
  );
}

function Header() {
  
  const navArray = [
    "home",
    "paintings",
    "sculptures",
    "about",
    "contact"
  ]

  const navItemsDisplay = navArray.map((menuItem) => (
    <li><a href={"#" + menuItem}>{menuItem}</a></li>
  ))
  
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



function SectionsContainer() {
  return(
    <main>
      <GallerySection/>
      <section id="paintings">
        <h2>Paintings</h2>
      </section>
      <section id="sculptures">
        <h2>Sculptures</h2>
      </section>
      <section id="about">
        <h2>About</h2>
      </section>
      <section id="contact">
        <h2>Contact</h2>
      </section>
    </main>
  )
}

function GallerySection() {

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
