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
        for (let x = 1; x <= 12; x++) {
            let equipe = { lineID: `line${x}`, name: `Line ${x}`, pontos: 0, abates: 0, booyah: 0, id: x };
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
    let tbl = JSON.parse(localStorage.getItem('TblEqp'));
    let main = document.getElementById('main');
    main.innerText = '';
    let table = document.createElement('table');
    let count = 1;
    tbl.forEach(line => {
        let tr = document.createElement('tr');
        if (count == 1) {
            let trtitle = document.createElement('tr');
            let trinfo = document.createElement('tr');
            let title = document.createElement('td');
            for (let x = 1; x <= 5; x++) {
                let tdinfo = document.createElement('td');
                tdinfo.innerText = x == 1 ? 'Rank' : x == 2 ? 'Equipes' : x == 3 ? 'Pontos' : x == 4 ? 'Kills' : 'Total';
                trinfo.append(tdinfo);
            }
            title.setAttribute('colspan', 5)
            title.innerText = 'Tabela de Pontos';
            trtitle.append(title)
            table.append(trtitle, trinfo)
        }
        for (let x = 1; x <= 5; x++) {
            let td = document.createElement('td');
            td.innerText = x == 1 ? line.id : x == 2 ? line.name : x == 3 ? line.pontos : x == 4 ? line.abates : (parseInt(line.abates) + parseInt(line.pontos));
            tr.append(td)
            table.append(tr)
        }
        count++;
    })
    main.append(table)
}
function historico() {
    console.log('FUNCAO DE EXIBICAO DE HISTORICO');
    let main = document.getElementById('main');
    main.innerText = '';
    if (!localStorage.getItem('historico')) {
        let his = [];
        localStorage.setItem('historico', JSON.stringify(his));
    }
    else {
        let historico = JSON.parse(localStorage.getItem('historico'));
        if (historico.length == 0) {
            let h3 = document.createElement('h3');
            h3.innerHTML = 'Sem historico disponíveis para visualização!'
            main.append(h3)
        }
    }
}

function tagLine(line) {
    let MainBody = document.getElementById('main');
    let table = document.createElement('table');
    table.id = line.lineID;
    table.addEventListener('click', ()=>{ linepopup(line.lineID) })
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
function linepopup(id) {
    let main = document.getElementById('main');
    console.log(id);
    let divpop = document.createElement('div');
    divpop.innerText = 'teste';
    divpop.classList = 'popupline';
    main.append(divpop);
    
}