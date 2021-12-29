import { structure } from "../structure.js";
import { suttaFriends as website } from "./suttaFriends.js";

export default function createSuttaFriendsLink(props) {
  const { book, firstNumber, secondNumber, verseFlag, chapterFlag, error } = props;
  const books = Object.keys(structure);
  let url = "";
  const { rootUrl, suffixUrl, chapterConnector } = website.constants;

  function createSuttaLink() {
    const available = website[book].available;
    if (website[book].complete) {
      url = rootUrl + website[book].links.all + firstNumber + suffixUrl;
    } else if (available.length > 0) {
      for (let i = 0; i < available.length; i++) {
        if (firstNumber === available[i]) {
          url = rootUrl + website[book].links.all + firstNumber + suffixUrl;
        }
      }
    }
  }

  function createChapterLink() {
    const available = website[book].available;
    if (website[book].complete) {
      console.log("complete");
      if (website[book].range_suttas && website[book].range_suttas[firstNumber]) {
        console.log("range here in complete book");
        makeUrlWhenRangeIsPossible(book, firstNumber, secondNumber);
      } else {
        url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
      }
    } else if (Object.keys(available).length > 0) {
      Object.keys(available).forEach(chapterKey => {
        if (parseInt(chapterKey, 10) === firstNumber) {
          available[chapterKey].forEach(sutta => {
            if (secondNumber === sutta) {
              url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
            } else {
              if (website[book].range_suttas && website[book].range_suttas[firstNumber]) {
                makeUrlWhenRangeIsPossible(book, firstNumber, secondNumber);
              }
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

  function makeUrlWhenRangeIsPossible(book, firstNumber, secondNumber) {
    const chapterWithRangeArray = website[book].range_suttas[firstNumber];
    chapterWithRangeArray.forEach(range => {
      if (secondNumber >= range[0] && secondNumber <= range[1]) {
        url = rootUrl + website[book].links.all + firstNumber + chapterConnector + range[0] + suffixUrl;
      }
    });
  }
}
