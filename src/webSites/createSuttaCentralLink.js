import { structure } from "../structure.js";

export default function createSuttaCentralLink(props) {
  const { book, firstNumber, secondNumber, verseFlag, chapterFlag, error, translator, layout } = props;
  //console.log("props");
  //console.log(props);
  const books = Object.keys(structure);
  let suttaCentralUrl = "";

  function createSuttaLink() {
    //console.log(structure[book].links.all);
    suttaCentralUrl = "https://suttacentral.net" + structure[book].links.all + firstNumber + translator;
    console.log("here's the link!!");
    console.log(suttaCentralUrl);
  }

  function createChapterLink() {}

  if (error === "" && firstNumber > 0) {
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
}
