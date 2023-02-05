class Table {
    constructor(database) {
        this.database = database;
    }

    theHeader(dataHead) {
        let open = "<thead><tr>";
        let close = "</tr></thead>";
        dataHead.forEach(element => {
            if (element !== dataHead[5] && element !== dataHead[6]) {
                open += `<th>${element}</th>`
            }
        });
        return open + close;
    }

    theBody(dataBody) {
        let open = "<tbody>";
        let close = "</tbody>";
        dataBody.forEach(element => {
            open += `
                <tr>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                </tr>`;
        })
        return open + close;
    }
    render() {
        let body = [];
        for (let value of this.database) {
            let temp;
            temp = (Object.values(value).slice(0, 4));
            temp.push(Object.values(value.address).slice(0, 3).join(", "));
            temp.push(value.company.name);
            body.push(temp);
        }
        let table = "<table class = 'container table table-hover border text-center'>" + this.theHeader(Object.keys(this.database[0])) +
            this.theBody(body) + "</table>";
        document.getElementById("app").innerHTML = table;
    }
}

function loadDoc(url, cb) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.status == 200) {
            const myObj = JSON.parse(this.responseText);
            return cb(myObj)
        } else {
            const x = document.getElementById("app")
            x.innerHTML = "Data tidak ditemukan";
            x.classList.add('text-center', 'h4', 'text-secondary')
        }
    };
    xhttp.open("GET", url);
    xhttp.send();
}
const loadData = loadDoc("https://jsonplaceholder.typicode.com/users", function (loadData) {
    const table = new Table(loadData);
    table.render();
})


