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
    const booksOnWebsite = Object.keys(website);
    const { rootUrl, suffixUrl, chapterConnector, rangeConnector } = website.constants;

    //                                 createSuttaLink
    function createSuttaLink() {
      if (website[book]) {
        if (website[book].links.main_page && firstNumber === 0) {
          url = website[book].links.main_page;
        }
        if (firstNumber > 0) {
          const available = website[book].available;
          if (website[book].complete) {
            // complete book
            if (website[book].range_suttas) {
              // there is the possibility that url is a range
              makeUrlWhenRangeIsPossibleForSutta(book, firstNumber);
            } else {
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
        } //
      }
    }

    // NOTE: in SUTTA books, range_suttas is an Array of range arrays
    // NOTE: this function should only be given a citation that exists in the website i.e. if the sutta can't be found on the given website, then this function should never be used.
    function makeUrlWhenRangeIsPossibleForSutta(book, firstNumber) {
      const rangeArray = website[book].range_suttas;
      for (let i = 0; i < rangeArray.length; i++) {
        const [lower, upper] = rangeArray[i];
        if ((firstNumber >= lower) & (firstNumber <= upper)) {
          // we can make the url, but we don't know if the url should take the form of a range, or of a chapter.
          if (website[book].urlIsInFormOfChapterNumber) {
            // NOTE: The following code ASSUMES we are dealing with a complete book where the array of ranges is perfectly matched to the chapter numbers. I.e that position 0 will be chapter 1 etc.
            for (let i = 0; i < rangeArray.length; i++) {
              const [lower, upper] = rangeArray[i];
              if ((firstNumber >= lower) & (firstNumber <= upper)) {
                const chapterForUrl = i + 1;
                // TODO: the way of determining the use of leading zeros is fragile. should be moved to a variable in the website object
                let leadingZero = "";
                if (website[book].leadingZero && chapterForUrl < 10) {
                  leadingZero = "0";
                }
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
        url = rootUrl + website[book].links.all + firstNumber + suffixUrl;
      }
    }

    // ++++++++++++++++++++++++++++ CREATE CHAPTER LINK
    function createChapterLink() {
      const available = website[book].available;
      if (website[book].links.main_page && firstNumber === 0) {
        url = website[book].links.main_page;
      }
      if (secondNumber > 0) {
        //commenting out this
        // will make the thag18 work, but breaks ud (also comment out the closing)
        if (website[book].complete) {
          // ------- complete book
          if (website[book].range_suttas && website[book].range_suttas[firstNumber]) {
            makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber);
          } else {
            url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
          }
        } else if (available && Object.keys(available).length > 0) {
          // ------- not complete book but some are available
          Object.keys(available).forEach(chapterKey => {
            // cycle through the chapter keys in AVAILABLE
            if (parseInt(chapterKey, 10) === firstNumber) {
              // there is a chapter key in AVAILABLE that matches the given chapter
              if (structure[book].chapters[chapterKey].length === 1) {
                //there is only one sutta in the chapter
              } else {
                available[chapterKey].forEach(sutta => {
                  // looping through each chapter that exists in Available
                  if (secondNumber === sutta) {
                    // There is a match for available
                    if (website[book].range_suttas && website[book].range_suttas[firstNumber]) {
                      // this book has ranges and the current chapter has an array of ranges
                      makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber);
                    } else {
                      // this book doesn't have ranges so we need just a regular link
                      url =
                        rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
                    }
                    // }
                  }
                });
              } // end of forEach
            } // end of if
          }); // end of forEach
          if (url === "") {
            if (website[book].range_suttas) {
              // there are ranges of suttas in this book
              Object.keys(website[book].range_suttas).forEach(chapterKey => {
                // cycle through the chapter keys in RANGE to see if sutta is in range
                if (parseInt(chapterKey, 10) === firstNumber) {
                  // there is a chapter key in RANGE that matches the given chapter
                  const chapterWithRangeArray = website[book].range_suttas[firstNumber];
                  for (let i = 0; i < chapterWithRangeArray.length; i++) {
                    // cycle through the ranges in the chapter that matches
                    const [lower, upper] = chapterWithRangeArray[i];
                    if ((secondNumber >= lower) & (secondNumber <= upper)) {
                      makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber);
                    }
                  }
                }
              }); // end of forEach looking through Range
            } // end of if there are ranges
          } //end of not a complete book but some are available
        }
      }

      function convertVerseToChapterSutta() {
        if (structure[book].format[1] && structure[book].format[1] === "verse") {
          // book can be represented in verse format
          const chapterVersePairs = structure[book].verses;
          if (chapterVersePairs) {
            for (let i = 0; i < chapterVersePairs.length; i++) {
              const [chapter, sutta] = chapterVersePairs[i][0];
              const [lower, upper] = chapterVersePairs[i][1];
              if ((firstNumber >= lower) & (firstNumber <= upper)) {
                firstNumber = chapter;
                secondNumber = sutta;
                i = chapterVersePairs.length;
              }
            }
          }
        }
      }
    }

    // NOTE: in Chapter books, range_suttas is an Object with chapter numbers as keys
    // NOTE: this function should only be given a citation that exists in the website i.e. if the sutta can't be found on the given website, then this function should never be used.
    function makeUrlWhenRangeIsPossibleForChapter(book, firstNumber, secondNumber) {
      const chapterWithRangeArray = website[book].range_suttas[firstNumber];

      chapterWithRangeArray.forEach(range => {
        if (secondNumber >= range[0] && secondNumber <= range[1]) {
          if (rangeConnector) {
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
            url = rootUrl + website[book].links.all + firstNumber + chapterConnector + range[0] + suffixUrl;
          }
        }
      });
      if (url === "") {
        // no matching range was found. Build regular url
        url = rootUrl + website[book].links.all + firstNumber + chapterConnector + secondNumber + suffixUrl;
      }
    }

    // the actual function
    if (error === "" && booksOnWebsite.includes(book)) {
      books.forEach(bookKey => {
        const format = structure[bookKey].format[0];
        if (book === bookKey) {
          if (format === "sutta") {
            createSuttaLink();
            if (website[book].links.idPrefix && firstNumber > 0) {
              let suffix = website[book].links.idSuffix ? website[book].links.idSuffix : "";
              let idForVerse = firstNumber;
              if (website[book].links.idLeadingZero === true) {
                idForVerse = ("00" + idForVerse).slice(-3);
              }
              url = url + website[book].links.idPrefix + idForVerse + suffix;
            }
          } else if (format === "chapter") {
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
