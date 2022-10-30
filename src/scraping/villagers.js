const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let VillagerList = {};

async function crawl() {
    console.log("start");
    // 가상 브라우져를 실행, headless: false를 주면 벌어지는 일을 새로운 창을 열어 보여준다(default: true)
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // headless: false일때 브라우져 크기 지정해주는 코드
    // await page.setViewport({
    //     width: 1366,
    //     height: 768
    // });

    //페이지 이동
    await page.goto('https://animalcrossing.soopoolleaf.com/ko/acnh/animalsearch/?soopoolleaf=all');

    //해당 페이지에 특정 html 태그를 클릭
    for (var i = 0; i < 9; i++){
        console.log(`page: ${i}`);
        await page.click('.btn_div_more .btn.moreBtn');
        await new Promise((resolve, reject) => setTimeout(resolve, 1500));
    }

    // 현재 페이지의 html정보를 로드
    const content = await page.content();
    const $ = cheerio.load(content);
    const lists = $("#show_product .media");
    lists.each((index, list) => {
        VillagerList[index] = {
            image: $(list).find(".media-left img").attr("src"),
            species: $(list).find(".media-left > h4 > a").text(),
            name: $(list).find(".media-body > .list-group-item-text:nth-child(1) > h4 > span > a").text(),
            personality: $(list).find(".media-body > .list-group-item-text:nth-child(3) > h4 > span > a > span > span").text(),
            gender: $(list).find(".media-body > .list-group-item-text:nth-child(4) > h4 > span > span > span").text() == '♂' ? "여" : "남",
            birth: $(list).find(".media-body > .list-group-item-text:nth-child(5) > h4 > span > a").text(),
            speack: $(list).find(".media-body > .list-group-item-text:nth-child(6) > h4 > span > span").text(),
            speackType: $(list).find(".media-body > .list-group-item-text:nth-child(7) > h4 > span > span").text(),
            hobby: $(list).find(".media-body > .list-group-item-text:nth-child(9) > h4 > span > span").text(),
            music: $(list).find(".media-body > .list-group-item-text:nth-child(11) > h4 > span > span").text(),
            style: $(list).find(".media-body > .list-group-item-text:nth-child(14) > h4 > span > span").text(),
            style2: $(list).find(".media-body > .list-group-item-text:nth-child(15) > h4 > span > span").text(),
            color: $(list).find(".media-body > .list-group-item-text:nth-child(16) > h4 > span > span").text(),
            color2: $(list).find(".media-body > .list-group-item-text:nth-child(17) > h4 > span > span").text(),
            favoriteTalk: $(list).find(".media-body > .list-group-item-text:nth-child(20) > h4 > span > span").text(),
        }
        console.log(VillagerList[index]);
    });

    //닫기
    await browser.close();
};

crawl();