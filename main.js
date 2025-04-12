const main = document.getElementsByTagName("main").item(0) //este main no funciona si el main class container no envuelve al h1 en el index
const URLMain = "https://fakestoreapi.com/products/" // se le pone un diagonal al final por que si no podria tener un funcionamiento distinto
const mainProds = document.getElementById("mainProds");
const ulMenu = document.getElementById("ulMenu");


function getData(cat){
    const options= {"method":"GET"};

    fetch(URLMain+cat, options)
        .then((response) => {
            console.log(response);
            response.json().then((res) => {
            //console.log(res.length);
            createCards(res);
            
                });
        })

        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
            ${err.message}
        </div>`);
        });

    
}//getData

    getData();


function getCategories(){
    const options ={"method" : "GET"};
    fetch (URLMain + "categories/", options)
    .then((response) =>{ // en espera de la promesa
        response.json().then((res)=>{
            //console.log(res.length);
            res.forEach((cat)=>{
                ulMenu.insertAdjacentHTML("afterbegin", 
                    `<li><a class="dropdown-item" style="cursor:pointer;" onclick="getData('category/${escape(cat)}');">${cat}</a></li>`);

                });
            
            });
        
        })
        .catch((err)=>{
            main.insertAdjacentHTML("beforeend", `<div class="alert alert-danger" role="alert">
                ${err.message}
                </div>`);
            });
        
        }//getCategories


        //funcion de crear cards
        function crearCards(prods){
            //meter en cards 20 productos de la data
            mainProds.innerHTML=""; //escribir mainProds en el html
            //usar un for para la condición
            //for (let inicio; condicion[i]; contador n++)
            //p de productos 
            for (let p = 0; p < prods.length; p++){
                console.log(prods[p].title)
                console.log(prods[p].image)
                mainProds.innerAdjacentHTML("beforeend", 
                
                    `<div class="card" style="width: 18rem;">
                    <img src="${prods[p].image}" class="card-img-top" alt="${prods[p].title}">
                    <div class="card-body">
                    <h5 class="card-title">${prods[p].title}</h5>
                    <p class="card-text">${prods[p].description.slice(0,60)} precio $ ${prods[p].price}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>`);
                }
        };