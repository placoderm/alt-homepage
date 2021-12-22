import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import clsx from "clsx";
import { anTable } from "./anTable.js";
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
    if (inputUrl !== "") {
      setFinalCitation("");
      //test first part to see if it is good book citation and split off two number areas
      const urlInputArray = inputUrl.match(/(dn|mn|sn|an)\s*(\d*)[ .-]*(\d*)/i);
      if (urlInputArray !== null) {
        const citation = urlInputArray[1].toLowerCase();
        const firstNumber = parseInt(urlInputArray[2], 10);
        const secondNumber = parseInt(urlInputArray[3], 10);
        if (citation === "dn" && firstNumber > 0) {
          if (firstNumber > 34) {
            setErrorMessage("Sutta number too high. Does not exist in Digha Nikaya");
            setFinalCitation("");
          } else {
            setFinalCitation(`${citation}${firstNumber}`);
            setErrorMessage("");
          }
        }
        if (citation === "mn" && firstNumber > 0) {
          if (firstNumber > 152) {
            setErrorMessage("Sutta number too high. Does not exist in Majjhima Nikaya");
            setFinalCitation("");
          } else {
            setFinalCitation(`${citation}${firstNumber}`);
            setErrorMessage("");
          }
        }
        if (citation === "sn") {
          setErrorMessage("Samyutta Nikaya is not workign yet");
          if (parseInt(urlInputArray[2], 10) > 56) {
            setErrorMessage("Chapter too high");
          }
        }
        if (citation === "an") {
          if (firstNumber > 11) {
            setErrorMessage("Chapter too high. Does not exist in Anguttara Nikaya");
            return;
          }
          if (secondNumber) {
            for (let i = 0; i < anTable[firstNumber].length; i++) {
              //handle non range citations held in [0,X,X] array
              if (anTable[firstNumber][i][0] === 0) {
                if ((secondNumber >= anTable[firstNumber][i][1]) & (secondNumber <= anTable[firstNumber][i][2])) {
                  setFinalCitation(`${citation}${firstNumber}.${secondNumber}`);
                  setInRangeMessage("");
                  break;
                }
                // handle citations in [X, X] array
              } else if ((secondNumber >= anTable[firstNumber][i][0]) & (secondNumber <= anTable[firstNumber][i][1])) {
                //check for non-range citations
                if (anTable[firstNumber][i][0] === anTable[firstNumber][i][1]) {
                  setFinalCitation(`${citation}${firstNumber}.${anTable[firstNumber][i][0]}`);
                  setInRangeMessage("");
                  break;
                } else {
                  // handle range citations
                  setFinalCitation(
                    `${citation}${firstNumber}.${anTable[firstNumber][i][0]}-${anTable[firstNumber][i][1]}`
                  );
                  setInRangeMessage("Citation given is found in a range of citations");
                  break;
                }
              }
            }
          }
        }
      } else {
        setErrorMessage("");
      }
      console.log(urlInputArray);
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
