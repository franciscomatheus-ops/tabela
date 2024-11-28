document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('FirstLogin') == 'false') {
        localStorage.setItem('FirstLogin', 'true');
    }
    localStorage.setItem('Menu', !localStorage.getItem('Menu') ? 'eqp' : localStorage.getItem('Menu'));
    Menu(localStorage.getItem('Menu'));
})

function Menu(info) {
    let menu = ['eqp', 'tbl', 'his'];
    menu.forEach(opc => {
        if (info == opc) {
            document.getElementById(opc).classList.add('ativ');
            localStorage.setItem('Menu', opc);
        }
        else {
            document.getElementById(opc).classList.remove('ativ');
        }
    })

    info == 'eqp' ? eqp() : info == 'tbl' ? tblGeral() : historico();

}

function eqp() {
    console.log('FUNCAO DE EXIBICAO DE EQUIPES');
      
    if (!localStorage.getItem('TblEqp')) {
        let Equipes = [];
        for (let x = 1; x <= 12; x++){
            let equipe = {lineID:`line${x}`, name:`Line ${x}`, pontos:0, abates:0, booyah:0, id:x};
            Equipes.push(equipe);
        }
        localStorage.setItem('TblEqp', JSON.stringify(Equipes));
    }
    let equipes_array = JSON.parse(localStorage.getItem('TblEqp'));
    console.log(equipes_array);
    document.getElementById('main').innerText = '';
    equipes_array.forEach(line => {
        tagLine(line);
    })

}
function tblGeral() {
    console.log('FUNCAO DE EXIBICAO ED TABELA');
}
function historico() {
    console.log('FUNCAO DE EXIBICAO DE HISTORICO');
}

function tagLine(line) {
    let MainBody = document.getElementById('main');
    let table = document.createElement('table');
    table.id = line.lineID;
    table.setAttribute('onclick', `editEqp(${line.lineID})`)
    for (let x = 1; x <= 5; x++) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        if (x == 1) {
            td1.innerText = line.name;
            td1.setAttribute('colspan', 2)
            tr.append(td1);
        }
        else {
            td1.innerText = x == 2 ? 'Pontuação - ' : x == 3 ? 'Abates - ' : x == 4 ? 'Booyah! - ' : 'Colocação - ';
            td2.innerText = x == 2 ? line.pontos : x == 3 ? line.abates : x == 4 ? line.booyah : `${line.id}º`;
            tr.append(td1, td2);
        }
        table.append(tr);
    }
    MainBody.append(table)

}

function editEqp(line) {
    let tabela = JSON.parse(localStorage.getItem('TblEqp'));
    tabela.forEach(l => {
        if (l.lineID == line.id) {
            console.log(l);
        }
        
    });
}