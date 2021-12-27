import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import clsx from "clsx";
import { structure } from "./structure.js";
import favicon from "./SC-AltHomePage.png";
import SC from "./images/SC.png";
import faviconTitle from "./functions/faviconTitle.js";
import LinksArea from "./Components/LinksArea.js";
import parseInput from "./functions/parseInput.js";
import parseBookName from "./functions/parseBookName.js";
import parseNumbers from "./functions/parseNumbers.js";
import validateCitation from "./functions/validateCitation.js";
import createSuttaCentralLink from "./webSites/createSuttaCentralLink.js";
import createSuttaFriendsLink from "./webSites/createSuttaFriendsLink.js";
import createDhammaTalksLink from "./webSites/createDhammaTalksLink.js";
import createAncientBuddhistTextsLink from "./webSites/createAncientBuddhistTextsLink.js";
import LinkButton from "./Components/LinkButton.js";

function App() {
  faviconTitle(favicon, "Alt Homepage");
  let [inputUrl, setInputUrl] = useState("");
  let [translator, setTranslator] = useState("/en/sujato");
  let [finalCitation, setFinalCitation] = useState("");
  let [finalUrl, setFinalUrl] = useState("");
  let [layout, setLayout] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  let [inRangeMessage, setInRangeMessage] = useState("");
  let [suttaFriendsLink, setSuttaFriendsLink] = useState("");
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
          if (structure[book].chapters && secondNumber > 0) {
            if (firstNumber > Object.keys(structure[book].chapters).length) {
              setErrorMessage(`Chapter number too high. Does not exist in ${structure[book].pali_name}`);
            } else if (secondNumber > structure[book].chapters[firstNumber]) {
              setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            } else {
              setFinalCitation(`${book}${secondNumber + structure[book].conversion_offset[firstNumber]}`);
              setInRangeMessage("Citation changed in URL.");
            }
          } else if (firstNumber > structure[book].suttas) {
            setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if (firstNumber > 0) {
            setFinalCitation(`${book}${firstNumber}`);
            setInRangeMessage("");
          }
        }

        // ---------------------ANGUTTARA NIKAYA & SAMYUTTA NIKAYA
        if ((book === "an") | (book === "sn") && firstNumber > 0) {
          const chapter = firstNumber;
          const sutta = secondNumber;

          if (chapter > Object.keys(structure[book].chapters).length) {
            setErrorMessage(`Chapter number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if (!sutta) {
            setFinalCitation(`${book}${chapter}`);
            setTranslator("");
            setInRangeMessage("URL given is to whole chapter");
          } else if (sutta > structure[book].chapters[chapter].max) {
            setErrorMessage(`Sutta number too high. Does not exist in ${structure[book].pali_name}`);
            setFinalCitation("");
          } else if ((secondNumber > 0) & structure[book].chapters[chapter].range_suttas.length) {
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
          } else if (secondNumber > 0) {
            setFinalCitation(`${book}${chapter}.${sutta}`);
            setInRangeMessage("");
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
            const [lower, upper] = structure[book].range_suttas[firstNumber - 1];
            setFinalCitation(`${book}${lower}-${upper}`);
            setErrorMessage(`URL given is for chapter. For verse, add ‘v’ before number`);
          }
        }

        // =========================== END OF BOOKS
      } else {
        setErrorMessage("");
      }
      //console.log(urlInputArray);
    }
    if (finalCitation === "") {
      setFinalUrl("https://suttacentral.net/");
    } else {
      if (translator !== "/en/sujato") {
        finalLayout = "";
      } else {
        finalLayout = layout;
      }
      setFinalUrl("https://suttacentral.net/" + finalCitation + translator + finalLayout);
    }

    // // console.log("parsed book name 🔽");
    // // console.log(parseBookName(inputUrl));
    // // console.log("parsed number section👇🏻");
    // // console.log(parseNumbers(inputUrl));
    // if (parseBookName(inputUrl)) {
    //   //console.log("validateCitation 📍");
    //   //console.log(validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)));
    //   const result = validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl));
    //   //console.log(layout);
    //   createSuttaCentralLink({
    //     ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
    //     translator,
    //     layout,
    //   });
    //   setSuttaFriendsLink(
    //     createSuttaFriendsLink({
    //       ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
    //     })
    //   );
    //         createDhammaTalksLink({
    //     ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
    //   });
    //   createAncientBuddhistTextsLink({
    //     ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
    //   });
    // }
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
        <div id="message-area">
          <span id="error-message">{errorMessage}</span>
          <span id="in-range-message">{inRangeMessage}</span>
        </div>
        <div id="url-button" className={clsx({ nolink: finalCitation === "", "url-button-class": true })}>
          <img className="logoImage" width="25px" src={SC}></img>
          <a target="_blank" rel="noreferrer" href={finalUrl}>
            {finalUrl}
          </a>
        </div>
        <LinkButton
          site={"SF"}
          url={createSuttaFriendsLink({
            ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
          })}
        />
        <LinkButton
          site={"DT"}
          url={createDhammaTalksLink({
            ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
          })}
        />
        <LinkButton
          site={"ABT"}
          url={createAncientBuddhistTextsLink({
            ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
          })}
        />
        <div
          id="translator-button-area"
          className="radiobuttonarea"
          value={translator}
          onChange={e => setTranslator(e.target.value)}
        >
          <label>
            <input type="radio" value="" name="translator" /> All
          </label>

          <label>
            <input type="radio" value="/pli/ms" name="translator" /> Pāli
          </label>
          <label>
            <input type="radio" value="/en/sujato" name="translator" defaultChecked /> Sujato
          </label>
          <label>
            <input type="radio" value="/en/bodhi" name="translator" /> Bodhi
          </label>
          <label>
            <input type="radio" value="/en/suddhaso" name="translator" /> Suddhaso
          </label>
        </div>
        <div
          id="layout-button-area"
          className={clsx({ disabled: translator !== "/en/sujato", radiobuttonarea: true })}
          value={layout}
          onChange={e => setLayout(e.target.value)}
        >
          <label>
            <input disabled={translator !== "/en/sujato"} type="radio" value="?layout=plain" name="layout" /> English
            Only
          </label>
          <label>
            <input disabled={translator !== "/en/sujato"} type="radio" value="?layout=linebyline" name="layout" /> Line
            by Line
          </label>
          <label>
            <input disabled={translator !== "/en/sujato"} type="radio" value="?layout=sidebyside" name="layout" /> Side
            by Side
          </label>
          <label>
            <input disabled={translator !== "/en/sujato"} type="radio" value="" name="layout" /> Unspecified
          </label>
        </div>
      </div>
      <LinksArea />
    </div>
  );
}

export default App;
