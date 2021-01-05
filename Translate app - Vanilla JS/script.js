let languages = [];
const DETECT_LANGUAGE_API_KEY = "d51b128e12310bdcf96f0a7b2bca0635";
const MY_MEMORY_API_KEY = "bd210f8d39mshaaa340100e6c6b5p186237jsnd44113e94e03";
const init = () => {
    getLanguagesFromJsonFile();
}

const makeRequest = async (url, headers, method) => {
    let response = await fetch(url, { method, headers });
    if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
    return response.json();
}

const getLanguagesFromJsonFile = async () => {
    const url = `./languages.json`;
    await makeRequest(url, {}, "GET").then(data => {
        setLanguageOnSelect('fromLang', data);
        setLanguageOnSelect('toLang', data);
        languages = data;
    }).catch(err => {
        alert(err);
    });
}

const setLanguageOnSelect = (elementId, data) => {
    document.getElementById(elementId).innerHTML = `
    <label for="${elementId}" id="${elementId == 'fromLang' ? 'fromLangLabel' : 'toLangLabel'}">
        ${elementId == 'fromLang' ? 'From Language:' : 'To Language:'}
    </label>
    <select id="${elementId}Selector" class="form-control">
        <option>Detect Language</option>
        ${data.map(lang =>
        (elementId == 'toLang' && lang['name'] === 'English') ?
            `<option value="${lang['code']}" selected>${lang['name']}</option>` :
            `<option value="${lang['code']}">${lang['name']}</option>`
    ).join('')}
    </select>`;
}

const translateMessage = async () => {
    const fromLangSelectorValue = document.getElementById('fromLangSelector').value;
    const toLangSelectorValue = document.getElementById('toLangSelector').value;
    const userMsg = document.getElementById('userMsg').value;
    const translatedMsgTextArea = document.getElementById('translatedMsg');
    const fromLangLabel = document.getElementById('fromLangLabel');
    let fromLang;

    // checks if user entered a message to translate
    if (userMsg == null || userMsg.trim() == '') throw new Error('User must enter text')

    if (fromLangSelectorValue === 'Detect Language') {
        fromLang = await detectLanguage(userMsg);
        const detectedLanguageName = languages.find((lang) => lang['code'] == fromLang);
        fromLangLabel.innerHTML = `Detected Language: ${detectedLanguageName['name']}`
    } else {
        fromLangLabel.innerHTML = `From Language:`
        fromLang = fromLangSelectorValue;
    }

    const promises = [
        getCountriesFromLngCode(fromLang == 'iw' ? 'he' : fromLang),
        getCountriesFromLngCode(toLangSelectorValue == 'iw' ? 'he' : toLangSelectorValue)
    ];

    Promise.all(promises).then((values) => {
        setCountriesOnResult(values[0], 'fromLangCountries');
        setCountriesOnResult(values[1], 'toLangCountries');
    })

    // if fromLanguage equals to toLanguage
    if (fromLang == toLangSelectorValue) {
        translatedMsgTextArea.value = userMsg;
        return;
    }

    const translatedText = await translateFromApi(userMsg, fromLang, toLangSelectorValue);

    translatedMsgTextArea.value = translatedText;
}

const detectLanguage = async (text) => {
    const apiKey = DETECT_LANGUAGE_API_KEY;
    const url = `https://ws.detectlanguage.com/0.2/detect?q=${encodeURI(text)}`;
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
    }
    let response;
    await makeRequest(url, headers, "GET").then(data => {
        response = data;
    }).catch(err => {
        alert(err);
    });
    return response.data.detections[0].language;
}

const translateFromApi = async (sentence, langFrom, langTo) => {
    const url = `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${langFrom}%7C${langTo}&q=${encodeURI(sentence)}&mt=1&onlyprivate=0&de=a%40b.c`;
    const host = "translated-mymemory---translation-memory.p.rapidapi.com";
    const key = MY_MEMORY_API_KEY;
    const headers = {
        "x-rapidapi-key": key,
        "x-rapidapi-host": host,
    };

    let translatedText;
    await makeRequest(url, headers, "GET").then(data => {
        translatedText = data.responseData.translatedText;
    }).catch(err => {
        alert(err);
    });
    return translatedText;
}

const getCountriesFromLngCode = async (code) => {
    const url = `https://restcountries.eu/rest/v2/lang/${code}`;
    let countries;
    return new Promise(async (resolve, reject) => {
        await makeRequest(url, {}, "GET").then(data => {
            countries = data.filter((country) => country['languages'][0]['iso639_1'] == code);
            resolve(countries);
        }).catch(err => {
            alert(err);
            reject(err)
        });
    })
}

const setCountriesOnResult = (countries, elementId) => {
    document.getElementById(elementId).innerHTML = `
    <h4>${countries[0].languages[0].name} is a mother tongue language at:</h4>
    ${countries.map(country => `
    <p>
        <strong>${country['name']}</strong> -
        <img src="${country['flag']}" alt="${country['name']}" height="25" width="25">
    </p>
    `).join('')}`
}

