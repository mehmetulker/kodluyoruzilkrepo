const ALERT = `<div class="alert alert-warning alert-dismissible fade show" role="alert" id="allertMessage">
<strong>Lütfen  yapılacak işi ve görevi  ekleyiniz!</strong> 
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
<span aria-hidden="true">&times;</span> </button>  </div>`
const alertDOM = document.querySelector("#alert")

let data = []
let taskValue = document.getElementById("task")
taskValue.addEventListener("focus", alertClose)



const startConf = () => {
    // Başlangıc degerlerin tanımlıyoruz. 
    const todoskodluyoruz = JSON.parse(localStorage.getItem("todoskodluyoruz"));
    if (!todoskodluyoruz) {
        localStorage.setItem("todoskodluyoruz", JSON.stringify(data));
    } else {
        data = JSON.parse(localStorage.getItem("todoskodluyoruz"));
        showData(data);
    }
}
// Başlangıc degerlerin yüklüyoruz.
startConf();

// İşlem sonrası localStroge önce yazıyor ve sonra okuyup gösteriyoruz.
function refresh(data) {
    localStorage.setItem("todoskodluyoruz", JSON.stringify(data));
    data = JSON.parse(localStorage.getItem("todoskodluyoruz"));
    showData(data);
}

// Alert acıldıktan sonra input içine veri girişi yapıldığında otamatik kaldırıyoruz.
function alertClose() {
    const alert = document.getElementById("allertMessage");
    if ((alertDOM.innerHTML)) {
        $(allertMessage).alert('close')
        alertDOM.innerHTML = ""
    }

}

//Yeni görev ekleme
function addTask() {

    let taskValue = document.getElementById("task").value
    if (taskValue) {
        let task = {
            task: taskValue,
            statu: "to-do"
        }
        data.push(task);
        console.log(task)
        document.getElementById("task").value = null
        refresh(data)
    }
    else {
        alertDOM.innerHTML = ALERT
    }

}

function showData(data) {
    let htmlToDo = ""
    let htmlCopleted = ""

    for (let index = 0; index < data.length; index++) {
        if (data[index].statu == "to-do") {
            htmlToDo += `
        <div class="input-group mb-3">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" onClick="clickCheck(${index})">
            </div>
        </div>
        <p type="text" class="form-control" aria-label="Text input with checkbox">${data[index].task}</p>
        <div class="input-group-append">
            <button  class="btn btn-outline-primary" type="button" onClick="updateData(${index})" > <i class="fas fa-edit"></i></button>	
            <button  class="btn btn-outline-danger" type="button" onClick="deleteData(${index})" ><i class="fas fa-trash-alt"></i></button>									
        </div>
         </div>
        `

        } else {
            htmlCopleted += `
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" checked aria-label="Checkbox for following text input" onClick="undoData(${index} )">
                </div>
            </div>
            <p type="text" class="form-control" aria-label="Text input with checkbox" style="text-decoration:line-through;">${data[index].task}</p>    
            <div class="input-group-append">
                <button  class="btn btn-outline-primary" type="button" onClick="undoData(${index})"><i class="fas fa-undo"></i></button>
                <button  class="btn btn-outline-danger" type="button" onClick="deleteData(${index})" ><i class="fas fa-trash-alt"></i></button>								
            </div>
             </div>
            `
        }
    }

    document.getElementById("to-do").innerHTML = htmlToDo
    document.getElementById("completed").innerHTML = htmlCopleted

}


function clickCheck(index) {
    data[index].statu = "complate"
    refresh(data)
}

function undoData(index) {
    data[index].statu = "to-do"
    refresh(data)

}
function deleteData(index) {
    data.splice(index, 1)
    refresh(data)
}

function saveData(index) {
    data[index].task = document.getElementById("saveData").value
    refresh(data)
}

function updateData(id) {
    data = JSON.parse(localStorage.getItem("todoskodluyoruz"));
    refresh(data)

    let htmlToDo = ""
    let htmlCopleted = ""

    for (let index = 0; index < data.length; index++) {
        if (index == id && data[index].statu == "to-do") {
            htmlToDo += `
        <div class="input-group mb-3">
        <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" aria-label="Checkbox for following text input" onClick="clickCheck(${index})">
            </div>
        </div>
        <input id="saveData" style="background-color:#f78501; font-weight: bold;" type="text" class="form-control" aria-label="Text input with checkbox" value="${data[index].task}"></input>       

        <div class="input-group-append">
            <button  class="btn btn-outline-primary"  id="saveData" type="button" onClick="saveData(${index})"><i class="fas fa-save"></i></button>
           
            <button  class="btn btn-outline-danger" type="button" onClick="deleteData(${index})" ><i class="fas fa-trash-alt"></i></button>									
        </div>
         </div>
        `


        } else if (data[index].statu == "to-do") {

            htmlToDo += `
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <input type="checkbox" aria-label="Checkbox for following text input" onClick="clickCheck(${index})">
                </div>
            </div>

            <p type="text" class="form-control" aria-label="Text input with checkbox" >${data[index].task}</p>
                    
            <div class="input-group-append">
                <button  class="btn btn-outline-primary" type="button" onClick="updateData(${index})"><i class="fas fa-edit"></i></button>
                <button  class="btn btn-outline-danger" type="button" onClick="deleteData(${index})" ><i class="fas fa-trash-alt"></i></button>									
            </div>
             </div>`


        } else {
            htmlCopleted += `
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <div class="input-group-text">
                <input type="checkbox" checked aria-label="Checkbox for following text input" onClick="undoData(${index} )">
                </div>
            </div>
            <p type="text" class="form-control" aria-label="Text input with checkbox">${data[index].task}</p>
    
            <div class="input-group-append">
                <button  class="btn btn-outline-primary" type="button" onClick="undoData(${index})"><i class="fas fa-undo"></i></button>
                <button  class="btn btn-outline-danger" type="button" onClick="deleteData(${index})" ><i class="fas fa-trash-alt"></i></button>								
            </div>
             </div>
            `
        }
    }

    document.getElementById("to-do").innerHTML = htmlToDo
    document.getElementById("completed").innerHTML = htmlCopleted

}


