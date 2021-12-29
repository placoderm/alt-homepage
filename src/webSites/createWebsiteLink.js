// This function returns a single piece of information: the final website URL

import { structure } from "../structure.js";

export default function createWebsiteLink(props) {
  const { site, book, firstNumber, secondNumber, verseFlag, chapterFlag, error } = props;
  const books = Object.keys(structure);
  let url = "";
  let website;

  if ((site === "DT") | (site === "SF") | (site === "SC")) {
    // this bit is clearly not the right way to do this
    if (site === "DT") {
      website = require("./dhammaTalks.js").dhammaTalks;
    } else if (site === "SC") {
      website = require("./suttaCentral.js").suttaCentral;
    } else {
      website = require("./suttaFriends.js").suttaFriends;
    }

    const { rootUrl, suffixUrl, chapterConnector, rangeConnector } = website.constants;

    function createSuttaLink() {
      if (website[book]) {
        const available = website[book].available;
        if (website[book].complete) {
          // complete book
          //console.log(`Is ${book} complete on ${site}? ${website[book].complete}`);
          //console.log(`Does ${book} contain a range on ${site}? ${website[book].range_suttas}`);
          if (website[book].range_suttas) {
            // there is the possibility that url is a range
            makeUrlWhenRangeIsPossibleForSutta(book, firstNumber);
          } else {
            //console.log(url);
            url = rootUrl + website[book].links.all + firstNumber + suffixUrl;
          }
        } else if (available.length > 0) {
          // not complete book
          for (let i = 0; i < available.length; i++) {
            if (firstNumber === available[i]) {
              if (website[book].range_suttas) {
                // there is the possibility that url is a range
                makeUrlWhenRangeIsPossibleForSutta(book, firstNumber);
              } else {
                url = rootUrl + website[book].links.all + firstNumber + suffixUrl;
              }
            }
          }
        }
      }
    }

    // NOTE: in SUTTA books, range_suttas is an Array of range arrays
    // NOTE: this function should only be given a citation that exists in the website i.e. if the sutta can't be found on the given website, then this function should never be used.
    function makeUrlWhenRangeIsPossibleForSutta(book, firstNumber) {
      //console.log("making a url for sutta range for " + site);
      const rangeArray = website[book].range_suttas;
      for (let i = 0; i < rangeArray.length; i++) {
        const [lower, upper] = rangeArray[i];
        // console.log({ lower }, { firstNumber }, { upper });
        if ((firstNumber >= lower) & (firstNumber <= upper)) {
          //console.log("we can make a url");
          // we can make the url, but we don't know if the url should take the form of a range, or of a chapter.
          if (website[book].urlIsInFormOfChapterNumber) {
            // console.log(site + " uses a chapter based url");
            // NOTE: The following code ASSUMES we are dealing with a complete book where the array of ranges is perfectly matched to the chapter numbers. I.e that position 0 will be chapter 1 etc.
            for (let i = 0; i < rangeArray.length; i++) {
              const [lower, upper] = rangeArray[i];
              // console.log({ lower }, { firstNumber }, { upper });
              if ((firstNumber >= lower) & (firstNumber <= upper)) {
                const chapterForUrl = i + 1;
                // console.log("chapter number for " + site + " is " + chapterForUrl);
                let leadingZero = "";
                // console.log("leadingZero " + website[book].leadingZero);
                if (website[book].leadingZero && chapterForUrl < 10) {
                  leadingZero = "0";
                }
                // console.log({ leadingZero }, { chapterForUrl });
                url = rootUrl + website[book].links.all + leadingZero + chapterForUrl + suffixUrl;
              }
            }
          } else if (rangeConnector) {
            //some urls are made with connectors and some with only first number
            url = rootUrl + website[book].links.all + lower + rangeConnector + upper + suffixUrl;
            break;
          } else {
            url = rootUrl + website[book].links.all + lower + suffixUrl;
            break;
          }
        }
      }
      if (url === "") {
        //no matching range was found. Build regular url
        console.log("no matching range found in book");
        url = rootUrl + website[book].links.all + firstNumber + suffixUrl;
      }
    }

    function createChapterLink() {
      const available = website[book].available;
      if (website[book].complete) {
        // ------- complete book
        if (website[book].range_suttas && website[book].range_suttas[firstNumber]) {
          // console.log("range is possible in " + site + " " + book);
          makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber);
        } else {
          url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
        }
      } else if (available && Object.keys(available).length > 0) {
        // ------- not complete book but some are available
        //console.log("not complte book for " + site + " but some available");
        Object.keys(available).forEach(chapterKey => {
          // cycle through the chapter keys in AVAILABLE
          if (parseInt(chapterKey, 10) === firstNumber) {
            // there is a chapter key in AVAILABLE that matches the given chapter
            // console.log("there is a chapter key in Available for " + site + " that matches " + firstNumber);
            available[chapterKey].forEach(sutta => {
              // looping through each chapter that exists in Available
              if (secondNumber === sutta) {
                // There is a match for available
                // console.log({ secondNumber }, { sutta });
                if (website[book].range_suttas && website[book].range_suttas[firstNumber]) {
                  // this book has ranges and the current chapter has an array of ranges
                  makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber);
                } else {
                  // this book doesn't have ranges so we need just a regular link
                  url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
                }
                // }
              }
            });
          } // end of if
        }); // end of forEach
        if (url === "") {
          // console.log("Didn't find in Available for " + site + " " + book);
          if (website[book].range_suttas) {
            // there are ranges of suttas in this book
            // console.log("There are ranges in " + book + " in " + site);
            Object.keys(website[book].range_suttas).forEach(chapterKey => {
              // cycle through the chapter keys in RANGE to see if sutta is in range
              if (parseInt(chapterKey, 10) === firstNumber) {
                // there is a chapter key in RANGE that matches the given chapter
                // console.log("there is a chapter key in RANGE for " + site + " that matches " + firstNumber);
                const chapterWithRangeArray = website[book].range_suttas[firstNumber];
                for (let i = 0; i < chapterWithRangeArray.length; i++) {
                  // cycle through the ranges in the chapter that matches
                  const [lower, upper] = chapterWithRangeArray[i];
                  if ((secondNumber >= lower) & (secondNumber <= upper)) {
                    // console.log("Found a match in " + site + " " + book + " in chapter " + firstNumber);
                    makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber);
                  }
                }
              }
            }); // end of forEach looking through Range
          } // end of if there are ranges
        } //end of not a complete book but some are available
      }
    }

    // NOTE: in Chapter books, range_suttas is an Object with chapter numbers as keys
    // NOTE: this function should only be given a citation that exists in the website i.e. if the sutta can't be found on the given website, then this function should never be used.
    function makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber) {
      const chapterWithRangeArray = website[book].range_suttas[firstNumber];

      chapterWithRangeArray.forEach(range => {
        if (secondNumber >= range[0] && secondNumber <= range[1]) {
          // console.log("found in range for " + site);
          if (rangeConnector) {
            // console.log("found range connector for " + site);
            // console.log(range[0], range[1]);
            url =
              rootUrl +
              website[book].links.all +
              firstNumber +
              chapterConnector +
              range[0] +
              rangeConnector +
              range[1] +
              suffixUrl;
          } else {
            // console.log("found no range connector" + site);
            url = rootUrl + website[book].links.all + firstNumber + chapterConnector + range[0] + suffixUrl;
          }
        }
      });
      if (url === "") {
        // no matching range was found. Build regular url
        // console.log("no matching range was found for " + site + ". building a regular url");
        url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
      }
    }

    // the actual function
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
  } else {
    return "";
  }
}
