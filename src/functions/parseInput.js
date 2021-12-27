import { structure } from "../structure.js";

export default function parseInput(userInput) {
  const urlInputArray = userInput.match(
    /(dn|mn|snp|sn|an|ud|khp|kp|iti|itv|it|vv|pv|dhp|)[ .-]*(verse|v|chapter|ch|c|)[ .-]*(\d*)[ .-]*(\d*)/i
  );
  const books = Object.keys(structure);
  const book = urlInputArray[1].toLowerCase();
  const verseChapterFlag = urlInputArray[2].toLowerCase();
  const firstNumber = parseInt(urlInputArray[3], 10);
  const secondNumber = parseInt(urlInputArray[4], 10);
  let error = null;

  // loop through books
  // when book found, loop through formats
  books.forEach(bookKey => {
    if (book === bookKey) {
      //console.log(structure[bookKey].format[0]);
      if (structure[bookKey].format[0] === "sutta") {
        parseSutta();
      } else if (structure[bookKey].format[0] === "chapter") {
        parseChapter();
      }
    }
  });

  function parseSutta() {
    const maxSuttaNumber = structure[book].suttas;
    if (firstNumber > maxSuttaNumber) {
      error = "tooHigh";
    }
  }

  function parseChapter() {
    const maxChapterNumber = Object.keys(structure[book].chapters).length;

    if (firstNumber > maxChapterNumber) {
      error = "tooHigh";
    } else {
      const maxSuttaNumber = structure[book].chapters[firstNumber].max;
      console.log({ maxSuttaNumber });
      if (secondNumber > maxSuttaNumber) {
        error = "tooHigh";
      }
    }
  }

  return {
    book: book,
    verseChapterFlag: verseChapterFlag,
    firstNum: firstNumber,
    secondNum: secondNumber,
    error: error,
  };
}
