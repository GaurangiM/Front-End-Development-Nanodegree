import { handleSubmit } from "../src/client/js/formHandler";

describe(handleSubmit, () => {
    test("it is defined", () => {
        expect(handleSubmit).toBeDefined
    });
});