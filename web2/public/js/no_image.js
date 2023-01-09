// NOTE
// assert {type: 'json'} の指定を使えば、jsonデータのみのファイルでもimport出来るようだ
// ただし、一部ブラウザではサポートしていないらしい
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules
//
// また、dynamic imort というやり方もあるようだ
// が、こちらは非同期処理になるので、XMLHttpRequest を使う時と同じような注意点は出てくるか？！
// https://qiita.com/tonkotsuboy_com/items/f672de5fdd402be6f065
// https://numb86-tech.hatenablog.com/entry/2020/01/04/131626
//
//import article from "../json/no_image.json" assert {type: 'json'};
import {article} from "../json/article_noimage.js";

/*
 * jsonを受け取って画面に反映する
 */
function reqListener() {
  let header = article['header'];
  let thumbnail = article['thumbnail'];
  let figcaption = article['figcaption'];
  let articleTexts = article['article_texts'];
  
  // タイトルの加工と反映
  let title = "概要記事【" + header + "】";
  document.title = title;

  // サムネイルの反映
  let mainThumb = document.getElementById('main-thumb');
  mainThumb.src = thumbnail;
  mainThumb.alt = header;
  mainThumb.title = header;

  // キャプションの反映
  if(figcaption) {
    let elementFigcaption = document.createElement('figcaption');
    elementFigcaption.textContent = figcaption;
    elementFigcaption.setAttribute('class', 'style-figcap');
    mainThumb.after(elementFigcaption);
  }

  // 記事本文の反映
  let articleTextsSection = document.getElementById('article-texts');
  for(const text of articleTexts) {
    let elementP = document.createElement('p');
    elementP.textContent = text;
    articleTextsSection.appendChild(elementP);
  }
}


console.log("=== [START] main ===");

reqListener() 

console.log(document.getElementById('main-thumb'));
console.log("=== [FINISH] main ===");