export let suttaFriends = {
  constants: {
    rootUrl: "https://suttafriends.org/sutta",
    suffixUrl: "",
    chapterConnector: "-",
  },
  dn: {
    format: ["sutta"],

    links: { card: "/long/dn", all: "/dn" },
    available: [14, 18, 22, 24, 26, 27, 28, 30, 31, 32],
  },
  mn: {
    format: ["sutta"],

    links: { all: "/mn" },
    available: [10, 21, 58, 82, 87, 89, 116, 135, 141, 142],
  },
  sn: {
    format: ["chapter"],
    links: { card: "/linked/sn", all: "/sn" },
    available: [],
  },

  an: {
    format: ["chapter"],
    links: { card: "/numbered/an", all: "/an" },
    available: [],
  },

  kn: {
    format: ["sutta"],
    links: { card: "/minor/kn", all: "/kn" },
  },
  kp: {
    format: ["sutta"],
    links: { all: "/sutta/khp" },
    available: [1, 2, 5, 6, 7, 8, 9],
  },
  dhp: {
    format: ["verse", "chapter"],
    links: { card: "/minor/dhp", all: "/dhp" },
    available: [],
  },
  ud: {
    format: ["chapter", "sutta"],
    links: { card: "/minor/kn/ud", all: "/ud" },
    available: [],
  },
  iti: {
    format: ["sutta", "chapter"],
    links: { all: "/itv" },
    available: [],
    complete: true,
  },
  snp: {
    format: ["chapter"],
    links: { all: "/snp" },
    available: { 1: [4, 6, 7, 8, 10], 2: [1, 4], 3: [1] },
    complete: false,
  },
  vv: {
    format: ["sutta", "chapter"],
    links: { card: "/minor/kn/vv", all: "/vv" },
    available: [],
    complete: true,
  },
  pv: {
    format: ["sutta", "chapter"],
    links: { card: "/minor/kn/pv", all: "/pv" },
    available: [],
    complete: true,
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
