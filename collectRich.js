// 衣服列表
const data = [...document.querySelectorAll("#mw-content-text div.item-baseinfo div.item-name.rarity-common")].map(item => item.innerText);
// 套装名称
const name = document.querySelector("#firstHeading > h1").innerText;
// 预览图
const preview = document.querySelector(".blueimp-gallery > div.slides > div > img")?.src
    || document.querySelector("#mw-content-text > div > div.floatright > a > img")?.src
    || '';
// wikiLink
const link = location.href;

const text = JSON.stringify({
    name,
    link,
    preview,
    data
});


let textareaEl = document.createElement('textarea');
textareaEl.setAttribute('readonly', 'readonly');
textareaEl.value = text + ',';
document.body.appendChild(textareaEl);
textareaEl.select();
let res = document.execCommand('copy');
document.body.removeChild(textareaEl);