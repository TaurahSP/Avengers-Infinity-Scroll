let count = 5;
const apiKey = 'RG3T_7gCJqCaP2Llsu7d3SD2AYH8VLqaY_QHkZCgEg8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=avengers`;
const imageContainter = document.getElementById('img-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        //edge cases for slow internet conenction, we initially will load 5 photos then 30 for subsequent request
        count = 30
    }
}

// Helper Function to set attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put<img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainter.appendChild(item);
    });
}

//check to see if scrolling near bottom of page, Load more photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        imagesLoaded = 0;
        getPhotos();
    }
})

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
    } catch (error) {
        console.log('unable to connect to unsplash')
    }
}

getPhotos();