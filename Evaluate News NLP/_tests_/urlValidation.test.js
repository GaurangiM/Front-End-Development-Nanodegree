import { isValidURL } from "../src/client/js/urlValidation";

describe(urlValidator, () => {
    test("it should return false if the url does not start with http:// or https://", () => {
        expect(isValidURL('www.google.com')).toBe(false);
    });
    test("it should return true if the url starts with http://", () => {
        expect(isValidURL('http://www.google.com')).toBe(true);
    });
    test("it should return true if the url starts with https://", () => {
        expect(isValidURL('https://www.google.com')).toBe(true);
    });
    test("it should return true if the url starts with http:// but does not include www.", () => {
        expect(isValidURL('https://google.com')).toBe(true);
    });
    test("it should return true if the url starts with https:// but does not include www.", () => {
        expect(isValidURL('https://google.com')).toBe(true);
    });
});