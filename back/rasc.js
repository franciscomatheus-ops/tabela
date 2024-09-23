
let tbls = 5;

document.addEventListener('DOMContentLoaded', function () {

    for (let x = 1; x <= tbls; x++) {
        let quedas = {};
        const tr = document.createElement('tr');
        tr.id = `linha${x}`;
        for (let y = 1; y <= 4; y++) {
            const td = document.createElement('td');
            const ip = document.createElement('input');
            switch (y) {
                case 1:
                    td.textContent = `#${x}`;
                    break;
                case 2:
                case 3:
                    td.appendChild(ip);
                    ip.setAttribute('type', 'number');
                    ip.id = (y == 2) ? `que${x}` : `abt${x}`;
                    ip.setAttribute('oninput', (y == 2) ?
                        `ValidarValue(this.value, abt${x}.value, res${x})` :
                        `ValidarValue(que${x}.value, this.value, res${x})`)
                    break;
                case 4:
                    td.textContent = 0;
                    td.id = `res${x}`;
            }
            tr.appendChild(td);
        }
        document.getElementById('tbl').appendChild(tr);
    }
})


function TrAddRemov(btn) {
    if (btn == 'rem' && tbls>1) {
        document.getElementById(`linha${tbls}`).remove();
        tbls--;
    } else if (btn == 'add') {
        tbls++;
        const tr = document.createElement('tr');
        tr.id = `linha${tbls}`;
        for (let x = 1; x <= 4; x++) {
            const td = document.createElement('td');
            const ip = document.createElement('input');
            switch (x) {
                case 1:
                    td.textContent = `#${tbls}`;
                    break;
                case 2:
                case 3:
                    td.appendChild(ip);
                    ip.setAttribute('type', 'number');
                    if (x == 2) {
                        ip.setAttribute('oninput', `ValidarValue(this.value, abt${tbls}.value, res${tbls})`);
                    } else {
                        ip.setAttribute('oninput', `ValidarValue(que${tbls}.value, this.value, res${tbls})`)
                    }
                    ip.id = (x == 2) ? `que${tbls}` : `abt${tbls}`;
                    break;
                case 4:
                    td.textContent = 0;
                    td.id = `res${tbls}`;
            }
            tr.appendChild(td);
            document.getElementById('tbl').appendChild(tr);
        }
    }
    Res();
}

function ValidarValue(q, a, p) {
    const quedas = (q > 0) ? parseInt(q) : 0;
    const abates = (a > 0) ? parseInt(a) : 0;
    p.textContent = (quedas == 1) ? 12 + abates : abates;
    if (quedas == 1) {
        p.textContent = 12 + abates;
    } else if(quedas >= 2 && quedas <= 10){
        p.textContent = (11 - quedas) + abates;
    }
    else if (quedas == 11 && quedas == 12 && quedas == 0) {
        p.textContent = abates;
    }
    else if (quedas > 12) {
        return 0;
    }
    Res();
}

function Res() {
    let soma = 0;
    for (let x = 1; x <= tbls; x++) {
        let res = parseInt(document.getElementById(`res${x}`).textContent);
        soma += res;
    }
    document.getElementById('res').textContent = soma;
}