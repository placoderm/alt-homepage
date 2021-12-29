export let structure = {
  dn: {
    pali_name: "Dīgha Nikāya",
    book_abbreviation: ["DN"],
    format: ["sutta"],
    suttas: 34,
    links: { card: "/long/dn", all: "/dn" },
  },
  mn: {
    pali_name: "Majjhima Nikāya",
    book_abbreviation: ["MN"],
    format: ["sutta"],
    suttas: 152,
    links: { card: "/middle/mn", all: "/mn" },
  },
  sn: {
    pali_name: "Saṁyutta Nikāya",
    book_abbreviation: ["SN"],
    format: ["chapter"],
    links: { card: "/linked/sn", all: "/sn" },
    chapters: {
      1: { max: 81, range_suttas: [] },
      2: { max: 30, range_suttas: [] },
      3: { max: 25, range_suttas: [] },
      4: { max: 25, range_suttas: [] },
      5: { max: 10, range_suttas: [] },
      6: { max: 15, range_suttas: [] },
      7: { max: 22, range_suttas: [] },
      8: { max: 12, range_suttas: [] },
      9: { max: 14, range_suttas: [] },
      10: { max: 12, range_suttas: [] },
      11: { max: 25, range_suttas: [] },
      12: {
        max: 213,
        range_suttas: [
          [72, 81],
          [83, 92],
          [93, 213],
        ],
      },
      13: { max: 11, range_suttas: [] },
      14: { max: 39, range_suttas: [] },
      15: { max: 20, range_suttas: [] },
      16: { max: 13, range_suttas: [] },
      17: {
        max: 43,
        range_suttas: [
          [13, 20],
          [38, 43],
        ],
      },
      18: { max: 22, range_suttas: [[12, 20]] },
      19: { max: 21, range_suttas: [] },
      20: { max: 12, range_suttas: [] },
      21: { max: 12, range_suttas: [] },
      22: { max: 159, range_suttas: [] },
      23: {
        max: 46,
        range_suttas: [
          [23, 33],
          [35, 45],
        ],
      },
      24: {
        max: 96,
        range_suttas: [
          [20, 35],
          [46, 69],
          [72, 95],
        ],
      },
      25: { max: 10, range_suttas: [] },
      26: { max: 10, range_suttas: [] },
      27: { max: 10, range_suttas: [] },
      28: { max: 10, range_suttas: [] },
      29: {
        max: 50,
        range_suttas: [
          [11, 20],
          [21, 50],
        ],
      },
      30: {
        max: 46,
        range_suttas: [
          [4, 6],
          [7, 16],
          [17, 46],
        ],
      },
      31: {
        max: 112,
        range_suttas: [
          [4, 12],
          [13, 22],
          [23, 112],
        ],
      },
      32: {
        max: 57,
        range_suttas: [
          [3, 12],
          [13, 52],
        ],
      },
      33: {
        max: 55,
        range_suttas: [
          [6, 10],
          [11, 15],
          [16, 20],
          [21, 25],
          [26, 30],
          [31, 35],
          [36, 40],
          [41, 45],
          [46, 50],
          [51, 54],
        ],
      },
      34: {
        max: 55,
        range_suttas: [
          [20, 27],
          [28, 34],
          [35, 40],
          [41, 45],
          [46, 49],
          [50, 52],
          [53, 54],
        ],
      },
      35: {
        max: 248,
        range_suttas: [
          [33, 42],
          [43, 51],
          [171, 173],
          [174, 176],
          [177, 179],
          [180, 182],
          [183, 185],
          [189, 191],
          [192, 194],
          [195, 197],
          [198, 200],
          [201, 203],
          [207, 209],
          [210, 212],
          [213, 215],
          [216, 218],
          [219, 221],
        ],
      },
      36: { max: 31, range_suttas: [] },
      37: { max: 34, range_suttas: [] },
      38: { max: 16, range_suttas: [] },
      39: { max: 16, range_suttas: [[1, 15]] },
      40: { max: 11, range_suttas: [] },
      41: { max: 10, range_suttas: [] },
      42: { max: 13, range_suttas: [] },
      43: { max: 44, range_suttas: [[14, 43]] },
      44: { max: 11, range_suttas: [] },
      45: {
        max: 180,
        range_suttas: [
          [42, 47],
          [50, 54],
          [57, 61],
          [64, 68],
          [71, 75],
          [78, 82],
          [85, 89],
          [92, 95],
          [98, 102],
          [104, 108],
          [110, 114],
          [116, 120],
          [122, 126],
          [128, 132],
          [134, 138],
          [141, 145],
          [146, 148],
        ],
      },
      46: {
        max: 184,
        range_suttas: [
          [77, 88],
          [89, 98],
          [99, 110],
          [111, 120],
          [121, 129],
          [131, 142],
          [143, 152],
          [153, 164],
          [165, 174],
          [175, 184],
        ],
      },
      47: {
        max: 104,
        range_suttas: [
          [51, 62],
          [63, 72],
          [73, 84],
          [85, 94],
          [95, 104],
        ],
      },
      48: {
        max: 178,
        range_suttas: [
          [71, 82],
          [83, 92],
          [93, 104],
          [105, 114],
          [115, 124],
          [125, 136],
          [137, 146],
          [147, 158],
          [159, 168],
          [169, 178],
        ],
      },
      49: {
        max: 54,
        range_suttas: [
          [1, 12],
          [13, 22],
          [23, 34],
          [35, 44],
          [45, 54],
        ],
      },
      50: {
        max: 108,
        range_suttas: [
          [1, 12],
          [13, 22],
          [23, 34],
          [35, 44],
          [45, 54],
          [55, 66],
          [67, 76],
          [77, 88],
          [89, 98],
          [99, 108],
        ],
      },
      51: {
        max: 86,
        range_suttas: [
          [33, 44],
          [45, 54],
          [55, 66],
          [67, 76],
          [77, 86],
        ],
      },
      52: { max: 24, range_suttas: [] },
      53: {
        max: 54,
        range_suttas: [
          [1, 12],
          [13, 22],
          [23, 34],
          [35, 44],
          [45, 54],
        ],
      },
      54: { max: 20, range_suttas: [] },
      55: { max: 74, range_suttas: [] },
      56: {
        max: 131,
        range_suttas: [
          [96, 101],
          [105, 107],
          [108, 110],
          [111, 113],
          [114, 116],
          [117, 119],
          [120, 122],
          [123, 125],
          [126, 128],
          [129, 130],
        ],
      },
    },
  },

  an: {
    pali_name: "Aṅguttara Nikāya",
    book_abbreviation: ["AN"],
    format: ["chapter"],
    links: { card: "/numbered/an", all: "/an" },
    chapters: {
      1: {
        max: 627,
        range_suttas: [
          [1, 10],
          [11, 20],
          [21, 30],
          [31, 40],
          [41, 50],
          [51, 60],
          [61, 70],
          [71, 81],
          [82, 97],
          [98, 139],
          [140, 149],
          [150, 169],
          [170, 187],
          [188, 197],
          [198, 208],
          [209, 218],
          [219, 234],
          [235, 247],
          [248, 257],
          [258, 267],
          [268, 277],
          [278, 286],
          [287, 295],
          [296, 305],
          [306, 315],
          [316, 332],
          [333, 377],
          [378, 393],
          [394, 574],
          [575, 615],
          [616, 627],
        ],
      },
      2: {
        max: 479,
        range_suttas: [
          [1, 10],
          [11, 20],
          [21, 31],
          [32, 41],
          [42, 51],
          [52, 63],
          [64, 76],
          [77, 86],
          [87, 97],
          [98, 117],
          [118, 129],
          [130, 140],
          [141, 150],
          [151, 162],
          [163, 179],
          [180, 229],
          [230, 279],
          [280, 309],
          [310, 479],
        ],
      },
      3: {
        max: 352,
        range_suttas: [
          [156, 162],
          [163, 182],
          [183, 352],
        ],
      },
      4: {
        max: 783,
        range_suttas: [
          [277, 303],
          [304, 783],
        ],
      },
      5: {
        max: 1152,
        range_suttas: [
          [257, 263],
          [265, 271],
          [273, 285],
          [287, 292],
          [294, 302],
          [308, 1152],
        ],
      },
      6: {
        max: 649,
        range_suttas: [
          [120, 139],
          [143, 169],
          [170, 649],
        ],
      },
      7: {
        max: 1124,
        range_suttas: [
          [96, 614],
          [618, 644],
          [645, 1124],
        ],
      },
      8: {
        max: 627,
        range_suttas: [
          [91, 117],
          [121, 147],
          [148, 627],
        ],
      },
      9: {
        max: 432,
        range_suttas: [
          [74, 81],
          [84, 91],
          [95, 112],
          [113, 432],
        ],
      },
      10: {
        max: 746,
        range_suttas: [
          [156, 166],
          [199, 210],
          [225, 228],
          [229, 232],
          [233, 236],
          [240, 266],
          [267, 746],
        ],
      },
      11: {
        max: 1151,
        range_suttas: [
          [22, 29],
          [30, 69],
          [70, 117],
          [118, 165],
          [166, 213],
          [214, 261],
          [262, 309],
          [310, 357],
          [358, 405],
          [406, 453],
          [454, 501],
          [502, 981],
          [982, 921],
          [983, 991],
          [992, 1151],
        ],
      },
    },
  },

  kn: {
    pali_name: "Khuddaka Nikāya",
    book_abbreviation: ["KN"],
    format: ["sutta"],
    links: { card: "/minor/kn", all: "/kn" },
  },
  kp: {
    pali_name: "Khuddakapāṭha",
    book_abbreviation: ["Khp", "Kp"],
    format: ["sutta"],
    links: { card: "/minor/kn/kp", all: "/kp" },
    suttas: 9,
  },
  dhp: {
    pali_name: "Dhammapada",
    book_abbreviation: ["Dhp"],
    format: ["sutta", "verse"],
    suttas: 423,
    links: { card: "/minor/dhp", all: "/dhp" },
    range_suttas: [
      [1, 20],
      [21, 32],
      [33, 43],
      [44, 59],
      [60, 75],
      [76, 89],
      [90, 99],
      [100, 115],
      [116, 128],
      [129, 145],
      [146, 156],
      [157, 166],
      [167, 178],
      [179, 196],
      [197, 208],
      [209, 220],
      [221, 234],
      [235, 255],
      [256, 272],
      [273, 289],
      [290, 305],
      [306, 319],
      [320, 333],
      [334, 359],
      [360, 382],
      [383, 423],
    ],
  },
  ud: {
    pali_name: "Udāna",
    book_abbreviation: ["Ud"],
    format: ["chapter", "sutta"],
    links: { card: "/minor/kn/ud", all: "/ud" },
    chapters: {
      1: 10,
      2: 10,
      3: 10,
      4: 10,
      5: 10,
      6: 10,
      7: 10,
      8: 10,
    },
    conversion_offset: { 1: 0, 2: 10, 3: 20, 4: 30, 5: 40, 6: 50, 7: 60, 8: 70 },
    suttas: 80,
  },
  iti: {
    pali_name: "Itivttaka",
    book_abbreviation: ["Itv", "Iti", "It"],
    format: ["sutta", "chapter"],
    links: { card: "/minor/kn/iti", all: "/iti" },
    chapters: { 1: 27, 2: 22, 3: 50, 4: 13 },
    conversion_offset: { 1: 0, 2: 27, 3: 49, 4: 99 },
    suttas: 112,
  },
  snp: {
    pali_name: "Sutta Nipāta",
    book_abbreviation: ["Snp"],
    format: ["chapter"],
    links: { card: "/minor/kn/snp", all: "/snp" },
    chapters: {
      1: 12,
      2: 14,
      3: 12,
      4: 16,
      5: 19,
    },
  },
  vv: {
    pali_name: "Vimānavatthu",
    book_abbreviation: ["Vv"],
    format: ["sutta", "chapter"],
    links: { card: "/minor/kn/vv", all: "/vv" },
    chapters: { 1: 17, 2: 11, 3: 10, 4: 12, 5: 14, 6: 10, 7: 11 },
    conversion_offset: { 1: 0, 2: 17, 3: 28, 4: 38, 5: 50, 6: 64, 7: 74 },
    suttas: 85,
  },
  pv: {
    pali_name: "Petavatthu",
    book_abbreviation: ["Pv"],
    format: ["sutta", "chapter"],
    links: { card: "/minor/kn/pv", all: "/pv" },
    chapters: { 1: 12, 2: 13, 3: 10, 4: 16 },
    conversion_offset: { 1: 0, 2: 12, 3: 25, 4: 35 },
    suttas: 51,
  },
  thag: {
    pali_name: "Theragāthā",
    book_abbreviation: ["Thag"],
    format: ["chapter", "verse"],
    links: { card: "/minor/kn/thag", all: "/thag" },
    chapters: {
      1: { max: 120, range_suttas: [] },
      2: { max: 49, range_suttas: [] },
      3: { max: 16, range_suttas: [] },
      4: { max: 12, range_suttas: [] },
      5: { max: 12, range_suttas: [] },
      6: { max: 14, range_suttas: [] },
      7: { max: 5, range_suttas: [] },
      8: { max: 3, range_suttas: [] },
      9: { max: 1, range_suttas: [] },
      10: { max: 7, range_suttas: [] },
      11: { max: 1, range_suttas: [] },
      12: { max: 2, range_suttas: [] },
      13: { max: 1, range_suttas: [] },
      14: { max: 2, range_suttas: [] },
      15: { max: 2, range_suttas: [] },
      16: { max: 10, range_suttas: [] },
      17: { max: 3, range_suttas: [] },
      18: { max: 1, range_suttas: [] },
      19: { max: 1, range_suttas: [] },
      20: { max: 1, range_suttas: [] },
      21: { max: 1, range_suttas: [] },
    },
  },
  thig: {
    pali_name: "Therīgāthā",
    book_abbreviation: ["Thig"],
    format: ["chapter", "verse"],
    links: { card: "/minor/kn/thig", all: "/thig" },
    chapters: {
      1: { max: 18, range_suttas: [] },
      2: { max: 10, range_suttas: [] },
      3: { max: 8, range_suttas: [] },
      4: { max: 1, range_suttas: [] },
      5: { max: 12, range_suttas: [] },
      6: { max: 8, range_suttas: [] },
      7: { max: 3, range_suttas: [] },
      8: { max: 1, range_suttas: [] },
      9: { max: 1, range_suttas: [] },
      10: { max: 1, range_suttas: [] },
      11: { max: 1, range_suttas: [] },
      12: { max: 1, range_suttas: [] },
      13: { max: 5, range_suttas: [] },
      14: { max: 1, range_suttas: [] },
      15: { max: 1, range_suttas: [] },
      16: { max: 1, range_suttas: [] },
    },
  },
  ja: {
    pali_name: "Jātaka",
    book_abbreviation: ["Ja"],
    format: ["sutta"],
    links: { card: "/minor/kn/thig", all: "/thig" },
    suttas: 547,
  },
};
