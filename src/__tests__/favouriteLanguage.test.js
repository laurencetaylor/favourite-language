const FavouriteLanguage = require("../favouriteLanguage");
const axios = require("axios");
jest.mock("axios");

describe("FavouriteLanguage", () => {
  let favourite;

  beforeEach(() => {
    favourite = new FavouriteLanguage();
  });

  describe("#determine", () => {
    test("returns the most frequently used language in happy case", async () => {
      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: [
            { language: "Ruby" },
            { language: "Ruby" },
            { language: "JavaScript" }
          ]
        })
      );

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          data: [
            { language: "JavaScript" },
            { language: "JavaScript" },
            { language: "Ruby" }
          ]
        })
      );

      expect(await favourite.determine()).toStrictEqual("Ruby");
      expect(await favourite.determine()).toStrictEqual("JavaScript");
    });

    test("returns multiple most frequently used languages", async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          data: [{ language: "JavaScript" }, { language: "Ruby" }]
        })
      );

      expect(await favourite.determine()).toStrictEqual("JavaScript, Ruby");
    });

    test("returns a relevant message when user does not exist", async () => {
      axios.get.mockImplementation(() =>
        Promise.reject({
          response: { status: 404 }
        })
      );

      expect(await favourite.determine()).toStrictEqual(
        "<Error>: User not found"
      );
    });

    test("returns a different message when something else goes wrong", async () => {
      const codes = [400, 401, 403, 405, 409, 500, 503];
      codes.forEach(code => {
        axios.get.mockImplementationOnce(() =>
          Promise.reject({
            response: { status: code }
          })
        );
      });

      for (let i = 0; i < codes.length; i++) {
        expect(await favourite.determine()).toStrictEqual(
          "<Error>: Something went wrong"
        );
      }
    });
  });
});
