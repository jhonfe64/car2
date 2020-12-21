const headers = document.getElementsByTagName("header");
const jumbo_promotion = document.getElementById("jumbo_promotion");
const carousel_items = document.getElementsByClassName("car_carousel_item");
const new_page = document.getElementsByClassName("new_page");
var  model_select = document.getElementById("model_select");
const empty = document.getElementById("empty");
//mobile filters div
const filters = document.getElementsByClassName("filters");
const filters_btn = document.getElementsByClassName("filters_btn");

//filtros
const brand_filter = document.getElementById("brand_filter");
const model_filter = document.getElementById("model_filter");
const initialPrice_filter = document.getElementById("initialPrice_filter");
const AutoManual_filter = document.getElementById("AutoManual_filter");

//Actualizar productos
const update_product_information = document.getElementById("update_product_information");
const delete_image = document.getElementsByClassName('delete_image');
const existing_img_container = document.getElementsByClassName('existing_img_container');
const product_id = document.getElementById('product_id');
const update_info = document.getElementById('update_info');
const updatePicturesInput = document.getElementById("updatePicturesInput");
const cars_images = document.getElementById("cars_images");

//formulario responder mensajes admin
const message_info = document.getElementsByClassName("message_info");

if(message_info){
 
    for(i=0; i<message_info.length; i++){
        message_info[i].addEventListener("click", function(){
        let names_lastname = this.children[1].innerHTML;
        let user_message = this.children[5].value;
        let product_id =  this.children[4].value;

        $.post('/productById/'+ product_id)
            .done(data=>{
            console.log(data);
         });



            const messages_table = document.getElementById("messages_table");
            messages_table.innerHTML = `
            <h5 class="d-inline">De: </h5> ${names_lastname}
            <h5 class="mt-2">producto: </h5>

            <h5 class="mt-2">Mensaje: </h5>
            <p class="mb-5 text-justify">
                ${user_message}
            </p>

            <img src="" alt="">

            <h3 class="mb-3">Responder este mensaje</h3>
            <form>
                <div class="form-group">
                    <textarea class="form-control  text_area_min_height"></textarea>
                </div>
                <button type="submit" class="btn btn-primary pr-5 pl-5">Enviar</button>
            </form>
        `
        });
    }
}

//perfil de usuario centro de mensajes










// .style.transform = "rotate(7deg)";
if(filters_btn){
    for(i=0; i<filters_btn.length; i++){
        filters_btn[i].addEventListener("click", function(){
            this.style.transition = ".5s";
            this.classList.toggle("rotateArrow");
        });
    }
}


if(carousel_items.length > 0){
    carousel_items[0].classList.add("active");
}

if(headers[0]){
    var headerHeight = headers[0].clientHeight;
}



if(headers.length>0){
    if(jumbo_promotion){
        jumbo_promotion.style.marginTop = `${headerHeight}px`;
        jumbo_promotion.style.minHeight = `calc(100vh - ${headerHeight}px)`;
    }
}

if(new_page[0]){
    new_page[0].style.marginTop = `${headerHeight*2}px`;
}


if(new_page)
{     for(i=0; i<new_page.length; i++){
         new_page[i].style.marginTop = `${headerHeight *2 }px`;
     }
 }



 console.log(headerHeight );
 if(filters){
    for(i=0; i<filters.length; i++){
        filters[i].style.marginTop =  `${headerHeight}px`;
    }
 }



///aJAX


const brand = document.getElementById("brand");
var searching_btn = document.getElementById("searching_btn");


window.onload = function() {
    imprimirValor();
    models_number();
  }


