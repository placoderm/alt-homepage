import { structure } from "../structure.js";
import React from "react";

export default function LinksArea() {
  const linksArray = [];
  for (var key in structure) {
    if (structure.hasOwnProperty(key)) {
      linksArray.push(
        <>
          <a
            className="card-link"
            href={"https://suttacentral.net/pitaka/sutta" + structure[key].links.card}
            target="_blank"
            rel="noreferrer"
          >
            {structure[key].book_abbreviation}
          </a>
          <a
            className="all-link"
            rel="noreferrer"
            href={"https://suttacentral.net" + structure[key].links.all}
            target="_blank"
          >
            All
          </a>
        </>
      );
    }
  }
  return (
    <div id="links-area">
      {linksArray.map((link, index) => (
        <div key={index} className="book-link-area">
          {link}
        </div>
      ))}
    </div>
  );
}
