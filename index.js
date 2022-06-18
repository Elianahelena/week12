class Plant {
    constructor(name) {
        this.name = name;
        this.waters = [];
    }

    addWater(name, ounce) {
        this.waters.push(new Water(name, ounce));
    }
}

class Water {
    constructor(name, ounce) {
        this.name = name;
        this.ounce = ounce;
    }
}

class PlantService {
    static url = 'https://www.mecallapi.com/api/users/create';
    
    

    static getAllPlants() {
        return $.get(this.url);
    }

    static getPlant(id) {
        return $.get(this.url + `/${id}`);
    }
    static createPlant(plant) {
        return $.post(this.url, plant);
    }
    static updatePlant(plant) {
        return $.ajax({
            url: this.url + `/${plant._id}`,
            dataType: 'json',
            data: JSON.stringify(plant),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deletePlant(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

    class DOMManager {
        static plants;

        static getAllPlants() {
            PlantService.getAllPlants().then(plants => this.render(plants));
        }
        static createPlant(name) {
            PlantService.createPlant(new Plant(name))
            .then(() => {
                return PlantService.getAllPlants();
            })
            .then((plants) => this.render(plants));
        }
        static deletePlant(id) {
            PlantService.deletePlant(id)
            .then(() => {
                return PlantService.getAllPlants();
            })
            .then((plants) => this.render(plants));

        }
static addWater(id) {
    for (let plant of this.plants) {
        if (plant._id == id) {
            plant.waters.push(new Water($(`#${plant._id}-water-name`).val(), $(`#${plant._id}-water-ounce`).val()));
            PlantService.updatePlant(plant) 
                .then(() => {
                    return PlantService.getAllPlants();
                })
            .then((plants) => this.render(plants));
        }
    }
}

static deletePlant(plantId, waterId) {
    for (let plant of this.plants) {
        if (plant._id == plantId) {
            for (let water of plant.waters) {
                if (water._id == waterId) {
                    plant.waters.splice(plant.waters.indexOf(waters), 1);
                    PlantService.updatePlant(plant)
                    .then(() => {
                        return PlantService.getAllPlants();
                    })
                    .then((plants) => this.render(plants));
                }
            }
        }
    }
}

        static render(plants) {
            this.plants = plants;
            $('#app').empty();
            for (let plant of plants) {
                $('#app').prepend(
                    `<div id="${plant._id}" class="card">
                    <div class="card-header>
                    <h2>${plant.name}</h2>
                    <button class="btn btn-danger" onclick="DOMManager.deletePlant('${plant._id}')">Delete</button> 
                    </div>
                    <div class="card-body">
                    <div class="card">
                    <div class="row">
                    <div class="col-sm">
                    <input type="text" id="${plant._id}-water-name" class="form-control" placeholder="Watered day">
                    </div>
                    <div class="col-sm">
                    <input type="text" id="${plant._id}-water-ounce" class="form-control" placeholder="Water Ounces">
                    </div>
                    </div>
                    <button id="${plant._id}-new-water" onclick="DOMManager.addWater('${plant._id}')" class="btn btn-primary form-control">Add</button>
                    </div>

                    </div>
                    </div><br>`
                    
                );
                for (let water of plant.waters) {
                    $(`#{plant._id}`).find('.card-body').append(
                        `<p>
                        <span id="name-${water._id}"><strong>Name: </strong> ${water.name}</span>
                        <span id="ounce-${water._id}"><strong>Name: </strong> ${water.ounce}</span>
                        <button class="btn btn-danger" onclick="DOMManager.deleteWater('${plant._id}', '${water._id}')">Delete Water</button>
                        `
                    )
                }
            }
        }
    }

    $('#create-new-plant').click(() => {
        DOMManager.createPlant($('#new-plant-name').val());
        $('#new-plant-name').val('');
    });

DOMManager.getAllPlants