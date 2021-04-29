const header = document.querySelector('header.header-news');

const carouselItemCount = 4;

fetch('http://localhost:3000/news.json')
  .then(serverResponse => serverResponse.text())
  .then(responseText => {
    const data = JSON.parse(responseText);
    populateNewsCarousel(data.articles);
  });

function populateNewsCarousel(news){
  for(let i = 0; i < carouselItemCount; i++){
    let newsArticle = createDivForNews(news[i])
    header.appendChild(newsArticle)
  }
}

function createDivForNews(newsItem){
  const newsArticle = document.createElement('div');
  newsArticle.innerText = newsItem.title;
  return newsArticle;
}