const newLangs = [
    {
        "code": "af",
        "name": "Afrikaans"
    },
    {
        "code": "am",
        "name": "Amharic"
    },
    {
        "code": "ar",
        "name": "Arabic"
    },
    {
        "code": "az",
        "name": "Azerbaijani"
    },
    {
        "code": "be",
        "name": "Belarusian"
    },
    {
        "code": "bg",
        "name": "Bulgarian"
    },
    {
        "code": "bn",
        "name": "Bengali"
    },
    {
        "code": "bs",
        "name": "Bosnian"
    },
    {
        "code": "ca",
        "name": "Catalan"
    },
    {
        "code": "cs",
        "name": "Czech"
    },
    {
        "code": "da",
        "name": "Danish"
    },
    {
        "code": "de",
        "name": "German"
    },
    {
        "code": "el",
        "name": "Greek"
    },
    {
        "code": "en",
        "name": "English"
    },
    {
        "code": "es",
        "name": "Spanish"
    },
    {
        "code": "et",
        "name": "Estonian"
    },
    {
        "code": "fa",
        "name": "Persian"
    },
    {
        "code": "fi",
        "name": "Finnish"
    },
    {
        "code": "fr",
        "name": "French"
    },
    {
        "code": "ga",
        "name": "Irish"
    },
    {
        "code": "gv",
        "name": "Manx"
    },
    {
        "code": "hi",
        "name": "Hindi"
    },
    {
        "code": "hr",
        "name": "Croatian"
    },
    {
        "code": "ht",
        "name": "Haitian_creole"
    },
    {
        "code": "hu",
        "name": "Hungarian"
    },
    {
        "code": "hy",
        "name": "Armenian"
    },
    {
        "code": "id",
        "name": "Indonesian"
    },
    {
        "code": "is",
        "name": "Icelandic"
    },
    {
        "code": "it",
        "name": "Italian"
    },
    {
        "code": "iw",
        "name": "עברית"
    },
    {
        "code": "ja",
        "name": "Japanese"
    },
    {
        "code": "ka",
        "name": "Georgian"
    },
    {
        "code": "kk",
        "name": "Kazakh"
    },
    {
        "code": "km",
        "name": "Khmer"
    },
    {
        "code": "ko",
        "name": "Korean"
    },
    {
        "code": "ku",
        "name": "Kurdish"
    },
    {
        "code": "ky",
        "name": "Kyrgyz"
    },
    {
        "code": "la",
        "name": "Latin"
    },
    {
        "code": "lb",
        "name": "Luxembourgish"
    },
    {
        "code": "lo",
        "name": "Laothian"
    },
    {
        "code": "lt",
        "name": "Lithuanian"
    },
    {
        "code": "lv",
        "name": "Latvian"
    },
    {
        "code": "mg",
        "name": "Malagasy"
    },
    {
        "code": "mi",
        "name": "Maori"
    },
    {
        "code": "mk",
        "name": "Macedonian"
    },
    {
        "code": "mn",
        "name": "Mongolian"
    },
    {
        "code": "ms",
        "name": "Malay"
    },
    {
        "code": "mt",
        "name": "Maltese"
    },
    {
        "code": "my",
        "name": "Burmese"
    },
    {
        "code": "ne",
        "name": "Nepali"
    },
    {
        "code": "nl",
        "name": "Dutch"
    },
    {
        "code": "no",
        "name": "Norwegian"
    },
    {
        "code": "ny",
        "name": "Nyanja"
    },
    {
        "code": "pa",
        "name": "Punjabi"
    },
    {
        "code": "pl",
        "name": "Polish"
    },
    {
        "code": "ps",
        "name": "Pashto"
    },
    {
        "code": "pt",
        "name": "Portuguese"
    },
    {
        "code": "ro",
        "name": "Romanian"
    },
    {
        "code": "ru",
        "name": "Russian"
    },
    {
        "code": "rw",
        "name": "Kinyarwanda"
    },
    {
        "code": "si",
        "name": "Sinhalese"
    },
    {
        "code": "sk",
        "name": "Slovak"
    },
    {
        "code": "sl",
        "name": "Slovenian"
    },
    {
        "code": "sm",
        "name": "Samoan"
    },
    {
        "code": "sn",
        "name": "Shona"
    },
    {
        "code": "so",
        "name": "Somali"
    },
    {
        "code": "sq",
        "name": "Albanian"
    },
    {
        "code": "sr",
        "name": "Serbian"
    },
    {
        "code": "st",
        "name": "Sesotho"
    },
    {
        "code": "sv",
        "name": "Swedish"
    },
    {
        "code": "sw",
        "name": "Swahili"
    },
    {
        "code": "ta",
        "name": "Tamil"
    },
    {
        "code": "tg",
        "name": "Tajik"
    },
    {
        "code": "th",
        "name": "Thai"
    },
    {
        "code": "tk",
        "name": "Turkmen"
    },
    {
        "code": "tr",
        "name": "Turkish"
    },
    {
        "code": "uk",
        "name": "Ukrainian"
    },
    {
        "code": "ur",
        "name": "Urdu"
    },
    {
        "code": "uz",
        "name": "Uzbek"
    },

    {
        "code": "vi",
        "name": "Vietnamese"
    },
    {
        "code": "xh",
        "name": "Xhosa"
    },
    {
        "code": "zh",
        "name": "Chinese_simplified"
    },
    {
        "code": "zu",
        "name": "zulu"
    }
  ]

const checkResponses = () => {
    newLangs.map(async (lang) => {
        let response = await translateFromApi('שלום לכם', 'iw', lang['code']);
        // if (!response.ok) console.log(`An error has occured: ${lang['code']} : ${lang['name']}`);
        console.log(lang['code'], response)
    })
}