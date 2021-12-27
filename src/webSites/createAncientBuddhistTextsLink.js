import { structure } from "../structure.js";
import { ancientBuddhistTexts as website } from "./ancientBuddhistTexts.js";

export default function createAncientBuddhistTextsLink(props) {
  const { book, firstNumber, secondNumber, verseFlag, chapterFlag, error } = props;
  const books = Object.keys(structure);
  let url = "";
  const { rootUrl, suffixUrl, chapterConnector } = website.constants;

  function createSuttaLink() {
    const available = website[book].available;
    if (available.length > 0) {
      for (let i = 0; i < available.length; i++) {
        if (firstNumber === available[i][0]) {
          url = rootUrl + available[i][1] + suffixUrl;
        }
      }
    }
  }

  function createChapterLink() {
    const available = website[book].available;
    if (website[book].complete) {
      url = rootUrl + available[firstNumber][secondNumber - 1][1] + suffixUrl;
    } else if (Object.keys(available).length > 0) {
      Object.keys(available).forEach(chapterKey => {
        if (parseInt(chapterKey, 10) === firstNumber) {
          available[chapterKey].forEach(sutta => {
            if (secondNumber === sutta) {
              url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
            }
          });
        }
      });
    }
  }

  if (error === "" && firstNumber > 0) {
    books.forEach(bookKey => {
      const format = structure[bookKey].format[0];
      if (book === bookKey) {
        if (format === "sutta") {
          createSuttaLink();
        } else if (format === "chapter" && secondNumber > 0) {
          createChapterLink();
        }
      }
    });
  }
  return url;
}
