//import les functions et variables de variables.js et functions.js 
// Définition des constantes url de l'API
const MAIN_URL = "http://localhost:8000/api/v1/titles";
const MAIN_UL_2 = "http://localhost:8000/api/v1/titles/?page=2";

const ALL_BY_SCORE = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const ALL_BY_SCORE_2 = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page=2";

const URL_RECENT = "http://localhost:8000/api/v1/titles/?sort_by=-year";
const URL_RECENT_2 = "http://localhost:8000/api/v1/titles/?sort_by=-year&page=2";
//URL_RECENT.forEach(elem => getMostRecent(elem));

const URL_WORST = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
const URL_WORST_2 = "http://localhost:8000/api/v1/titles/?sort_by=imdb_score&page=2";;

const URL_BEST_MUSIC = "http://localhost:8000/api/v1/titles/?genre=Music&sort_by=-imdb_score";
const URL_BEST_MUSIC_2 = "http://localhost:8000/api/v1/titles/?genre=Music&page=2&sort_by=-imdb_score";

//Fonction Globale
// Put Data In Modales.
// Fonction globale à appeler avec un positionnement ainsi qu'un numéro id pour retrieve les data

// Fonction lancée par modalfunctionalities(x) permettant de mettre les données dans la modale suite à un click sur une jaquette de film
async function putdatainmodal(x) {
    const fullUrl = "http://localhost:8000/api/v1/titles/" + x;
    const response = await fetch(fullUrl);
    const dataSpecific = await response.json();
    // création des balises <div>
    let thisTitle = document.createElement("div");
    let thisGenre = document.createElement("div");
    let thisYear = document.createElement("div");
    let thisRated = document.createElement("div");
    let thisImdbScore = document.createElement("div");
    let thisDir = document.createElement("div");
    let thisActors = document.createElement("div");
    let thisDuration = document.createElement("div");
    let thisCountry = document.createElement("div");
    let thisBoxOffice = document.createElement("div");
    let thisSynopsis = document.createElement("div");
    let thisImage = document.createElement("img");

    // Lien des données avec les balises html
    thisTitle.append("Title: ", dataSpecific.title);
    thisGenre.append("Genre: ", dataSpecific.genres);
    thisYear.append("Release Year:",dataSpecific.year);
    thisRated.append("Rating: ", dataSpecific.rated);
    thisImdbScore.append("Imdb Score: ", dataSpecific.imdb_score);
    thisDir.append("Director(s): ", dataSpecific.directors);
    thisActors.append("Actors: ", dataSpecific.actors);
    thisDuration.append("Duration: ", dataSpecific.duration);
    thisCountry.append("Country : ", dataSpecific.countries);
    thisBoxOffice.append("Box Office: ", dataSpecific.worldwide_gross_income);
    thisSynopsis.append("Synopsis: ", dataSpecific.description);
    thisImage.setAttribute("src", dataSpecific.image_url);
    //Ajout des données dans la modale k
    let container = document.createElement("div");
    container.id = "content";
    let modal = document.querySelector(".modal-content");
    modal.appendChild(container);
    container.appendChild(thisTitle);
    container.appendChild(thisGenre);
    container.appendChild(thisYear)
    container.appendChild(thisRated);
    container.appendChild(thisImdbScore);
    container.appendChild(thisDir);
    container.appendChild(thisActors);
    container.appendChild(thisDuration);
    container.appendChild(thisCountry);
    container.appendChild(thisBoxOffice);
    container.appendChild(thisSynopsis);
    container.appendChild(thisImage);
}

// Fonction qui se lance suite aux addEventListener qui va faire référence à la modale puis lance putdatainmodal(x)
async function modalfunctionalities(x) {
    //Création de la modale
    let modalBtn = document.getElementById(String("modal-btn-"+x));
    //let modalBtn = document.getElementById(String("modal-btn-"+x));
    let modal = document.querySelector(".modal");
    //modal.style.display = "block";
    //let modal = document.getElementById(String("modal-"+x));
    let closeBtn = document.querySelector(".close-btn");
    //let closeBtn = document.getElementById(String("close-btn-"+x));
    modalBtn.onclick = function (){
        putdatainmodal(x)
        modal.style.display = "block";
        
    }
    closeBtn.onclick = function(){
           //cleans data off of the modal
            var oldData = document.getElementById("content")
            oldData.parentNode.removeChild(oldData);
            //allows to hide the modal
            modal.style.display = "none";
        
    }
    window.onclick = function(e){
        if(e.target == modal){
            //cleans data off of the modal
            var oldData = document.getElementById("content")
            oldData.parentNode.removeChild(oldData);
            //allows to hide the modal
            modal.style.display = "none";
        }
    }
}

