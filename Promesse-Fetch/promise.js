const main = document.querySelector('main');
let previousURL;

const createCard = (element)=> {
    const article = document.createElement('article');
    article.style.backgroundColor='lightgrey'
    const linkFill=(link,href)=>{
        link.href=href
        link.class="card-link";
        link.innerText="Link to show";
    }

    const link=document.createElement("a");
    link.id="link";
    linkFill(link,"#");
    
    const officialLink=document.createElement("a");
    officialLink.id="officialLink";
    linkFill(officialLink,element.officialSite);

    //API 2
    if (element.show==undefined){
        article.className='card col-11 m-5';
        link.addEventListener("click",(e)=>{
            main.innerHTML = '';   
            fetchData(previousURL,false);
              //  main.append(createCard(element.currentPage,false)) 
        });
    } else { //API 1
        element=element.show;
        article.className='card col-sm-12 col-md-6 col-lg-4';

        article.addEventListener("click",(e)=>{
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
                <h4 class="card-title">${element.name}</h4>
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
    div.append(officialLink);


        return article;
}

const log=(msg, value)=>{
    console.log(msg +" : ");
    console.log(value);
    console.log();
}
//boolean to determine if the 1st parameter is a full path, or just a research value.
const fetchData = (searchResult,boolean) => {
    log("search result",searchResult)
    if (searchResult!=""){
        const url = boolean?`https://api.tvmaze.com/search/shows?q=${searchResult}`:searchResult
        log("url",url)
        fetch (url)
            .then(response => response.json())
            .then(json => {
                console.log(json.length)
                if (json.length>1) {
                    main.innerHTML='';
                    json.forEach(
                    element => {
                        previousURL=url;
                        main.append(createCard(element))
                    }
                )
            } else if(json.length==1)
            main.innerHTML='';
                main.append(createCard(json))
    
        })
    }
}

const search = document.querySelector("#search");
search.value=null;

if(search.value=="") {
    fetchData('a',true);}


["click","input"].forEach(ev=>{
    search.addEventListener(ev,(e)=> {
/*         e.key==" "? console.error("space entered"):"";
 */        search.value.trim()
    fetchData(search.value,true);
})
    });



document.querySelectorAll("article")

