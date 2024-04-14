const API_KEY ="4d73d620b72c44c1b65a34e36cd0fc23";
// let name = document.

//https://newsapi.org/v2/everything?q=tesla&from=2024-03-08&sortBy=publishedAt&apiKey=4d73d620b72c44c1b65a34e36cd0fc23
// https://newsapi.org/v2/everything?q=tesla&apiKey=4d73d620b72c44c1b65a34e36cd0fc23

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
     bindData(data.articles);
}

function bindData(articles){
    const newCardTemplate = document.getElementById("templet-news-card");
    let  cardsContainer = document.getElementById("card-container");

    cardsContainer.innerHTML = "";
    
    articles.forEach(article => {
        if(!article.urlToImage) return;

        // const cardClone =  newCardTemplate.content.cloneNode(true);
        const cardClone = newCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);

                                                                
    });
}


function fillDataInCard(cardClone ,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSourec = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSourec.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"
    });

    newsSourec.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', ()=>{
          window.open(article.url,"_blank");
    });

}


let curSelectedNav = null;
function navItemClick(id){
    fetchNews(id);
    const navItem =  document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}


const searcText = document.querySelector(".news-input");
const searcButton = document.querySelector(".search-button");


searcButton.addEventListener('click',()=>{
    const query = searcText.value;
    if(!query) return;
    console.log(query);
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});


const companyLogo = document.querySelector(".company-logo");
companyLogo.addEventListener('click',()=>{
  
    location.reload();
});