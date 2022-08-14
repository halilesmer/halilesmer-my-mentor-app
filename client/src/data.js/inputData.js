const languages = [
  {
    title: "Abkhaz",
    nativeTitle: "аҧсуа",
  },
  {
    title: "Afar",
    nativeTitle: "Afaraf",
  },
  {
    title: "Afrikaans",
    nativeTitle: "Afrikaans",
  },
  {
    title: "Akan",
    nativeTitle: "Akan",
  },
  {
    title: "Albanian",
    nativeTitle: "Shqip",
  },
  {
    title: "Amharic",
    nativeTitle: "አማርኛ",
  },
  {
    title: "Arabic",
    nativeTitle: "العربية",
  },
  {
    title: "Aragonese",
    nativeTitle: "Aragonés",
  },
  {
    title: "Armenian",
    nativeTitle: "Հայերեն",
  },
  {
    title: "Assamese",
    nativeTitle: "অসমীয়া",
  },
  {
    title: "Avaric",
    nativeTitle: "авар мацӀ, магӀарул мацӀ",
  },
  {
    title: "Avestan",
    nativeTitle: "avesta",
  },
  {
    title: "Aymara",
    nativeTitle: "aymar aru",
  },
  {
    title: "Azerbaijani",
    nativeTitle: "azərbaycan dili",
  },
  {
    title: "Bambara",
    nativeTitle: "bamanankan",
  },
  {
    title: "Bashkir",
    nativeTitle: "башҡорт теле",
  },
  {
    title: "Basque",
    nativeTitle: "euskara, euskera",
  },
  {
    title: "Belarusian",
    nativeTitle: "Беларуская",
  },
  {
    title: "Bengali",
    nativeTitle: "বাংলা",
  },
  {
    title: "Bihari",
    nativeTitle: "भोजपुरी",
  },
  {
    title: "Bislama",
    nativeTitle: "Bislama",
  },
  {
    title: "Bosnian",
    nativeTitle: "bosanski jezik",
  },
  {
    title: "Breton",
    nativeTitle: "brezhoneg",
  },
  {
    title: "Bulgarian",
    nativeTitle: "български език",
  },
  {
    title: "Burmese",
    nativeTitle: "ဗမာစာ",
  },
  {
    title: "Catalan; Valencian",
    nativeTitle: "Català",
  },
  {
    title: "Chamorro",
    nativeTitle: "Chamoru",
  },
  {
    title: "Chechen",
    nativeTitle: "нохчийн мотт",
  },
  {
    title: "Chichewa; Chewa; Nyanja",
    nativeTitle: "chiCheŵa, chinyanja",
  },
  {
    title: "Chinese",
    nativeTitle: "中文 (Zhōngwén), 汉语, 漢語",
  },
  {
    title: "Chuvash",
    nativeTitle: "чӑваш чӗлхи",
  },
  {
    title: "Cornish",
    nativeTitle: "Kernewek",
  },
  {
    title: "Corsican",
    nativeTitle: "corsu, lingua corsa",
  },
  {
    title: "Cree",
    nativeTitle: "ᓀᐦᐃᔭᐍᐏᐣ",
  },
  {
    title: "Croatian",
    nativeTitle: "hrvatski",
  },
  {
    title: "Czech",
    nativeTitle: "česky, čeština",
  },
  {
    title: "Danish",
    nativeTitle: "dansk",
  },
  {
    title: "Divehi; Dhivehi; Maldivian;",
    nativeTitle: "ދިވެހި",
  },
  {
    title: "Dutch",
    nativeTitle: "Nederlands, Vlaams",
  },
  {
    title: "English",
    nativeTitle: "English",
  },
  {
    title: "Esperanto",
    nativeTitle: "Esperanto",
  },
  {
    title: "Estonian",
    nativeTitle: "eesti, eesti keel",
  },
  {
    title: "Ewe",
    nativeTitle: "Eʋegbe",
  },
  {
    title: "Faroese",
    nativeTitle: "føroyskt",
  },
  {
    title: "Fijian",
    nativeTitle: "vosa Vakaviti",
  },
  {
    title: "Finnish",
    nativeTitle: "suomi, suomen kieli",
  },
  {
    title: "French",
    nativeTitle: "français, langue française",
  },
  {
    title: "Fula; Fulah; Pulaar; Pular",
    nativeTitle: "Fulfulde, Pulaar, Pular",
  },
  {
    title: "Galician",
    nativeTitle: "Galego",
  },
  {
    title: "Georgian",
    nativeTitle: "ქართული",
  },
  {
    title: "German",
    nativeTitle: "Deutsch",
  },
  {
    title: "Greek, Modern",
    nativeTitle: "Ελληνικά",
  },
  {
    title: "Guaraní",
    nativeTitle: "Avañeẽ",
  },
  {
    title: "Gujarati",
    nativeTitle: "ગુજરાતી",
  },
  {
    title: "Haitian; Haitian Creole",
    nativeTitle: "Kreyòl ayisyen",
  },
  {
    title: "Hausa",
    nativeTitle: "Hausa, هَوُسَ",
  },
  {
    title: "Hebrew",
    nativeTitle: "עברית",
  },

  {
    title: "Herero",
    nativeTitle: "Otjiherero",
  },
  {
    title: "Hindi",
    nativeTitle: "हिन्दी, हिंदी",
  },
  {
    title: "Hiri Motu",
    nativeTitle: "Hiri Motu",
  },
  {
    title: "Hungarian",
    nativeTitle: "Magyar",
  },
  {
    title: "Interlingua",
    nativeTitle: "Interlingua",
  },
  {
    title: "Indonesian",
    nativeTitle: "Bahasa Indonesia",
  },
  {
    title: "Interlingue",
    nativeTitle: "Originally called Occidental; then Interlingue after WWII",
  },
  {
    title: "Irish",
    nativeTitle: "Gaeilge",
  },
  {
    title: "Igbo",
    nativeTitle: "Asụsụ Igbo",
  },
  {
    title: "Inupiaq",
    nativeTitle: "Iñupiaq, Iñupiatun",
  },
  {
    title: "Ido",
    nativeTitle: "Ido",
  },
  {
    title: "Icelandic",
    nativeTitle: "Íslenska",
  },
  {
    title: "Italian",
    nativeTitle: "Italiano",
  },
  {
    title: "Inuktitut",
    nativeTitle: "ᐃᓄᒃᑎᑐᑦ",
  },
  {
    title: "Japanese",
    nativeTitle: "日本語 (にほんご／にっぽんご)",
  },
  {
    title: "Javanese",
    nativeTitle: "basa Jawa",
  },
  {
    title: "Kalaallisut, Greenlandic",
    nativeTitle: "kalaallisut, kalaallit oqaasii",
  },
  {
    title: "Kannada",
    nativeTitle: "ಕನ್ನಡ",
  },
  {
    title: "Kanuri",
    nativeTitle: "Kanuri",
  },
  {
    title: "Kashmiri",
    nativeTitle: "कश्मीरी, كشميري‎",
  },
  {
    title: "Kazakh",
    nativeTitle: "Қазақ тілі",
  },
  {
    title: "Khmer",
    nativeTitle: "ភាសាខ្មែរ",
  },
  {
    title: "Kikuyu, Gikuyu",
    nativeTitle: "Gĩkũyũ",
  },
  {
    title: "Kinyarwanda",
    nativeTitle: "Ikinyarwanda",
  },
  {
    title: "Kirghiz, Kyrgyz",
    nativeTitle: "кыргыз тили",
  },
  {
    title: "Komi",
    nativeTitle: "коми кыв",
  },
  {
    title: "Kongo",
    nativeTitle: "KiKongo",
  },
  {
    title: "Korean",
    nativeTitle: "한국어 (韓國語), 조선말 (朝鮮語)",
  },
  {
    title: "Kurdish",
    nativeTitle: "Kurdî, كوردی‎",
  },
  {
    title: "Kwanyama, Kuanyama",
    nativeTitle: "Kuanyama",
  },
  {
    title: "Latin",
    nativeTitle: "latine, lingua latina",
  },
  {
    title: "Luxembourgish, Letzeburgesch",
    nativeTitle: "Lëtzebuergesch",
  },
  {
    title: "Luganda",
    nativeTitle: "Luganda",
  },
  {
    title: "Limburgish, Limburgan, Limburger",
    nativeTitle: "Limburgs",
  },
  {
    title: "Lingala",
    nativeTitle: "Lingála",
  },
  {
    title: "Lao",
    nativeTitle: "ພາສາລາວ",
  },
  {
    title: "Lithuanian",
    nativeTitle: "lietuvių kalba",
  },
  {
    title: "Luba-Katanga",
    nativeTitle: "",
  },
  {
    title: "Latvian",
    nativeTitle: "latviešu valoda",
  },
  {
    title: "Manx",
    nativeTitle: "Gaelg, Gailck",
  },
  {
    title: "Macedonian",
    nativeTitle: "македонски јазик",
  },
  {
    title: "Malagasy",
    nativeTitle: "Malagasy fiteny",
  },
  {
    title: "Malay",
    nativeTitle: "bahasa Melayu, بهاس ملايو‎",
  },
  {
    title: "Malayalam",
    nativeTitle: "മലയാളം",
  },
  {
    title: "Maltese",
    nativeTitle: "Malti",
  },
  {
    title: "Māori",
    nativeTitle: "te reo Māori",
  },
  {
    title: "Marathi (Marāṭhī)",
    nativeTitle: "मराठी",
  },
  {
    title: "Marshallese",
    nativeTitle: "Kajin M̧ajeļ",
  },
  {
    title: "Mongolian",
    nativeTitle: "монгол",
  },
  {
    title: "Nauru",
    nativeTitle: "Ekakairũ Naoero",
  },
  {
    title: "Navajo, Navaho",
    nativeTitle: "Diné bizaad, Dinékʼehǰí",
  },
  {
    title: "Norwegian Bokmål",
    nativeTitle: "Norsk bokmål",
  },
  {
    title: "North Ndebele",
    nativeTitle: "isiNdebele",
  },
  {
    title: "Nepali",
    nativeTitle: "नेपाली",
  },
  {
    title: "Ndonga",
    nativeTitle: "Owambo",
  },
  {
    title: "Norwegian Nynorsk",
    nativeTitle: "Norsk nynorsk",
  },
  {
    title: "Norwegian",
    nativeTitle: "Norsk",
  },
  {
    title: "Nuosu",
    nativeTitle: "ꆈꌠ꒿ Nuosuhxop",
  },
  {
    title: "South Ndebele",
    nativeTitle: "isiNdebele",
  },
  {
    title: "Occitan",
    nativeTitle: "Occitan",
  },
  {
    title: "Ojibwe, Ojibwa",
    nativeTitle: "ᐊᓂᔑᓈᐯᒧᐎᓐ",
  },
  {
    title:
      "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
    nativeTitle: "ѩзыкъ словѣньскъ",
  },
  {
    title: "Oromo",
    nativeTitle: "Afaan Oromoo",
  },
  {
    title: "Oriya",
    nativeTitle: "ଓଡ଼ିଆ",
  },
  {
    title: "Ossetian, Ossetic",
    nativeTitle: "ирон æвзаг",
  },
  {
    title: "Panjabi, Punjabi",
    nativeTitle: "ਪੰਜਾਬੀ, پنجابی‎",
  },
  {
    title: "Pāli",
    nativeTitle: "पाऴि",
  },
  {
    title: "Persian",
    nativeTitle: "فارسی",
  },
  {
    title: "Polish",
    nativeTitle: "polski",
  },
  {
    title: "Pashto, Pushto",
    nativeTitle: "پښتو",
  },
  {
    title: "Portuguese",
    nativeTitle: "Português",
  },
  {
    title: "Quechua",
    nativeTitle: "Runa Simi, Kichwa",
  },
  {
    title: "Romansh",
    nativeTitle: "rumantsch grischun",
  },
  {
    title: "Kirundi",
    nativeTitle: "kiRundi",
  },
  {
    title: "Romanian, Moldavian, Moldovan",
    nativeTitle: "română",
  },
  {
    title: "Russian",
    nativeTitle: "русский язык",
  },
  {
    title: "Sanskrit (Saṁskṛta)",
    nativeTitle: "संस्कृतम्",
  },
  {
    title: "Sardinian",
    nativeTitle: "sardu",
  },
  {
    title: "Sindhi",
    nativeTitle: "सिन्धी, سنڌي، سندھی‎",
  },
  {
    title: "Northern Sami",
    nativeTitle: "Davvisámegiella",
  },
  {
    title: "Samoan",
    nativeTitle: "gagana faa Samoa",
  },
  {
    title: "Sango",
    nativeTitle: "yângâ tî sängö",
  },
  {
    title: "Serbian",
    nativeTitle: "српски језик",
  },
  {
    title: "Scottish Gaelic; Gaelic",
    nativeTitle: "Gàidhlig",
  },
  {
    title: "Shona",
    nativeTitle: "chiShona",
  },
  {
    title: "Sinhala, Sinhalese",
    nativeTitle: "සිංහල",
  },
  {
    title: "Slovak",
    nativeTitle: "slovenčina",
  },
  {
    title: "Slovene",
    nativeTitle: "slovenščina",
  },
  {
    title: "Somali",
    nativeTitle: "Soomaaliga, af Soomaali",
  },
  {
    title: "Southern Sotho",
    nativeTitle: "Sesotho",
  },
  {
    title: "Spanish; Castilian",
    nativeTitle: "español, castellano",
  },
  {
    title: "Sundanese",
    nativeTitle: "Basa Sunda",
  },
  {
    title: "Swahili",
    nativeTitle: "Kiswahili",
  },
  {
    title: "Swati",
    nativeTitle: "SiSwati",
  },
  {
    title: "Swedish",
    nativeTitle: "svenska",
  },
  {
    title: "Tamil",
    nativeTitle: "தமிழ்",
  },
  {
    title: "Telugu",
    nativeTitle: "తెలుగు",
  },
  {
    title: "Tajik",
    nativeTitle: "тоҷикӣ, toğikī, تاجیکی‎",
  },
  {
    title: "Thai",
    nativeTitle: "ไทย",
  },
  {
    title: "Tigrinya",
    nativeTitle: "ትግርኛ",
  },
  {
    title: "Tibetan Standard, Tibetan, Central",
    nativeTitle: "བོད་ཡིག",
  },
  {
    title: "Turkmen",
    nativeTitle: "Türkmen, Түркмен",
  },
  {
    title: "Tagalog",
    nativeTitle: "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔",
  },
  {
    title: "Tswana",
    nativeTitle: "Setswana",
  },
  {
    title: "Tonga (Tonga Islands)",
    nativeTitle: "faka Tonga",
  },
  {
    title: "Turkish",
    nativeTitle: "Türkçe",
  },
  {
    title: "Tsonga",
    nativeTitle: "Xitsonga",
  },
  {
    title: "Tatar",
    nativeTitle: "татарча, tatarça, تاتارچا‎",
  },
  {
    title: "Twi",
    nativeTitle: "Twi",
  },
  {
    title: "Tahitian",
    nativeTitle: "Reo Tahiti",
  },
  {
    title: "Uighur, Uyghur",
    nativeTitle: "Uyƣurqə, ئۇيغۇرچە‎",
  },
  {
    title: "Ukrainian",
    nativeTitle: "українська",
  },
  {
    title: "Urdu",
    nativeTitle: "اردو",
  },
  {
    title: "Uzbek",
    nativeTitle: "zbek, Ўзбек, أۇزبېك‎",
  },
  {
    title: "Venda",
    nativeTitle: "Tshivenḓa",
  },
  {
    title: "Viettitlese",
    nativeTitle: "Tiếng Việt",
  },
  {
    title: "Volapük",
    nativeTitle: "Volapük",
  },
  {
    title: "Walloon",
    nativeTitle: "Walon",
  },
  {
    title: "Welsh",
    nativeTitle: "Cymraeg",
  },
  {
    title: "Wolof",
    nativeTitle: "Wollof",
  },
  {
    title: "Western Frisian",
    nativeTitle: "Frysk",
  },
  {
    title: "Xhosa",
    nativeTitle: "isiXhosa",
  },
  {
    title: "Yiddish",
    nativeTitle: "ייִדיש",
  },
  {
    title: "Yoruba",
    nativeTitle: "Yorùbá",
  },
  {
    title: "Zhuang, Chuang",
    nativeTitle: "Saɯ cueŋƅ, Saw cuengh",
  },
];

const predefinedSkills = [
  "React.js",
  "Java",
  "Material UI",
  "Bootstrap",
  "Python",
  "JavaScript",
  "C#",
  "PHP",
  "C/C++",
  "R",
  "TypeScript",
  "Swift",
  "Objective-C",
  "jQuary",
  "Express",
  "Angular",
  "Vue.js",
  "ASP.NET Core",
  "Flask",
  "ASP.NET",
  "Django",
].sort();
export { languages, predefinedSkills};
