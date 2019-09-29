const axios = require("axios");

const NOTFOUNDMESSAGE = "<Error>: User not found";
const ERRORMESSAGE = "<Error>: Something went wrong";

class FavouriteLanguage {
  async determine(username) {
    const response = await this._fetchData(username);
    if (response === NOTFOUNDMESSAGE || response === ERRORMESSAGE) {
      return response;
    } else {
      return this._calculateMostFrequentLanguages(response);
    }
  }

  _fetchData(username) {
    return axios
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .catch(function(error) {
        if (error.response.status === 404) {
          return NOTFOUNDMESSAGE;
        } else {
          return ERRORMESSAGE;
        }
      });
  }

  _calculateMostFrequentLanguages(response) {
    let [freqs, highestFreq, mostFreqLang] = [{}, 0, []];
    response.data.forEach(function(repo) {
      const lang = repo.language;
      freqs[lang] ? freqs[lang]++ : (freqs[lang] = 1);
      if (freqs[lang] > highestFreq) {
        highestFreq = freqs[lang];
        mostFreqLang = [lang];
      } else if (freqs[lang] === highestFreq) {
        mostFreqLang.push(lang);
      }
    });
    return mostFreqLang.join(", ");
  }
}

module.exports = FavouriteLanguage;
