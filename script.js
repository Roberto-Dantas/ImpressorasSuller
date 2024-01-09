//comum
//Planilha
//Banco de dados? NÃO

let data = await fetch('https://docs.google.com/spreadsheets/d/1iZYJDv_zUuFl5p_BE8RqS8e_egMiIqsbobBXrV4l6PY/gviz/tq?tqx=out:json').then(res => res.text()).then(text => JSON.parse(text.substr(47).slice(0, -2)));

if(typeof data === 'object') {
    var opcaoImpr = [];
    for(var i = 0; i <= data.table.rows.length -1; i++){
        if(data.table.rows[i].c[0] != null || data.table.rows[i].c[0] != undefined){
            opcaoImpr.length = data.table.rows.length
            for(var i = 0; i <= data.table.rows.length -1; i++){
                opcaoImpr[i] = document.createElement('option');
                opcaoImpr[i].value = `${i}`;
                opcaoImpr[i].text = `${data.table.rows[i].c[0].v.toString()}`;
                document.getElementById("selecao_impressora").add(opcaoImpr[i]);
            };
        };
    };
    dados(0);
}else{
    throw new Error('Sem conexão com a planilha dos dados');
}
document.getElementById("selecao_impressora").addEventListener('change', function(){
    document.querySelector("#tintas ul").innerHTML= "";
    dados(this.options[this.selectedIndex].value);
})
function dados(x){
    document.querySelector("#unidade_label").innerText = data.table.rows[x].c[1].v.toString().toUpperCase();
    document.querySelector("#local_label").innerText = data.table.rows[x].c[2].v.toString();

    let cheio = data.table.rows[x].c[3].v;
    let vazio = Number(data.table.rows[x].c[4].v);

    let ra = /\s*,\s*/;
    let re = /\s*-\s*/;

    let cheio0 = cheio.split(ra);
    let cheio1 = cheio0.map(item => parseInt(item));
    let cheio2 = cheio1.reduce((a, b) => a + b, 0);
    
    let quantidade = cheio2 + vazio;
    
    let qnt = document.getElementById("qnt");
    let pont = document.getElementById("pont");
    let porcentagem = document.querySelector(".porcentagem");

    qnt.innerHTML = cheio2;
    pont.style.strokeDashoffset = 440 - (440* cheio2) / quantidade;
    porcentagem.style.transform = `rotateZ(${360 / quantidade *cheio2}deg)`;

    //Separador cores
    var cores = data.table.rows[x].c[3].v

    let tinta = cores.split(re);
    tinta = cores.split(ra);

    //Bloco:
    let liElemento; 
    for(var i = 0; i <= tinta.length -1; i++){
        liElemento = document.createElement('li');
        liElemento.textContent = tinta[i];
        document.querySelector("#tintas ul").appendChild(liElemento);
    }
    tinta.length = 0;

    //Bloco:
    
    qnt = document.getElementById("por1");
    pont = document.getElementById("pont1");
    porcentagem = document.querySelector(".porcentagem1");
    qnt.innerHTML = vazio;
    pont.style.strokeDashoffset = 440 - (440* vazio) /quantidade;
    porcentagem.style.transform = `rotateZ(${360 / quantidade *vazio}deg)`;

    

}