async function createcarouselbuttons(category) {
    //ajout des deux buttons de nav du carousel
    let buttonprevious = document.createElement("div");
    buttonprevious.className = "carousel-button-prev";
    let btnpre = document.createElement("btn");
    let imgpre = document.createElement("img");
    imgpre.alt = "previous";
    imgpre.src = "img/redarrowleft.jpg"
    //buttonprevious.innerHTML = "previous";
    
    let buttonnext = document.createElement("div");
    buttonnext.className = "carousel-button-next";
    let btnnext = document.createElement("btn");
    let imgnext = document.createElement("img");
    imgnext.alt = "next";
    imgnext.src = "img/redarrowright.jpg";
    //let contentnext = document.createElement("img");
    //contentnext.src = "img/btnnext.PNG";
    document.getElementById(category).prepend(buttonprevious);
    buttonprevious.appendChild(btnpre);
    btnpre.appendChild(imgpre);
    document.getElementById(category).appendChild(buttonnext);
    buttonnext.appendChild(btnnext);
    btnnext.appendChild(imgnext);
    //add des eventListeners sur les boutons de nav
    buttonprevious.addEventListener("click", animatecarousel(category, buttonprevious));
    buttonnext.addEventListener("click", animatecarousel(category, buttonnext));

}

async function display4firstmovies(category) {
    let allImages = document.getElementById(category).getElementsByClassName("carousel__item");
    for (let z = 4; z < 7; z++) {
        allImages[z].classList.add("hidden");
    };
    for (let z = 0; z < 4; z++) {
        allImages[z].classList.add("shown");
    }
}

async function animatecarousel(category, button) {
    console.log("carousel animated")
    let allImages = document.getElementById(category).getElementsByClassName("carousel__item");
    button.onclick = function () { 
        console.log("previous button clicked");
        for (let z = 0; z < 7; z++) {
            console.log(z);
            if (allImages[z].classList[1] == String("shown")) {
                allImages[z].classList.remove("shown");
                allImages[z].classList.add("hidden");
            } else { 
                allImages[z].classList.remove("hidden");
                allImages[z].classList.add("shown")}
        }
    }   
}

// définition de la fonction qui permet de récupérer les informations sur le meilleur film 
getBestMovie()
    //gestion des erreurs
    .then(response => {
        console.log('Best Movie Retrieved');
    })
    .catch(error => {
        console.log('Best Movie could not be retrieved');
        console.error(error);
    })

async function getBestMovie() {
    let category = "BestMovie";
    const response = await fetch(MAIN_URL);
    const data = await response.json();
    const idmovie = data.results[0].id;
    //détailing de la response
    const movie_data = data.results[0];
    // creation de la var url img a retrieve
    let imgUrl = movie_data.image_url;
    //création de la div modale
    let myDiv = document.createElement("div");
    //myClass.setAttribute("class", "modal", "id", "modalBest");
    myDiv.id = String("modal-"+idmovie);
    myDiv.style.display = "none";
    //création du bouton à insérer dans la modale
    let btn = document.createElement("button");
    btn.id = "modal-btn-" + idmovie;
    // recherche de la div BestMovie et ajout de la classe modale
    document.getElementById(category).appendChild(btn);
    let thisImage = document.createElement("img");
    thisImage.setAttribute("src", imgUrl);
    btn.append(thisImage);
    document.getElementById(category).appendChild(myDiv);
    document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
}

// définition de la fonction permettant d'avoir les 7 autres meilleurs films 
getBestMovies1()
    .then(response => {
        console.log('Best Movies & Retrieved');
    })
    .catch(error => {
        console.log('Best Movies 1 could not be retrieved');
        console.error(error);
    })
async function getBestMovies1() {
    const response = await fetch(MAIN_URL);
    const data = await response.json();
    let category = "BestMovies";
    // création de la boucle pour loop à travers les résultats
    for (let i = 1; i < 5; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;

        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        //fin de la création du carousel
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn)
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    getBestMovies2()
    .then(response => {
        console.log('Best Movies 2 Retrieved');
    })
    .catch(error => {
        console.log('Best Movies 2 could not be retrieved');
        console.error(error);
    })
}


async function getBestMovies2() {
    const response = await fetch(MAIN_UL_2);
    const data = await response.json();
    let category = "BestMovies";
    // création de la boucle pour loop à travers les résultats
    for (let i = 0; i < 3; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;
        //create <img> element
        //création de la div modale
        //création du bouton à insérer dans la modale
        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn);
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    // créer le fait qu'on voit que les 4 premiers films en display, les autres on met en none
    display4firstmovies(category);
    createcarouselbuttons(category);
}




