

# Translate Text Worldwide

## Functions :
- [X] - init - first function to run on the load of the app
- [X] - makeRequest(url, headers, method) - get a url, headers and method to run fetch function. If there is an error with the function, it'll throw error. else it'll return the response in json format. 
- [X] - getLanguagesFromJsonFile() - make a fetch request with "makeRequest()" to read the "languages.json" file and return the data in json format. Also calls "setLanguageOnSelect()" when the request is suceess.
- [X] - setLanguageOnSelect(elementId, data) - get a elemntId in the DOM and data (languages objects), mapping them and storing them in the DOM as select language.
- [X] - translateMessage() - when the user clicks the "Translate" button, it will detect which languages the user selected, if the user selected "Detect language" it'll detect the language of the given text using "detectLanguage()" function. Then it'll call promises.all of "getCountriesFromLngCode()" to get countries data about the chosen language, when the data arrived it'll call "setCountriesOnResult()" to show this countries on the page. Then it'll call "translateFromApi()" to translate the message from the user.
- [X] - detectLanguage(text) - get text from and make a request to [Detect Language API](detectlanguage.com) with "makeRequest()" to get and return the language of the given text.
- [X] - translateFromApi(sentence, langFrom, langTo) - get a sentence, language of the sentence, and language to translate to. make a request to [MyMemory - Translation Memory](https://rapidapi.com/translated/api/mymemory-translation-memory) with "makeRequest()" to get and return the translate of the given sentence.
- [X] - getCountriesFromLngCode(code) - get a "iso639" language code and make a request to [REST COUNTRIES](https://restcountries.eu) with "makeRequest()" to get and return data of the countries that use this language.
- [X] - setCountriesOnResult(countries, elementId) - get a elemntId in the DOM and data (countries objects), mapping them and storing them in the DOM as country name and their flag.

## API used in this app:
[Detect Language API](detectlanguage.com)
[MyMemory - Translation Memory](https://rapidapi.com/translated/api/mymemory-translation-memory)
[REST COUNTRIES](https://restcountries.eu)


## To Run this app :
- [X] -  Replace [DETECT_LANGUAGE_API_KEY] value with your API Key from [Detect Language API](detectlanguage.com).
- [X] -  Replace [MY_MEMORY_API_KEY] value with your API Key from [MyMemory - Translation Memory](https://rapidapi.com/translated/api/mymemory-translation-memory).
 