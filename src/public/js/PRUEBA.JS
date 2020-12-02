if(brand_filter){
    function product_filter(model){
        brand_filter.addEventListener("change", function(){
            
           var brand = brand_filter.value;
           $.get('/product/searching/'+ brand)
           .done(data => {
               //mostrar todos los autos por marca
               if(data.length > 0){
                new_ge.innerHTML = "";
                    console.log(data);
                    for(let i of data){
                        var new_card = document.createElement("div");
                        new_card.classList.add("card", "more_viewed_card", "mb-5", "border-0", "shadow-sm", "p-0")
                        new_card.innerHTML = `<div class="img_container">
                        <img src="../upload/${i.image[0].file_name}" class="card-img-top img-fluid" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${i.brand} ${i.model}</h5>
                            <div class="d-flex justify-content-between mb-3">
                                <span class="col-5 bg-light p-2 rounded-lg">${i.transmision}</span>
                                <span class="col-5 bg-light p-2 rounded-lg">${i.cylinder_capacity} L</span>
                            </div>
                            <h5 class="mb-3">${i.mileaje} km</h5>
                            <h5 class="mb-3">${i.price} COP</h5>
                            <a href="/product/${i._id}" class="btn btn-outline-danger d-block">Ver más</a>
                        </div>`
                        new_ge.appendChild(new_card);
                        //Agregando los modelos cuando ya esta seleccionada una marca
                        const model_option = document.createElement("option");
                        model_option.setAttribute("value", i.model);
                        model_option.innerHTML = i.model;
                        model_filter.appendChild(model_option);
                    }
               }
               //Si existe la marca, es decir si el usuario hizo seleccion de marca
           });
           model_filter.innerHTML = ""
           const model_option = document.createElement("option");
           model_option.setAttribute("value", "no_model")
           model_option.innerHTML = "Seleccione un modelo";
           model_filter.appendChild(model_option);
        });
        
    }
    const new_ge = document.getElementsByClassName("new_page_content")[0];
    //filtros, si existe una marca traigame todos los carros correspondientes a esa 
}
