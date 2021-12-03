var data_obj;

//    LEITURA DO ARQUIVO:
function ler_arquivo_corrompido() {
    var fs = require('fs');
    try {
        var data = fs.readFileSync('broken-database.json', 'utf8');
        data_obj = JSON.parse(data);
    } catch (err) {
        console.error(err);
   }
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

//    EXPORTAR BANCO CORRIGIDO:
function exporta_arquivo_corrigido() {
    var fs = require('fs');
    var data_json = JSON.stringify(data_obj);
    var dados = fs.writeFileSync('saida.json', data_json,'utf8');
}

// LEITURA DO ARQUIVO (BANCO CORRIGIDO):
function ler_arquivo_tratado() {
    var fs = require('fs');
    try {
        var data = fs.readFileSync('saida.json', 'utf8');
        data_obj = JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
}

// VALIDAÇÃO 1: IMPRESSÃO DE NOMES DOS PRODUTOS POR CATEGORIA (EM ORDEM ALFABÉTICA) E ID (EM ORDEM CRESCENTE):
function validacao_nomes() {    
    data_obj.sort(function(a, b) {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;   
    })
    data_obj.sort(function(a, b) {
        return a.category < b.category ? -1 : a.category > b.category ? 1 : 0;
    })
    for(var i = 0; i < data_obj.length; i++) {
    console.log(data_obj[i].name);
    }
} 

// VALIDAÇÃO 2: IMPRESSÃO DE VALORES TOTAIS DOS PRODUTOS POR CATEGORIA:
function validacao_valores() {
    var valor_final = 0;
    var categoria_atual = "";

    data_obj.sort(function(a, b) {
        return a.category < b.category ? -1 : a.category > b.category ? 1 : 0;
    })

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

ler_arquivo_corrompido();
corrige_nome();
corrige_preco();
corrige_quantidade();
exporta_arquivo_corrigido();
ler_arquivo_tratado();
validacao_nomes();
validacao_valores();

