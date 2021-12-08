// Import the File system module as fs to use methods
const fs = require('fs');
// Array responsible for receiving the objects present in the text file.
var data_obj = [];

// Read corruppted file:
function read_file_broken() {
    try {
        var data = fs.readFileSync('broken-database.json', 'utf8');
        if (data == "") {
            console.log("Seu arquivo esta vazio.");
        } else {
            data_obj = JSON.parse(data);
        }
    } catch (err) {
        console.error(err);
    }
}

// Execute name correction:
function fix_name() { 
    for (var i = 0; i < data_obj.length; i++) {
        data_obj[i].name = data_obj[i].name.replace(/[æ¢øß]/g, charactersToReplace => ({'æ': 'a', '¢': 'c', 'ø': 'o','ß': 'b'})[charactersToReplace]);
    }
}

// Execute price correction:
function fix_price() {
    for (var i = 0; i < data_obj.length; i++) {
        data_obj[i].price = parseFloat(data_obj[i].price);
    }
}

// Execute quantity correction:
function fix_quantity() {
    for (var i = 0; i < data_obj.length; i++) {
        if(typeof(data_obj[i].quantity) == "undefined") {
            data_obj[i] = {'id': data_obj[i].id, 'name': data_obj[i].name, 'quantity': 0, 'price': data_obj[i].price, 'category': data_obj[i].category};
            //console.log(data_obj[i]); // impressão dos objetos após correção.
        } else {
            // console.log(data_obj[i]); //impressão dos objetos após correção.
        }
    }
}

// Export database fixed:
function export_corrected_file() {
    try {
        var data_json = JSON.stringify(data_obj);
        fs.writeFileSync('saida.json', data_json,'utf8');
    } catch (err) {
        console.error(err);
    }
    
}

// Validation 1: Product names printing by category (alphabetic order) and by Id (ascending order):
function names_validation() {    
    if(data_obj.length > 0 ) {
        data_obj.sort(function(a, b) {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;   
        })
        data_obj.sort(function(a, b) {
            return a.category < b.category ? -1 : a.category > b.category ? 1 : 0;
        })
        console.log("\n\nVALIDAÇÃO 1: \n");

        for(var i = 0; i < data_obj.length; i++) {
            console.log(data_obj[i].name);
        }
    }
} 

// Validation 2: Products's full prices printing by category:
function values_validation() {
    var valor_final = 0;
    var categoria_atual = "";

    if(data_obj.length > 0 ) {
        data_obj.sort(function(a, b) {
            return a.category < b.category ? -1 : a.category > b.category ? 1 : 0;
        })
        console.log("\nVALIDAÇÃO 2: \n");
        for(i = 0; i < data_obj.length; i++) {
            if (categoria_atual != data_obj[i].category) {
                categoria_atual = data_obj[i].category;
                for(j = 0; j < data_obj.length; j++) {
                    if (categoria_atual == data_obj[j].category) {
                        valor_total_item = data_obj[j].quantity * data_obj[j].price;
                        valor_final = valor_final + valor_total_item;
                    }
                }
                console.log(categoria_atual + ": R$ " + valor_final.toFixed(2));            
            }  
            valor_final = 0;
        }
    }
}

read_file_broken();
fix_name();
fix_price();
fix_quantity();
export_corrected_file();
names_validation();
values_validation();

