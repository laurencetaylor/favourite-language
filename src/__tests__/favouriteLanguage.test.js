const FavouriteLanguage = require("../favouriteLanguage");
const axios = require("axios");
jest.mock("axios");

describe("FavouriteLanguage", () => {
  describe("#determine", () => {
    test("returns the most frequently used language in happy case", async () => {
      axios.get.mockImplementationOnce(url =>
        Promise.resolve({
          status: 200,
          data: [
            { language: "Ruby" },
            { language: "Ruby" },
            { language: "JavaScript" }
          ]
        })
      );

      axios.get.mockImplementationOnce(url =>
        Promise.resolve({
          status: 200,
          data: [
            { language: "JavaScript" },
            { language: "JavaScript" },
            { language: "Ruby" }
          ]
        })
      );

      favourite = new FavouriteLanguage();
      expect(await favourite.determine()).toStrictEqual("Ruby");
      expect(await favourite.determine()).toStrictEqual("JavaScript");
    });

    test("returns a relevant message when user does not exist", async () => {
      axios.get.mockImplementation(url =>
        Promise.reject({
          response: { status: 404 }
        })
      );

      favourite = new FavouriteLanguage();
      expect(await favourite.determine()).toStrictEqual("User not found");
    });
  });
});
