const axios = require("axios");

class FavouriteLanguage {
  async determine(username) {
    const response = await this._fetchData(username);
    if (response === "User not found") {
      return response;
    } else {
      return this._calculateMostFrequentLanguage(response);
    }
  }

  _fetchData(username) {
    return axios
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .catch(function(error) {
        if (error.response.status === 404) {
          return "User not found";
        }
      });
  }

  _calculateMostFrequentLanguage(response) {
    let [freqs, highestFreq, mostFreqLang] = [{}, 0, null];
    response.data.forEach(function(repo) {
      const lang = repo.language;
      freqs[lang] ? freqs[lang]++ : (freqs[lang] = 1);
      if (freqs[lang] > highestFreq) {
        highestFreq = freqs[lang];
        mostFreqLang = lang;
      }
    });
    return mostFreqLang;
  }
}

module.exports = FavouriteLanguage;
