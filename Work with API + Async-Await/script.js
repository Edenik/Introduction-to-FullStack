const makeRequest = async (url, headers, method, body) => {
    try {
        // we can use both ways -
        // let response = await fetch(url, { method, headers });
        // return await response.json();

        // or -
        return await (await fetch(url, { method, headers })).json();
    } catch (e) {
        console.log(`Error: ${e}`)
    }
}

const translate = async (sentence, langFrom, langTo) => {
    const url = `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${langFrom}%7C${langTo}&q=${encodeURI(sentence)}&mt=1&onlyprivate=0&de=a%40b.c`;
    const host = "translated-mymemory---translation-memory.p.rapidapi.com";
    const key = [PUT_API_KEY_HERE];
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
    });
    return translatedText;
}

const translateStringWithNames = async (string, names) => {
    console.log('translating....');
    const stringInEnglish = await translate(string, 'iw', 'en');
    console.log(`${stringInEnglish} - ${names}`);
}