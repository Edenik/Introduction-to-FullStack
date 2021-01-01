const API_KEY = "";

const makeRequest = async (url, headers, method, body) => {
    /* we can use these ways - */

    /* fetch - best way - with error handling */
    let response = await fetch(url, { method, headers });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    return await response.json();

    /* fetch with try catch */
    // try {
    //     let response = await fetch(url, { method, headers });
    //     return await response.json();
    // } catch (e) {
    //     throw new Error(`Error: ${e}`);
    // }

    /* one line code without error handling */
    // return await (await fetch(url, { method, headers, body })).json();


    /* two lines code without error handling */
    // let response = await fetch(url, { method, headers });
    // return await response.json();
}

const translate = async (sentence, langFrom, langTo) => {
    const url = `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${langFrom}%7C${langTo}&q=${encodeURI(sentence)}&mt=1&onlyprivate=0&de=a%40b.c`;
    const host = "translated-mymemory---translation-memory.p.rapidapi.com";
    const key = API_KEY;
    const headers = {
        "x-rapidapi-key": key,
        "x-rapidapi-host": host,
    };
    const method = "GET";
    // const body = {};
    // in this request we dont need to add request body


    let translatedText;
    await makeRequest(url, headers, method, null).then(data => {
        translatedText = data.responseData.translatedText;
    }).catch(err => {
        console.log(err);
    });
    return translatedText;
}

const translateStringWithNames = async (string, names) => {
    console.log('translating....');
    const stringInEnglish = await translate(string, 'iw', 'en');
    console.log(`${stringInEnglish} - ${names}`);
}