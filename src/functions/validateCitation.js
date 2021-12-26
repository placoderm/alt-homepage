import { structure } from "../structure.js";

export default function validateCitation(book, numbers) {
  const books = Object.keys(structure);
  const { firstNumber, secondNumber, verseFlag, chapterFlag } = numbers;
  let error = "";

  function parseSutta() {
    const maxSuttaNumber = structure[book].suttas;
    if (firstNumber > maxSuttaNumber) {
      error = "tooHigh";
    }
  }

  function parseChapter() {
    const maxChapterNumber = Object.keys(structure[book].chapters).length;

    if (firstNumber > maxChapterNumber) {
      error = "ChaptertooHigh";
    } else if (secondNumber) {
      const maxSuttaNumber = structure[book].chapters[firstNumber].max;
      if (secondNumber > maxSuttaNumber) {
        error = "SuttatooHigh";
      }
    }
  }

  books.forEach(bookKey => {
    const format = structure[bookKey].format[0];
    if (book === bookKey) {
      if (format === "sutta") {
        parseSutta();
      } else if (format === "chapter") {
        parseChapter();
      }
    }
  });

  return { book, firstNumber, secondNumber, verseFlag, chapterFlag, error };
}

// console.log(
//   validateCitation("mn", {
//     firstNumber: 34,
//     secondNumber: 45,
//     verseFlag: false,
//     chapterFlag: false,
//   })
// );
