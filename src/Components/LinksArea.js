import { structure } from "../structure.js";
import React from "react";

export default function LinksArea(props) {
  const site = props.site;
  let website;

  if ((site === "DT") | (site === "SF") | (site === "SC")) {
    // this bit is clearly not the right way to do this
    if (site === "DT") {
      website = require("../webSites/dhammaTalks.js").dhammaTalks;
    } else if (site === "SC") {
      website = require("../webSites/suttaCentral.js").suttaCentral;
    } else {
      website = require("../webSites/suttaFriends.js").suttaFriends;
    }
  }

  const linksArray = [];
  const { rootUrl, rootCardUrl } = website.constants;
  console.log(rootUrl);
  for (var key in website) {
    if (website.hasOwnProperty(key)) {
      console.log(key);
      if (key !== "constants") {
        linksArray.push(
          <>
            <a className="card-link" href={rootCardUrl + website[key].links.card} target="_blank" rel="noreferrer">
              {structure[key].book_abbreviation[0]}
            </a>
            <a className="all-link" rel="noreferrer" href={rootUrl + website[key].links.all} target="_blank">
              All
            </a>
          </>
        );
      }
    }
  }
  return (
    <>
      <div id="links-area">
        {linksArray.map((link, index) => (
          <div key={index} className="book-link-area">
            {link}
          </div>
        ))}
      </div>
      <div id="websites-links">
        <a href="https://suttacentral.net" target="_blank" rel="noreferrer">
          SuttaCentral.net
        </a>
        <a href="https://suttafriends.org" target="_blank" rel="noreferrer">
          SuttaFriends.org
        </a>
        <a href="https://www.dhammatalks.org/suttas/index.html" target="_blank" rel="noreferrer">
          DhammaTalks.org
        </a>
        <a
          href="https://www.ancient-buddhist-texts.net/Texts-and-Translations//index.htm"
          target="_blank"
          rel="noreferrer"
        >
          ancient-buddhist-texts.net
        </a>
      </div>
    </>
  );
}
