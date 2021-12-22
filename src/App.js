import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import clsx from "clsx";

import { structure } from "./structure.js";
import favicon from "./SC-AltHomePage.png";
import faviconTitle from "./faviconTitle.js";

function App() {
  faviconTitle(favicon, "Alt Homepage");
  let [inputUrl, setInputUrl] = useState("");
  let [translator, setTranslator] = useState("sujato");
  let [finalCitation, setFinalCitation] = useState("");
  let [finalUrl, setFinalUrl] = useState("");
  let [layout, setLayout] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [inRangeMessage, setInRangeMessage] = useState("");

  function handleUrlInputChange(event) {
    setInputUrl(event.target.value);
  }

  //allows enter press to open link in new tab
  function handleKeyPress(event) {
    if (event.key === "Enter" && finalCitation !== "") {
      console.log("enter press here! ");
      window.open(finalUrl, "_blank");
    }
  }

  // this may not be the right way to be doing things!
  useEffect(() => {
    let finalLayout;
    setInRangeMessage("");
    setErrorMessage("");

    if (inputUrl !== "") {
      setFinalCitation("");
      //test first part to see if it is good book citation and split off two number areas
      // 0 -> Whole find
      // 1 -> book, i.e. book letters
      // 2 -> firstNumber (either sutta or chapter)
      // 3 -> secondNumber (chapter)
      // 4 -> translator
      // 5 -> layout
      const urlInputArray = inputUrl.match(
        /(dn|mn|snp|sn|an|ud|kp|vv|pv)[ .-]*(\d*)[ .-]*(\d*)[ .-]*(sujato|bodhi|suddhasso)*[ .-]*(english|line|side)*/i
      );
      if (urlInputArray !== null) {
        const book = urlInputArray[1].toLowerCase();
        const firstNumber = parseInt(urlInputArray[2], 10);
        const secondNumber = parseInt(urlInputArray[3], 10);
        // ---------------------DIGHA NIKAYA, MAJJHIMA NIKAYA KHUDDAKAPATHA
        if (
          (book === "dn") | (book === "mn") | (book === "kp") | (book === "pv") | (book === "vv") &&
          firstNumber > 0
        ) {
          const sutta = firstNumber;
          if (firstNumber > structure[book].suttas) {
            setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if (sutta > 0) {
            setFinalCitation(`${book}${sutta}`);
            setInRangeMessage("");
          }
        }

        // ---------------------SAMYUTTA NIKAYA
        if (book === "sn") {
          setErrorMessage("Samyutta Nikaya is not workign yet");
          if (parseInt(urlInputArray[2], 10) > 56) {
            setErrorMessage("Chapter too high");
          }
        }
        // ---------------------ANGUTTARA NIKAYA
        if (book === "an" && firstNumber > 0) {
          const chapter = firstNumber;
          const sutta = secondNumber;
          console.log(chapter);
          console.log(Object.keys(structure[book].chapters).length);
          if (chapter > Object.keys(structure[book].chapters).length) {
            setErrorMessage(`Chapter number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if (sutta > structure[book].chapters[chapter].max) {
            setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          }
          //test for the ranges
          else {
            for (let i = 0; i < structure[book].chapters[chapter].range_suttas.length; i++) {
              const [lower, upper] = structure[book].chapters[chapter].range_suttas[i];
              if ((sutta >= lower) & (sutta <= upper)) {
                setFinalCitation(`${book}${chapter}.${lower}-${upper}`);
                setInRangeMessage("Citation given is found in a range of citations");
                break;
              } else {
                setFinalCitation(`${book}${chapter}.${sutta}`);
                setInRangeMessage("");
              }
            }
          }
        }

        // else if (sutta > 0) {
        //   setFinalCitation(`${book}${chapter}.${sutta}`);
        //   setInRangeMessage("");
        // }

        // --------------------------- UDANA
        if ((book === "snp") | (book === "ud") && firstNumber > 0) {
          const chapter = firstNumber;
          const sutta = secondNumber;
          if (firstNumber > Object.keys(structure[book].chapters).length) {
            setErrorMessage(`Chapter number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if (sutta > structure[book].chapters[chapter]) {
            setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if (sutta > 0) {
            setFinalCitation(`${book}${chapter}.${sutta}`);
            setInRangeMessage("");
          }
        }

        // =========================== END OF BOOKS
      } else {
        setErrorMessage("");
      }
      console.log(urlInputArray);
    }
    if (finalCitation === "") {
      setFinalUrl("https://suttacentral.net/");
    } else {
      if (translator !== "sujato") {
        finalLayout = "";
      } else {
        finalLayout = layout;
      }
      setFinalUrl("https://suttacentral.net/" + finalCitation + "/en/" + translator + finalLayout);
    }
  }, [finalCitation, inputUrl, translator, layout]);

  return (
    <div className="App">
      <div id="url-builder">
        <div id="input-field-container">
          <label htmlFor="user-citation">Enter your citation</label>
          <input
            id="user-citation"
            autoFocus
            type="text"
            value={inputUrl}
            name="address"
            onChange={handleUrlInputChange}
            onKeyPress={handleKeyPress}
            placeholder="ex. an8.34"
          />
        </div>
        <div id="error-message">{errorMessage}</div>
        <div id="translator-button-area" value={translator} onChange={e => setTranslator(e.target.value)}>
          <label>
            <input type="radio" value="sujato" name="translator" /> Sujato
          </label>
          <label>
            <input type="radio" value="bodhi" name="translator" /> Bodhi
          </label>
          <label>
            <input type="radio" value="suddhaso" name="translator" /> Suddhaso
          </label>
        </div>
        <div
          id="layout-button-area"
          className={clsx({ disabled: translator !== "sujato" })}
          value={layout}
          onChange={e => setLayout(e.target.value)}
        >
          <label>
            <input disabled={translator !== "sujato"} type="radio" value="?layout=plain" name="layout" /> English Only
          </label>
          <label>
            <input disabled={translator !== "sujato"} type="radio" value="?layout=linebyline" name="layout" /> Line by
            Line
          </label>
          <label>
            <input disabled={translator !== "sujato"} type="radio" value="?layout=sidebyside" name="layout" /> Side by
            Side
          </label>
        </div>
        <div id="url-button">
          <a target="_blank" href={finalUrl}>
            {finalUrl}
          </a>
        </div>
        <div id="error-message-in-range">{inRangeMessage}</div>
      </div>
    </div>
  );
}

export default App;
