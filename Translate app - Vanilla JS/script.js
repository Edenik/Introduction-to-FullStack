let languages = [];

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
        console.log(err);
    });
}

const setLanguageOnSelect = (elementId, data) => {
    document.getElementById(elementId).innerHTML = `
    <label for="${elementId}" id="${elementId == 'fromLang' ? 'fromLangLabel' : 'toLangLabel'}">${elementId == 'fromLang' ? 'From Language:' : 'To Language:'}</label>
    <select id="${elementId}Selector" class="form-control">
    <option>Detect Language</option>
    ${data.map(lang =>
        (elementId == 'toLang' && lang['name'] === 'English') ?
            `<option value="${lang['code']}" selected>${lang['name']}</option>` :
            `<option value="${lang['code']}">${lang['name']}</option>`
    ).join('')}
    </select>`;;
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

    Promise.all([getCountriesFromLngCode(fromLang == 'iw' ? 'he' : fromLang), getCountriesFromLngCode(toLangSelectorValue == 'iw' ? 'he' : toLangSelectorValue)]).then((values) => {
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
        console.log(err);
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
        console.log(err);
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
            console.log(err);
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