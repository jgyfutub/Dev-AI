import Navigation from "../components/Navigation";
import homeLogo from './home.png';
import { useEffect } from "react";
import "./Info.css";


// const useScript = url => {
//   useEffect(() => {
//     const script = document.createElement('script');

//     script.src = url;
//     script.async = true;

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     }
//   }, [url="./infoo.js"]);
// };

const Info = () => {
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  // Add an event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", reveal);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);
  return (
    <>
      <Navigation />
      <br /><br /><br />
      <div Style={{
        backgroundImage: `url(${homeLogo})`
      }}>
        <section>

          <div class="hui">
            <h1>
              <span class="ur">YOU'RE    A</span>
              <div class="message">
                <div class="word1">student</div>
                <div class="word2">researcher</div>
                <div class="word3">industrialist</div>
              </div>
            </h1>
          </div>
        </section>
        <section>
          <div class="container reveal">
            <h2>For student</h2>
            <div class="text-container">
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container reveal">
            <h2>For Researchers</h2>
            <div class="text-container">
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container reveal">
            <h2>For Industries</h2>
            <div class="text-container">
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
              <div class="text-box">
                <h3>Section Text</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                  eius molestiae perferendis eos provident vitae iste.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default Info;