// Fonction pour les meilleurs recent movies
// définition de la fonction permettant d'avoir les 7 autres meilleurs films 
getRecent1()
    .then(response => {
        console.log('Most Recent 1 Retrieved');
    })
    .catch(error => {
        console.log('Most Recent 1 could not be retrieved');
        console.error(error);
    })
async function getRecent1() {
    const response = await fetch(URL_RECENT);
    const data = await response.json();
    let category = "Recent";
    // création de la boucle pour loop à travers les résultats
    for (let i = 0; i < 5; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;
        //create <img> element
        //création de la div modale
        //création du bouton à insérer dans la modale
        //create carousel
        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        //fin de la création du carousel
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn)
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    getRecent2()
    .then(response => {
        console.log('Most Recent 2 Retrieved');
    })
    .catch(error => {
        console.log('Recent 2 could not be retrieved');
        console.error(error);
    })
}


async function getRecent2() {
    const response = await fetch(URL_RECENT_2);
    const data = await response.json();
    let category = "Recent";
    // création de la boucle pour loop à travers les résultats
    for (let i = 0; i < 2; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;
        //create <img> element
        //création de la div modale
        //création du bouton à insérer dans la modale
        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn);
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    // créer le fait qu'on voit que les 4 premiers films en display, les autres on met en none
    display4firstmovies(category);
    createcarouselbuttons(category);
}


// Pour les autres catégories on va faire un for each avec dedans page 1 les 4 et page 2 les 3
getWorst1()
    .then(response => {
        console.log('Worst 1 Retrieved');
    })
    .catch(error => {
        console.log('Worst 1 could not be retrieved');
        console.error(error);
    })
async function getWorst1() {
    const response = await fetch(URL_WORST);
    const data = await response.json();
    let category = "Worst";
    // création de la boucle pour loop à travers les résultats
    for (let i = 0; i < 5; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;
        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        //fin de la création du carousel
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn)
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    getWorst2()
    .then(response => {
        console.log('Worst 2 Retrieved');
    })
    .catch(error => {
        console.log('Worst 2 could not be retrieved');
        console.error(error);
    })
}


async function getWorst2() {
    const response = await fetch(URL_WORST_2);
    const data = await response.json();
    let category = "Worst";
    // création de la boucle pour loop à travers les résultats
    for (let i = 0; i < 2; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;
        //create <img> element
        //création de la div modale
        //création du bouton à insérer dans la modale
        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn);
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    // créer le fait qu'on voit que les 4 premiers films en display, les autres on met en none
    display4firstmovies(category);
    createcarouselbuttons(category);
}

// Catégorie Music

getMusic1()
    .then(response => {
        console.log('Music 1 Retrieved');
    })
    .catch(error => {
        console.log('Music 1 could not be retrieved');
        console.error(error);
    })
async function getMusic1() {
    const response = await fetch(URL_BEST_MUSIC);
    const data = await response.json();
    let category = "BestMusic";
    // création de la boucle pour loop à travers les résultats
    for (let i = 0; i < 5; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;

        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        //fin de la création du carousel
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn)
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    getMusic2()
    .then(response => {
        console.log('Music 2 Retrieved');
    })
    .catch(error => {
        console.log('Music 2 could not be retrieved');
        console.error(error);
    })
}


async function getMusic2() {
    const response = await fetch(URL_BEST_MUSIC_2);
    const data = await response.json();
    let category = "BestMusic";
    // création de la boucle pour loop à travers les résultats
    for (let i = 0; i < 2; i++) {
        var idmovie = data.results[i].id;
        //détailing de la response
        let movie_data = data.results[i];
        // creation de la var url img a retrieve
        let imgUrl = movie_data.image_url;
        //create <img> element
        //création de la div modale
        //création du bouton à insérer dans la modale
        let carouselItem = document.createElement("div");
        carouselItem.className = "carousel__item";
        let btn = document.createElement("button");
        btn.id = "modal-btn-" + idmovie;
        // recherche de la div BestMovies et ajout de la classe modale
        document.getElementById(category).appendChild(carouselItem);
        carouselItem.appendChild(btn);
        let thisImage = document.createElement("img");
        thisImage.setAttribute("src", imgUrl);
        btn.append(thisImage);
        document.getElementById(btn.id).addEventListener("click", modalfunctionalities(idmovie));
    }
    // créer le fait qu'on voit que les 4 premiers films en display, les autres on met en none
    display4firstmovies(category);
    createcarouselbuttons(category);
}