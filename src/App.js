import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import clsx from "clsx";
import { structure } from "./structure.js";
import favicon from "./SC-AltHomePage.png";
import faviconTitle from "./faviconTitle.js";
import LinksArea from "./LinksArea.js";

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

  function fixAltBookCitations(book) {
    if ((book === "itv") | (book === "it")) {
      return "iti";
    } else if (book === "khp") {
      return "kp";
    } else {
      return book;
    }
  }

  function fixAltVerseChapterFlags(flag) {
    if ((flag === "v") | (flag === "verse")) {
      return "v";
    } else if ((flag === "c") | (flag === "ch") | (flag === "chapter")) {
      return "c";
    } else {
      return flag;
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
      // 2 -> verse/chapter flag
      // 3 -> firstNumber (either sutta or chapter)
      // 4 -> secondNumber (chapter)
      // 5 -> translator
      // 6 -> layout
      const urlInputArray = inputUrl.match(
        /(dn|mn|snp|sn|an|ud|khp|kp|iti|itv|it|vv|pv|dhp)[ .-]*(verse|v|chapter|ch|c|)[ .-]*(\d*)[ .-]*(\d*)[ .-]*(sujato|bodhi|suddhasso)*[ .-]*(english|line|side)*/i
      );

      if (urlInputArray !== null) {
        const book = fixAltBookCitations(urlInputArray[1].toLowerCase());
        const verseChapterFlag = fixAltVerseChapterFlags(urlInputArray[2].toLowerCase());
        const firstNumber = parseInt(urlInputArray[3], 10);
        const secondNumber = parseInt(urlInputArray[4], 10);

        // ---------------------DN, MN, Khp, Iti, Pv, Vv
        if (["dn", "mn", "kp", "iti", "pv", "vv"].includes(book) && firstNumber > 0) {
          if (secondNumber > 0) {
            console.log({ secondNumber });
            if (firstNumber > Object.keys(structure[book].chapters).length) {
              setErrorMessage(`Chapter number too high. Does not exist in ${structure[book].pali_name}`);
            } else if (secondNumber > structure[book].chapters[firstNumber]) {
              setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            } else {
              setFinalCitation(`${book}${secondNumber + structure[book].conversion_offset[firstNumber]}`);
              setInRangeMessage("You are using a different citation system. New citation is provided.");
            }
          } else if (firstNumber > structure[book].suttas) {
            setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if (firstNumber > 0) {
            setFinalCitation(`${book}${firstNumber}`);
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
          } else if (secondNumber > 0) {
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

        // --------------------------- UDANA
        if (book === "ud" && firstNumber > 0) {
          const chapter = firstNumber;
          const sutta = secondNumber;
          // if there is no second number
          //    if firstNumber <= total number of suttas
          //      then convert to proper citation
          //      else reject as sutta being too high
          // if there *is* a second number
          //      if the firstNumber > number of chapters
          //         then reject as chapter number too high
          //          else if secondNumber<= number of suttas in chapter
          //              then output proper citation
          //              else reject as sutta number too high
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

        // --------------------------- SUTTA NIPĀTA
        if (book === "snp" && firstNumber > 0) {
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

        // --------------------------- DHAMMAPADA
        if (book === "dhp" && firstNumber > 0) {
          if (firstNumber > structure[book].suttas) {
            setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
            // 26 is hard coded twice below. could be set based on number of chapters
          } else if (((firstNumber > 26) | (verseChapterFlag === "v")) & (verseChapterFlag !== "c")) {
            for (let i = 0; i < structure[book].range_suttas.length; i++) {
              const [lower, upper] = structure[book].range_suttas[i];
              if ((firstNumber >= lower) & (firstNumber <= upper)) {
                setFinalCitation(`${book}${lower}-${upper}`);
                setInRangeMessage("Citation given is found in a range of citations");
                break;
              }
            }
          } else if (verseChapterFlag === "c") {
            if (firstNumber > 26) {
              setErrorMessage(`Chapter number too high. Does not exist in ${structure[book].pali_name}`);
              setFinalCitation("");
            } else {
              //process chapter into url
              const [lower, upper] = structure[book].range_suttas[firstNumber - 1];
              setFinalCitation(`${book}${lower}-${upper}`);
            }
          } else {
            // output two links: one as verse and one as chapter
          }

          // ==========================
          // if firstNumber>423 THEN reject as "verse number too high"
          // if firstNumber>27 OR includes v flag THEN process as verse number
          // if inculdes ch flag
          //    if first number is <27 THEN process as chapter number
          //        ELSE reject as "chapter number too high"
          // if firstNumber<27 THEN generate verse and chapter link
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

  // ========================================== RETURN
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
      <LinksArea />
    </div>
  );
}

export default App;
