import { structure } from "../structure.js";

export default function parseBookName(userInput) {
  const books = Object.keys(structure);
  let sanitizedBookName = "";
  books.forEach(bookKey => {
    //console.log("length" + structure[bookKey].book_abbreviation.length);
    for (let i = 0; i < structure[bookKey].book_abbreviation.length; i++) {
      const regex = new RegExp(structure[bookKey].book_abbreviation[i], "i");
      //console.log(structure[bookKey].book_abbreviation[i], regex.test(userInput), i);
      if (regex.test(userInput)) {
        sanitizedBookName = bookKey;
      }
    }
  });
  return sanitizedBookName;
}
