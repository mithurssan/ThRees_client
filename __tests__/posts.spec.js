const { renderDOM } = require("./helpers");

let dom;
let document;

describe("posts.html", () => {
    beforeEach(async () => {
        dom = await renderDOM("./posts.html")
        document = await dom.window.document
    })

    it("has an the title Create Post in h1 when website loads", () => {
        const h1 = document.querySelector("h1");
        expect(h1.innerHTML).toContain("Create Post");
    })

    it("has a form for users to creat post", () => {
        const form = document.querySelector("form");
        expect(form).toBeTruthy();
    })

    it("has a submit button to post form", () => {
        const btn = document.querySelector("#submitBtn");
        expect(btn).toBeTruthy();
        expect(btn.type).toBe('submit');
    })
})
