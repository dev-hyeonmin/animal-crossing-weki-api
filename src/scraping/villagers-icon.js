const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');

let VillagerList = [];

async function crawl() {
    console.log("start");
    // 가상 브라우져를 실행, headless: false를 주면 벌어지는 일을 새로운 창을 열어 보여준다(default: true)
    const browser = await puppeteer.launch({ headless: true });
    const pageIndex = 9;
    const page = await browser.newPage();
    await page.goto(`https://nooks-list.com/villagers/?keyword=&page=${pageIndex}&order=0&direction=1`);

    let content = await page.content();
    let $ = cheerio.load(content);
    let listLength = $(".villager-query-item-container > .item").length;
    let index = 0;

    while (index != listLength) {
        page.waitForNavigation();
        await page.click(`.villager-query-item-container > .item:nth-child(${index + 1})`);

        // item info
        let itemPage = await browser.newPage();
        await itemPage.goto(page.url());

        let itemContent = await page.content();
        let $item = cheerio.load(itemContent);
        let icon = $item(".form-start").eq(0).find("img").attr("src");
        if (icon) {
            VillagerList.push({
                name: $item(".label-korean").text(),
                icon: icon,
            });
        }
        await itemPage.close();

        page.waitForNavigation();
        await page.goto(`https://nooks-list.com/villagers/?keyword=&page=${pageIndex}&order=0&direction=1`);

        index++;
    }

    await Promise.all(VillagerList.map(async (villager) => {
        console.log(`${index} Inserted villager :: ${villager.name}`);
        index++;

        await axios.post('http://localhost:4000/graphql', {
            query: `
                mutation createVillagers($createVillagersInput: CreateVillagersInput!) {
                    createVillagers(input: $createVillagersInput){        
                        ok
                        error
                    }
                }
            `,
            variables: {
                createVillagersInput: villager
            }
        }).then((res) => {
            // console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }));
    console.log(VillagerList);
    
    
    //닫기
    await browser.close();
};

crawl();