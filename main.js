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
            //console.log(res[0].title);
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

getData("");


function getCategories(){
    const options ={"method":"GET"};
    fetch (URLMain+"categories/", options)
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
getCategories("");


        //funcion de crear cards
        function createCards(prods){
            //meter en cards 20 productos de la data
            mainProds.innerHTML=""; //escribir mainProds en el html
            //usar un for para la condición
            //for (let inicio; condicion[i]; contador n++)
            for (let i = 0; i < prods.length; i++) {
                const modalId = `ExampleModal-${i}`;
                console.log(prods[i].title)
                console.log(prods[i].image)
                mainProds.insertAdjacentHTML("beforeend",//es insert no confundir con inner
                    
                    //primera parte cards de la página

                    // segunda parte modal del area de obtener mas información
                
                    `<div class="card" style="width: 18rem;">
                    <img src="${prods[i].image}" class="card-img-top" alt="${prods[i].title}">
                    <div class="card-body">
                    <h5 class="card-title">${prods[i].title}</h5>
                    <p class="card-text">${prods[i].description.slice(0,60)} precio $ ${prods[i].price}</p>
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal"  data-bs-target="#${modalId}">Saber mas del producto</a>
        
        
        
        <!-- Modal -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalTitle-${i}">${prods[i].title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            ${prods[i].description} <b><br>Precio=$ ${prods[i].price}</b>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Comprar</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        `)
                }
        }; // fin de las cards y el modal
        //fin del programa