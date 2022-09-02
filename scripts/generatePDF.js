const fs = require("fs");
const puppeteer = require("puppeteer");

// var a = true;

(async () => {
    const HTMLpath = ".next/server/pages/cheatsheet/";
    const CSSpath = ".next/static/css/";

    const MDFiles = fs
        .readdirSync(HTMLpath)
        .filter((fn) => fn.endsWith(".html"));

    Promise.all(
        MDFiles.map(async (html) => {
            const HTMLcontent = fs.readFileSync(HTMLpath + html, "utf8");

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
                CSScontents.map(
                    async (c) => await page.addStyleTag({ content: c })
                )
            );
            await page.addStyleTag({ path: "styles/pdf.css" });
            await page.evaluateHandle("document.fonts.ready");

            // if(a) console.log((await page.content()).toString('utf8'));
            // a = false;

            await page.pdf({
                path: `public/download/${html.replace(".html", "")}.pdf`,
                format: "A4",
                scale: 0.67,
                margin: {
                    top: "10mm",
                    left: "0mm",
                    right: "0mm",
                    bottom: "10mm",
                },
            });
            await browser.close();
        })
    );
})();
