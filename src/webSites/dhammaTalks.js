export let dhammaTalks = {
  constants: {
    rootUrl: "https://www.dhammatalks.org/suttas",
    suffixUrl: ".html",
    chapterConnector: "_",
  },
  dn: {
    format: ["sutta"],
    links: { card: "/long/dn", all: "/dn" },
    available: [1, 2, 9, 11, 12, 15, 16, 20, 21, 22, 26, 29, 33, 34],
  },
  mn: {
    format: ["sutta"],
    links: { all: "/MN/MN" },
    available: [
      1,
      2,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      18,
      19,
      20,
      21,
      22,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      33,
      35,
      36,
      38,
      39,
      40,
      41,
      43,
      44,
      45,
      48,
      49,
      51,
      52,
      53,
      54,
      55,
      56,
      58,
      59,
      60,
      61,
      62,
      63,
      64,
      66,
      67,
      69,
      70,
      72,
      74,
      75,
      77,
      78,
      82,
      86,
      87,
      90,
      91,
      92,
      93,
      95,
      97,
      98, // 98 doesn't link where it should. On the site it is actually https://www.dhammatalks.org/suttas/KN/StNp/StNp3_9.html
      101,
      102,
      105,
      106,
      107,
      108,
      109,
      110,
      111,
      113,
      117,
      118,
      119,
      121,
      122,
      123,
      125,
      126,
      128,
      130,
      131,
      135,
      136,
      137,
      138,
      140,
      141,
      143,
      146,
      147,
      148,
      149,
      151,
      152,
    ],
  },
  sn: {
    format: ["chapter"],
    links: { all: "/SN/SN" },
    available: { 1: [1, 2, 7, 9, 10], 2: [2, 7], 3: [1] },
  },

  an: {
    format: ["chapter"],
    links: { all: "/AN/AN" },
    available: {
      1: [21, 45, 48, 49, 50, 140, 329],
      2: [5, 9, 19, 21, 23, 24, 29, 30, 31, 35, 36, 37, 46, 61, 74, 99, 118, 120, 123, 134],
    },
  },

  kn: {
    format: ["sutta"],
    links: { card: "/minor/kn", all: "/kn" },
  },
  kp: {
    format: ["sutta"],
    links: { all: "/KN/Khp/khp" },
    available: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  dhp: {
    format: ["verse", "chapter"],
    links: { card: "/minor/dhp", all: "/dhp" },
    available: [],
  },
  ud: {
    format: ["chapter", "sutta"],
    links: { all: "/KN/Ud/ud" },
    available: [],
    complete: true,
  },
  iti: {
    format: ["sutta", "chapter"],
    links: { all: "/KN/Iti/iti" },
    available: [],
    complete: true,
  },
  snp: {
    format: ["chapter"],
    links: { all: "/KN/StNp/StNp" },
    available: [],
    complete: true,
  },
  vv: {
    format: ["sutta", "chapter"],
    links: { card: "/minor/kn/vv", all: "/vv" },
    available: [],
  },
  pv: {
    format: ["sutta", "chapter"],
    links: { card: "/minor/kn/pv", all: "/pv" },
    available: [],
  },
  thag: {
    format: ["verse", "chapter"],
    links: { card: "/minor/kn/thig", all: "/thig" },
    available: [],
  },
  thig: {
    format: ["verse", "chapter"],
    links: { card: "/minor/kn/thig", all: "/thig" },
    available: [],
  },
};
