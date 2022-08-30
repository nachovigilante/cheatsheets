const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
    const HTMLcontent = fs.readFileSync(
        ".next/server/pages/cheatsheet/html-css.html",
        "utf8"
    );
    const CSSpath = ".next/static/css/";
    const CSSfiles = fs
        .readdirSync(CSSpath)
        .filter((fn) => fn.endsWith(".css"));
    const CSScontents = CSSfiles.map((file) =>
        fs.readFileSync(CSSpath + file, "utf8")
    );

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--font-render-hinting=none",
        ],
    });

    const page = await browser.newPage();
    await page.setContent(HTMLcontent, {
        waitUntil: ["networkidle0"],
    });

    Promise.all(
        CSScontents.map(async (c) => await page.addStyleTag({ content: c }))
    );
    await page.evaluateHandle("document.fonts.ready");

    // console.log((await page.content()).toString('utf8'));

    await page.pdf({
        path: "public/test.pdf",
        format: "A4",
        scale: 0.67,
        margin: {
            top: "10mm",
            left: "10mm",
            right: "10mm",
            bottom: "10mm",
        },
    });
    await browser.close();
})();
