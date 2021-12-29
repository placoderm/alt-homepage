import createWebsiteLink from "./createWebsiteLink.js";

test("test all mn141 citation", () => {
  expect(createWebsiteLink({ site: "SC", book: "mn", firstNumber: 141, secondNumber: 0, error: "" })).toBe(
    "https://suttacentral.net/mn141"
  );
  expect(createWebsiteLink({ site: "SF", book: "mn", firstNumber: 141, secondNumber: 0, error: "" })).toBe(
    "https://suttafriends.org/sutta/mn141"
  );
  expect(createWebsiteLink({ site: "DT", book: "mn", firstNumber: 141, secondNumber: 0, error: "" })).toBe(
    "https://www.dhammatalks.org/suttas/MN/MN141.html"
  );
});

test("test sc an1.1 citation", () => {
  expect(createWebsiteLink({ site: "SC", book: "an", firstNumber: 1, secondNumber: 2, error: "" })).toBe(
    "https://suttacentral.net/an1.1-10"
  );
});

test("test SF an1.1 citation", () => {
  expect(createWebsiteLink({ site: "SF", book: "an", firstNumber: 1, secondNumber: 2, error: "" })).toBe(
    "https://suttafriends.org/sutta/an1-1"
  );
});
test("test DT an1.22 citation", () => {
  expect(createWebsiteLink({ site: "DT", book: "an", firstNumber: 1, secondNumber: 22, error: "" })).toBe(
    "https://www.dhammatalks.org/suttas/AN/AN1_21.html"
  );
});

test("test suttafriends thag1.2 citation", () => {
  expect(createWebsiteLink({ site: "SF", book: "thag", firstNumber: 1, secondNumber: 2, error: "" })).toBe(
    "https://suttafriends.org/sutta/thag1-1"
  );
});

test("test itivuttaka chapter format ciation, itv2.2", () => {
  expect(createWebsiteLink({ site: "SF", book: "iti", firstNumber: 2, secondNumber: 2, error: "" })).toBe(
    "https://suttafriends.org/sutta/itv29"
  );
  expect(createWebsiteLink({ site: "SC", book: "iti", firstNumber: 2, secondNumber: 2, error: "" })).toBe(
    "https://suttacentral.net/iti29"
  );
});

test("test itivuttaka range on DhammaTalks, itv11", () => {
  expect(createWebsiteLink({ site: "DT", book: "iti", firstNumber: 11, secondNumber: 0, error: "" })).toBe(
    "https://www.dhammatalks.org/suttas/KN/Iti/iti10.html"
  );
});

test("test Dhp for SuttaFriends", () => {
  expect(createWebsiteLink({ site: "SF", book: "dhp", firstNumber: 123, secondNumber: 0, error: "" })).toBe(
    "https://suttafriends.org/sutta/dhp9"
  );
});

test("test Dhp for DhammaTalks", () => {
  expect(createWebsiteLink({ site: "DT", book: "dhp", firstNumber: 123, secondNumber: 0, error: "" })).toBe(
    "https://www.dhammatalks.org/suttas/KN/Dhp/Ch09.html"
  );
});
