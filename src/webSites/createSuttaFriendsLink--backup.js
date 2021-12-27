import { structure } from "../structure.js";
import { suttaFriends } from "./suttaFriends";

export default function createSuttaFriendsLink(props) {
  const { book, firstNumber, secondNumber, verseFlag, chapterFlag, error } = props;
  const books = Object.keys(structure);
  let url = "";
  const rootUrl = "https://suttafriends.org/sutta";
  const suffixUrl = "";

  function createSuttaLink() {
    const available = suttaFriends[book].available;
    if (suttaFriends[book].complete) {
      url = rootUrl + suttaFriends[book].links.all + firstNumber + suffixUrl;
    } else if (available.length > 0) {
      for (let i = 0; i < available.length; i++) {
        if (firstNumber === available[i]) {
          url = rootUrl + suttaFriends[book].links.all + firstNumber + suffixUrl;
        }
      }
    }
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
  return url;
}
