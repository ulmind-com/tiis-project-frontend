import { chromium } from 'playwright';
import path from 'path';

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
        await page.setViewportSize({ width: 1440, height: 900 });
        console.log("Navigating to homepage");
        
        // Ensure we hit the public React route, NOT the admin view which is causing us to get the wrong page
        await page.goto("http://localhost:5173", { waitUntil: 'networkidle', timeout: 10000 });
        
        await page.waitForTimeout(3000);
        
        console.log("Scrolling to Blog section...");
        // Scroll specifically to the bottom section
        await page.evaluate(() => window.scrollTo(0, 3000));
        await page.waitForTimeout(2000);

        const imgPath = 'C:\\Users\\baner\\.gemini\\antigravity\\brain\\e7a7f9ac-df1c-48a3-ab1e-81e810e0715c\\bento_grid_final_postcss.png';
        await page.screenshot({ path: imgPath });
        console.log(`Saved screenshot to ${imgPath}`);

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await browser.close();
    }
})();
