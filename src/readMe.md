# TODO

- [ ] allow creation of urls to books/chapters
- [ ] allow setting translator/layout in text input
- [ ] add v ch chapter flags
- [ ] ABT Dhammapada
- [ ] ABT Jataka
- [ ] ABT SN
- [ ] ABT AN

# fixing dhammaTalks

SN 43, and 44 are all one page.
Thag18.1 is really Thag18

# fixing SF

fix range
https://suttafriends.org/sutta/sn55-63/
https://suttafriends.org/sutta/sn56-61-2/ and further

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
