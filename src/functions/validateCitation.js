import { structure } from "../structure.js";

export default function validateCitation(book, numbers) {
  const books = Object.keys(structure);
  let { firstNumber, secondNumber, verseFlag, chapterFlag } = numbers;
  let error = "";

  //                               SUTTA
  function parseSutta() {
    const maxSuttaNumber = structure[book].suttas;
    if (firstNumber > maxSuttaNumber) {
      error = `Sutta number too high. Not in ${structure[book].pali_name}.`;
    }
  }

  //                              CHAPTER
  function parseChapter() {
    const maxChapterNumber = Object.keys(structure[book].chapters).length;
    if (verseFlag === true) {
      convertVerseToChapterSutta();
    }
    if (error !== "") {
      return;
    }
    if (firstNumber > maxChapterNumber) {
      // first number is larger than number of chapters
      // HOWEVER it might be able to be transformed into a workign citation, e.g. ud56===ud6.6
      if (structure[book].conversion_offset && firstNumber <= structure[book].suttas) {
        // if there is a conversion_offset object and the first number is less than the total number of suttas
        Object.keys(structure[book].chapters).some(chapter => {
          const numberOfSuttasInChapter = structure[book].chapters[chapter];
          if (firstNumber - structure[book].conversion_offset[chapter] <= numberOfSuttasInChapter) {
            secondNumber = firstNumber - structure[book].conversion_offset[chapter];
            firstNumber = parseInt(chapter, 10);
            return true;
          }
          return false;
        }); // end of the .some loop
      } else {
        error = `Chapter number too high. Not in ${structure[book].pali_name}.`;
      }
    } else if (secondNumber) {
      const maxSuttaNumber = structure[book].chapters[firstNumber];
      if (secondNumber > maxSuttaNumber) {
        error = `Sutta number too high. Not in ${structure[book].pali_name}.`;
      }
    }

    //                   Verse --> Chapter for SUTTA
    function convertVerseToChapterSutta() {
      if (structure[book].format[1] && structure[book].format[1] === "verse") {
        // book can be represented in verse format
        const chapterVersePairs = structure[book].verses;
        if (chapterVersePairs) {
          for (let i = 0; i < chapterVersePairs.length; i++) {
            const [[chapter, sutta], [lower, upper]] = chapterVersePairs[i];

            // const [chapter, sutta] = chapterVersePairs[i][0];
            // const [lower, upper] = chapterVersePairs[i][1];
            if ((firstNumber >= lower) & (firstNumber <= upper)) {
              firstNumber = chapter;
              secondNumber = sutta;
              i = chapterVersePairs.length;
              verseFlag = false;
            }
          }
          if (verseFlag === true) {
            error = `Verse number too high. Not in ${structure[book].pali_name}.`;
          }
        }
      }
    }
  }

  // this is the main function

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
