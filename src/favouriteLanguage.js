const axios = require("axios");

const NOTFOUNDMESSAGE = "<Error>: User not found";
const ERRORMESSAGE = "<Error>: Something went wrong";

class FavouriteLanguage {
  async determine(username) {
    const response = await this._fetchData(username);
    if (typeof response === "string") {
      return response;
    } else {
      return this._calculateMostFrequentLanguages(response.data);
    }
  }

  _fetchData(username) {
    return axios
      .get(`https://api.github.com/users/${username}/repos?per_page=100`)
      .catch(error => this._classifyError(error));
  }

  _classifyError(error) {
    if (error.response.status === 404) {
      return NOTFOUNDMESSAGE;
    } else {
      return ERRORMESSAGE;
    }
  }

  _calculateMostFrequentLanguages(data) {
    let [frequencies, highestFrequency, mostFrequentLangs] = [{}, 0, []];
    data.forEach(function(repo) {
      const lang = repo.language;
      if (lang === null) return;
      frequencies[lang] ? frequencies[lang]++ : (frequencies[lang] = 1);
      if (frequencies[lang] > highestFrequency) {
        highestFrequency = frequencies[lang];
        mostFrequentLangs = [lang];
      } else if (frequencies[lang] === highestFrequency) {
        mostFrequentLangs.push(lang);
      }
    });
    return this._determineMessage(mostFrequentLangs);
  }

  _determineMessage(mostFrequentLangs) {
    if (mostFrequentLangs.length === 0) {
      return "This user has no code";
    } else {
      return mostFrequentLangs.join(", ");
    }
  }
}

module.exports = FavouriteLanguage;
