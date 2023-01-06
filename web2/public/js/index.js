/*
 * jsonを受け取って画面に反映する
 */
function reqListener() {
  console.log(this.responseText);
  let summary = JSON.parse(this.responseText);
  let header = summary['header'];
  let thumbnail = summary['thumbnail'];
  let figcaption = summary['figcaption'];
  let articleTexts = summary['article_texts'];
  
  //console.log(articleTexts);

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

// js動作確認用（同じオリジン）
//const jsonUrl = "http://localhost:9090/json/article_summary.json";
// 本来の設定
const jsonUrl = "http://localhost:8080/json/article_summary.json";
//const jsonUrl = "http://localhost:8080/json/article_summary_nofig.json";

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", jsonUrl, true); // この中でDOMを操作しようとすると非同期じゃないと無理？！
req.send();

console.log(document.getElementById('main-thumb'));
console.log("=== [FINISH] main ===");