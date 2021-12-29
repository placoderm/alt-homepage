import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import clsx from "clsx";
import favicon from "./images/favicon.png";
import faviconTitle from "./functions/faviconTitle.js";
import LinksArea from "./Components/LinksArea.js";
import parseBookName from "./functions/parseBookName.js";
import parseNumbers from "./functions/parseNumbers.js";
import validateCitation from "./functions/validateCitation.js";
import createAncientBuddhistTextsLink from "./webSites/createAncientBuddhistTextsLink.js";
import createWebsiteLink from "./webSites/createWebsiteLink.js";
import LinkButton from "./Components/LinkButton.js";

function App() {
  faviconTitle(favicon, "Citation Wizzard");
  let [inputUrl, setInputUrl] = useState("");
  let [translator, setTranslator] = useState("/en/sujato");
  let [layout, setLayout] = useState("");
  let [errorMessage, setErrorMessage] = useState("");
  //let [inRangeMessage, setInRangeMessage] = useState("");

  //allows enter press to open link in new tab
  function handleKeyPress(event) {
    if (
      event.key === "Enter" &&
      createWebsiteLink({
        site: "SC",
        ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
      }) !== ""
    ) {
      window.open(
        createWebsiteLink({
          site: "SC",
          ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
        }) +
          translator +
          layout,
        "_blank"
      );
    }
  }

  // displays the error message when one exists
  useEffect(() => {
    let { error } = validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl));
    setErrorMessage(error);
  }, [inputUrl]);

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
            onChange={event => setInputUrl(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ex. an8.34"
          />
        </div>
        <div id="message-area">
          <span id="error-message">{errorMessage}</span>
          {/* <span id="in-range-message">{inRangeMessage}</span> */}
        </div>
        {/*       LINK BUTTON AREA        */}
        <div id="link-button-area">
          <LinkButton
            site={"SC"}
            url={
              createWebsiteLink({
                site: "SC",
                ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
              }) + translator
            }
          />
          <LinkButton
            site={"SF"}
            url={createWebsiteLink({
              site: "SF",
              ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
            })}
          />
          <LinkButton
            site={"DT"}
            url={createWebsiteLink({
              site: "DT",
              ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
            })}
          />
          <LinkButton
            site={"ABT"}
            url={createAncientBuddhistTextsLink({
              ...validateCitation(parseBookName(inputUrl), parseNumbers(inputUrl)),
            })}
          />
        </div>
        <div id="radiobutton-area-box-label">SuttaCentral Options</div>
        <div id="radiobutton-area-box">
          <div
            id="translator-button-area"
            className="radiobuttonarea"
            value={translator}
            onChange={e => setTranslator(e.target.value)}
          >
            <label>
              <input type="radio" value="" name="translator" /> All Translators
            </label>

            <label>
              <input type="radio" value="/en/sujato" name="translator" defaultChecked /> Bhante Sujato
            </label>
            <label>
              <input type="radio" value="/en/bodhi" name="translator" /> Bhante Bodhi
            </label>

            <label>
              <input type="radio" value="/pli/ms" name="translator" /> Pāli
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
              <input disabled={translator !== "/en/sujato"} type="radio" value="?layout=linebyline" name="layout" />{" "}
              Line by Line
            </label>
            <label>
              <input disabled={translator !== "/en/sujato"} type="radio" value="?layout=sidebyside" name="layout" />{" "}
              Side by Side
            </label>
            <label>
              <input disabled={translator !== "/en/sujato"} type="radio" value="" name="layout" /> Unspecified
            </label>
          </div>
        </div>
      </div>
      <LinksArea site={"SC"} />
      {/* <h3>SuttaCentral</h3>
      <LinksArea site={"SC"} />
      <hr />
      <h3>SuttaFriends</h3>
      <LinksArea site={"SF"} />
      <hr />
      <h3>DhammaTalks</h3>
      <LinksArea site={"DT"} /> */}
    </div>
  );
}

export default App;
