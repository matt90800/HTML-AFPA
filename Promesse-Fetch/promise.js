const main = document.querySelector('main');
let previousURL;

const createCard = (element)=> {


    const article = document.createElement('article');
    article.style.backgroundColor='lightgrey'

    const link=document.createElement("a");
    link.id="link";
    link.href="#"
    link.class="card-link";
    link.innerText="Link to show";

    //API 2
    if (element.show==undefined){
        article.className='card col-11 m-5';
        link.addEventListener("click",(e)=>{
            main.innerHTML = '';   
            console.log(previousURL)
            fetchData(previousURL,false);
              //  main.append(createCard(element.currentPage,false)) 
        });
    } else { //API 1
        element=element.show;
        article.className='card col-sm-12 col-md-6 col-lg-4';

        link.addEventListener("click",(e)=>{
            main.innerHTML = '';   
            const url = element._links.self.href
            fetch (url)
            .then(response => response.json())
            .then(json => {

                main.append(createCard(json)) 
        });
        })


    }

    article.innerHTML=`
            <img src=${element.image!=null?element.image.original:"placeholder-image.png"} class="card-img-top img-fluid" alt="Image not found">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.genres}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${element.summary}</li>
                <li class="list-group-item">${element.status}, ${element.premiered}, ${element.ended}</li>
                <li class="list-group-item"></li>
            </ul>`
    const div=document.createElement("div");
    div.className="card-body"
    /*   <div class="card-body"> */
    article.append(div);

    
    div.append(link);


        return article;
}


//boolean to determine if the 1st parameter is a full path, or just a research value.
const fetchData = (searchResult,boolean) => {
    const url = boolean?`https://api.tvmaze.com/search/shows?q=${searchResult}`:searchResult
    console.log("url : "+ url)
    fetch (url)
        .then(response => response.json())
        .then(json => {
            json.length>1 ?
            json.forEach(
                element => {
                    previousURL=url;
                    main.append(createCard(element))
                }
            ) :
            main.append(createCard(json)) 
    })
}

const search = document.querySelector("#search");

if(search.nodeValue==null) {
    console.log(search.nodeValue)
    fetchData('a',true);}


["click", "keydown","input"].forEach(ev=>{
    search.addEventListener(ev,(e)=> {
    console.log(e)
    console.log(search.value)
    main.innerHTML = '';   
    fetchData(search.value,true);
})
    });



document.querySelectorAll("article")