//visitamos la ruta '/model/' + single_brand a la que le enviamos el parametro single_brand, con la marca del carro
//traemos los modelos del mismo de manera asincrona
  function imprimirValor(){
    if(brand){
        brand.addEventListener("change", function(){
            const single_brand = brand.value;
            if(single_brand !== "empty"){
                searching_btn.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>`;
                setTimeout(()=>{
                    $.post('/model/' + single_brand)
                    .done(data => {
                        console.log(data);
                        let results_number = data.length;
                        if(results_number == 1){
                            searching_btn.innerHTML = `${results_number} resultado`;
                        }else{
                            searching_btn.innerHTML = `${results_number} resultados`;
                        }
                            let option_default = document.createElement("option");
                            option_default.setAttribute("disabled", "");
                            option_default.setAttribute("selected", "selected")
                            option_default.innerHTML = "Seleccione un modelo";
                            model_select.appendChild(option_default);

                        for(i=0; i<data.length; i++){
                            model_select.removeAttribute("disabled");
                            let option = document.createElement("option");
                            option.setAttribute("name", `${data[i]}`);
                            option.innerHTML = `${data[i]}`;
                            model_select.appendChild(option);
                        }
                    });
                },500);
                model_select.innerHTML = "";
            }else{
                model_select.setAttribute("disabled", true);
                model_select.value = "Seleccione un modelo";
                searching_btn.innerHTML = ` <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"></path>
                <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"></path>
              </svg>Buscar`;
            }
        });

    }

  }


//visitamos la ruta model/quatity/+selected_model  selected model lleva el nombre del modelo del carro, hacemos
//la consulta y traemos la cantidad de autos con eso nombre

function models_number(){
    if(model_select){
        model_select.addEventListener("change", function(){
            const selected_model = model_select.value;
            searching_btn.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"><span class="sr-only">Loading...</span></div>`;
            setTimeout(() => {
                $.post('/model/quantity/' + selected_model)
                .done(data => {
                    if(data.car_model_quantity == 1){
                        searching_btn.innerHTML =  `${data.car_model_quantity} Resutado`;
                    }else{
                        searching_btn.innerHTML = `${data.car_model_quantity} Resutados`;
                    }
                });
            },500);
        });
    }
}


var car_info = [];

if(brand_filter){
    brand_filter.addEventListener("change", function(){
        //cuando cambie la marca del filter borre el modelo que esta en car_info[1]
        //limpie os options dentro del filtro model
        //car_info[1] = undefined;
        model_filter.innerHTML = "";
        var brand = brand_filter.value;
        if(brand){
            car_info[0] = brand;
            ajax_consult(car_info);
        }
    });
}


if(model_filter){
    model_filter.addEventListener("change", function(){
        var model = model_filter.value;
        if(model){
            car_info[1] = model;
            ajax_consult(car_info);
        }
    });
    model_filter.innerHTML = "";
    const ajax_consult = (car_info) => {
    var brand = car_info[0];
    var model = car_info[1];

    $.get('/product/filters/'+ brand + "/" + model)
    .done(data =>{

        console.log(data);

        // model_filter_option_disabled = document.createElement("option");
        // model_filter_option_disabled.setAttribute("disabled", "");
        // model_filter_option_disabled.setAttribute("selected", "");
        // model_filter_option_disabled.innerHTML = "Seleccione un modelo";
        // model_filter.appendChild(model_filter_option_disabled);
        all_models = [];
        if(data.length > 0){
            for(i of data){
                /*==========================================
                Eliminando los modelos repetidos
                ===========================================*/
                all_models.push(i.model);
                var d = new Set(all_models);
                var result = [...d];
                console.log(result);
               //creando opciones para los modelos
                model_filter.removeAttribute("disabled");
                model_filter_option = document.createElement("option");
                model_filter_option.setAttribute("value", i.model);
                model_filter_option.innerHTML = i.model;
                model_filter.appendChild(model_filter_option);
            }
        }
    });
}
ajax_consult();
}




//Editar productos

//cuando se haga click en la x de alguna de las imagenes que se trajeron (no de las nuevas que estoy subiendo)
//enviará los ids de as imagenes a las que le dio click en la x para enviarlas y asi eliminarlas del modelo
//le creará un input hidden a cada una
if(delete_image){
    function delete_images(){
        for(i=0; i<delete_image.length; i++){
            delete_image[i].addEventListener("click", function(){
                this.style.display = "none";
                this.nextElementSibling.style.display = "none";
                //cada una de las magenes que se cargan de la bd guarda su id en un input tipe hidden update products.ejs linea 105
                //al hacer click sobre el btn x obtengo el value de esa imagen que es el id de la imagen a eliminar
                let picture_id = this.nextElementSibling.nextElementSibling.value;
                //tomo el id de esa imagen y creo otro input para cada imagen que se va a eliminar con name = picture_id
                //con eso {picture_id} = req.body, me mostrara las ids de las imagenes a eliminar
                const new_imput = document.createElement("input");
                new_imput.setAttribute("type", "hidden");
                new_imput.setAttribute("name", "picture_id");
                new_imput.setAttribute("value", picture_id);
                update_product_information.appendChild(new_imput);
                //enviamos las ids de las imagenes que se vana  resubir
                remove_existing_image(picture_id);

            });
        }

        function remove_existing_image(picture_id){
            //seleccionamos del dom todos los elementos con class product_id update products.ejs linea 105
            const product_id = document.getElementsByClassName("product_id");
            for(i=0; i<product_id.length; i++){
                if(product_id[i].value === picture_id){
                    product_id[i].remove();
                }
            }
        }

    }

    delete_images();
}

//Al editar productos... cuando se sube una imagen nueva queremos que se muestre antes de enviarla

if(updatePicturesInput){
    //cuuando cambie el input
    updatePicturesInput.addEventListener("change", function(){
        //guarde la info de todas las imagenes seria un array
        var images = Array.from(updatePicturesInput.files);
        console.log(images);

        for(i=0; i<images.length; i++){
            //creamso un numero random para cada file
            let random_id = ((Math.random()*1000)+1);
            //le creamos el atributo id a cada file con el valor random_id
            images[i].id = random_id;
            //console.log(images[i]);

            const objectUrl = URL.createObjectURL(images[i]);
            //creando el btn x para elimnar la imagen
            let close_button = document.createElement("a");
            close_button.classList.add("new_delete_image_btn");
            close_button.innerHTML = "<span class='text-danger'><i class='fas fa-times-circle'></i><span>"

            //Ceando un div para mostar la imagen
            let new_car =  document.createElement("div");
            new_car.setAttribute("style", "width: 200px")
            new_car.setAttribute("class", "existing_img_container");
            new_car.innerHTML = `<img class="w-100" src=${objectUrl} id="${random_id}">`;
            cars_images.appendChild(close_button);
            cars_images.appendChild(new_car);
        }

        var new_image_id = "";
        //Al hacer click a el boton eliminar se obtiene el id
        const new_delete_image_btn = document.getElementsByClassName("new_delete_image_btn");
        for(i=0; i<new_delete_image_btn.length; i++){
           new_delete_image_btn[i].addEventListener("click", function(){
               this.style.display = "none";
               //console.log(this.nextElementSibling.firstElementChild);
               this.nextElementSibling.style.display = "none";
               new_image_id = this.nextElementSibling.firstElementChild.id;
                //pasamos el id a la funcion que va a eliminar dicha imagen del array images
                rewrite_file_list(new_image_id)
           });
        }

        //Debemos eliminar del Element list del input tipe files (ell array images), la imagen a la que el usuario le de click en el btn cerrar
        //basicamente lo que queremos es eliminar elementos del array images, y despues enviarle ese array sin los elementos eliminados al fileList
        //osea a los files del input updatePicturesInput.files = dataTransfer.files; ya que no es posible editar el file List hay que volverlo a enviar completo

        function rewrite_file_list(new_image_id){
            for(i of images){
                if(i.id == new_image_id){
                    images.splice(images.indexOf(i), 1);
                    const dataTransfer = new DataTransfer();
                    //Recorremos el array images
                        for(i=0; i<images.length; i++){
                        dataTransfer.items.add(new File(images, 'new car'));
                        updatePicturesInput.files = dataTransfer.files;
                    }
                }
            }
        }
        rewrite_file_list();
    });
}



function delete_images_ajax(){
    const id = product_id.value;
}

//LogIn page


if(window.location.pathname.includes("/logIn")){
    let signIn_body = document.getElementsByTagName('body')[0];
    console.log(signIn_body);
    signIn_body.classList.add("signInBody");
   
    var emailSignUp = document.getElementsByClassName("email")[0];
    var passwordSignUp = document.getElementsByClassName("password")[0];


    if(emailSignUp){
        emailSignUp.addEventListener("input", function(){
            var envelope = document.getElementsByClassName("envelope")[0];
            envelope.classList.add("text-primary");
            envelope.style.transition = "2s"

            if(emailSignUp.value.length < 1){
                envelope.classList.remove("text-primary");
                envelope.style.transition = "2s";
            }
        });

    }

    if(passwordSignUp){
        passwordSignUp.addEventListener("input", function(){
            var key = document.getElementsByClassName("key")[0];
            key.classList.add("text-primary");
            key.style.transition = "1.2s";

            if(passwordSignUp.value.length < 1){
                key.classList.remove("text-primary");
                key.style.transition = "1s";
            }
        });
    }

}

//SignUp page

if(window.location.pathname.includes("/signUp")){
    let signUp_body =  document.getElementsByTagName('body')[0];
    signUp_body.classList.add("signUpBody");

    let signUpInputs =  document.getElementsByTagName("input");
    for(i=0; i<signUpInputs.length; i++){
        signUpInputs[i].addEventListener("input", function(){
            this.previousElementSibling.classList.add('text-primary');
            this.previousElementSibling.style.transition = "1.2s";
            if(this.value.length < 1){
                this.previousElementSibling.classList.remove('text-primary');
            }
        });
    }
}









//==> trayendo la marca cuando cambie select




// 1. cuando cambie el select envie el valor a cada una de las variables, sobreescriba el valor si hace cambios
// 2. pero si el valor no viene que sesa undefined (analizar que todos tengan undefined de manera predeterminada)
// 3. si cambio la marca el resto de parametroos tienen que ser undefined porque se reinician las busquedas

// var brand = "chevrolet";
// var model = "suburban 2020";
// var color = "negro";
// var doors = "4";


// var full_data =  [brand, model, color, doors];

// console.log(full_data.join("+'/'+"));

// '/product/searching/'+d1+'/'+d2

// +d1+'/'+d2+'/'+d3+'/'+d4


// var asociativo_vacio = ["name": "h"]