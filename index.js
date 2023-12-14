const accessKey = 'jCDa0w4nFAmK99yBiVdN0Nwy5oO2OJsD5I04t80cTVM';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

// unsplash WEBSITE (public authentication)


let page = 1;
// Function to fetch images using Unsplash API
const fetchImages = async (query , pageNo) => {
    // console.log(query)
    try {
        
  
             if (pageNo ===1) {
                 imagesContainer.innerHTML = '';
             }

             const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`

             const response = await fetch(url);
             const data = await response.json();
             // console.log(data);
         
             if(data.results.length > 0){
                
                 data.results.forEach((photo) => {
                     const imageElement = document.createElement('div');
                     imageElement.classList.add('imageDiv');
                     imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`

                     // creating overlay
                     const overlayElement = document.createElement('div');
                     overlayElement.classList.add('overlay');

                     // creating overlay Text
                     const overlayText = document.createElement('h3');
                     overlayText.innerHTML = `${photo.alt_description}`;


                     overlayElement.appendChild(overlayText);
                     imageElement.appendChild(overlayElement);
                     imagesContainer.appendChild(imageElement);
                 });

                 if(data.total_pages === pageNo) {
                     loadMoreBtn.style.display = 'none'
                 }
                 else{
                     loadMoreBtn.style.display = 'block';

                 }
             }
             else{
                 imagesContainer.innerHTML = `<h2>No image found....</h2>`
            }
    } catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. please try again later...</h2>`;
        if(loadMoreBtn.style.display === 'block') {
            loadMoreBtn.style.display === 'none';
        }

    }

}

// Adding event listener to search form

searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText,page);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a search query....</h2>`
    }
    // console.log(searchInput.value);
})


// Adding event listener to load more button to fetch more images
loadMoreBtn.addEventListener('click',() => {
    fetchImages(searchInput.value.trim(), ++page)
})