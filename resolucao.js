var data_obj;

//    LEITURA DO ARQUIVO:
function ler_arquivo() {
    var fs = require('fs');
    var data = fs.readFileSync('broken-database.json', 'utf8');
    data_obj = JSON.parse(data);
}

//    CORREÇÃO NOMES:
function corrige_nome() { 
    for (var i = 0; i < data_obj.length; i++) {
        data_obj[i].name = data_obj[i].name.replace(/[æ¢øß]/g, charactersToReplace => ({'æ': 'a', '¢': 'c', 'ø': 'o','ß': 'b'})[charactersToReplace]);
    }
}

//    CORREÇÃO PREÇOS:
function corrige_preco() {
    for (var i = 0; i < data_obj.length; i++) {
        data_obj[i].price = parseFloat(data_obj[i].price);
    }
}

//    CORREÇÃO QUANTIDADES:
function corrige_quantidade() {
    for (var i = 0; i < data_obj.length; i++) {
        if(typeof(data_obj[i].quantity) == "undefined") {
            data_obj[i] = {'id': data_obj[i].id, 'name': data_obj[i].name, 'quantity': 0, 'price': data_obj[i].price, 'category': data_obj[i].category};
            console.log(data_obj[i]);
        } else {
            console.log(data_obj[i]);
        }
    }
}



ler_arquivo();
corrige_nome();
corrige_preco();
corrige_quantidade();
