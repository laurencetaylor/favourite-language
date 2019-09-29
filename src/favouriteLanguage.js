const axios = require("axios");

const NOTFOUNDMESSAGE = "<Error>: User not found";
const ERRORMESSAGE = "<Error>: Something went wrong";

class FavouriteLanguage {
  async determine(username) {
    const response = await this._fetchData(username);
    if (response === NOTFOUNDMESSAGE || response === ERRORMESSAGE) {
      return response;
    } else {
      return this._determineMessage(response.data);
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

  _determineMessage(data) {
    if (this._hasNoCode(data)) {
      return "This user has no code";
    } else {
      return this._calculateMostFrequentLanguages(data);
    }
  }

  _calculateMostFrequentLanguages(data) {
    let [frequencies, highestFrequency, mostFrequentLang] = [{}, 0, []];
    data.forEach(function(repo) {
      const lang = repo.language;
      frequencies[lang] ? frequencies[lang]++ : (frequencies[lang] = 1);
      if (frequencies[lang] > highestFrequency) {
        highestFrequency = frequencies[lang];
        mostFrequentLang = [lang];
      } else if (frequencies[lang] === highestFrequency) {
        mostFrequentLang.push(lang);
      }
    });
    return mostFrequentLang.join(", ");
  }

  _hasNoCode(data) {
    return data.length === 0 || data.every(repo => repo.language === null);
  }
}

module.exports = FavouriteLanguage;
