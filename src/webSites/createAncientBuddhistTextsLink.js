import { structure } from "../structure.js";
import { ancientBuddhistTexts } from "./ancientBuddhistTexts.js";

export default function createAncientBuddhistTextsLink(props) {
  const { book, firstNumber, secondNumber, verseFlag, chapterFlag, error } = props;
  //console.log("dhammaTalks props");
  //console.log(props);
  const books = Object.keys(structure);
  let url = "";

  function createSuttaLink() {
    //console.log(dhammaTalks[book].links.all);
    const available = ancientBuddhistTexts[book].available;
    if (available.length > 0) {
      for (let i = 0; i < available.length; i++) {
        if (firstNumber === available[i][0]) {
          url = available[i][1];
          console.log("here's the ABT link!!");
          console.log(url);
        }
      }
    }
  }

  function createChapterLink() {}

  if (error === "") {
    books.forEach(bookKey => {
      const format = structure[bookKey].format[0];
      if (book === bookKey) {
        if (format === "sutta") {
          createSuttaLink();
        } else if (format === "chapter") {
          createChapterLink();
        }
      }
    });
  }
  return url;
}
