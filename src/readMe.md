inputUrl --> what the user is inputing
finalCitation --> citation part of the url, constructed in part based on user input but not really
finalUrl --> after all modifications, including translator and layout

(v|chapter|ch|^)

# TODO

- [ ] add button for pali
- [ ] add button for card instead of translator
- [ ] allow creation of urls to books/chapters
- [ ] allow setting translator/layout in text input
- [ ] add v ch chapter flags
- [ ] Dhammapada
- [ ] SN
- [ ] Thag/Thig
- [ ] alternate citations for Ud
- [ ] setup ranges for other websites
- [ ] setup available for chapter based books
  - [ ] should sutta based books availablity be changed to an object
- [x] alternate citations for Itv, Vv, Pv
- [x] alternate abbreviations for itv, khp

// if second number exists
// then see if first number is <= the number of chapters.
// if it's not
// then reject
// if it is less
// then see if the second number is <= numbers of suttas in that chapter
// if it's not, reject
// if it is, then the whole thing needs to be converted into the correct url

Dhamapada old psudo code
// if "verse" present treat as verse
// if "chapter" present treat as chapter
//if firstNumber > 26
// then if firstNumber>423
// reject as verse number too high
// else treat as verse :: generate url by cycling through range*sutta
//
//if firstNumber <= 26
// then generate \_2* urls
// one for chapter
// one for verse

===========================

function is given string and returns either a valid citation and or an error message
{
book:book,
firstNum: firstNum,
secondNum, secondNum,
error:error
}

(verse|v|chapter|ch|c|)[ .-]\*
