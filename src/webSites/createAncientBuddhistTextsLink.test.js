import createAncientBuddhistTextsLink from "./createAncientBuddhistTextsLink.js";

test("test all mn141 citation", () => {
  expect(
    createAncientBuddhistTextsLink({ site: "ABT", book: "mn", firstNumber: 141, secondNumber: 0, error: "" })
  ).toBe("https://www.ancient-buddhist-texts.net/Texts-and-Translations/Short-Pieces/Saccavibhangasuttam.htm");
});
