let liDom = ""
const alertDOM = document.querySelector("#alert")
let taskList = document.getElementById("taskList")
task.addEventListener("focus", alertClose)


function newElement() {
  let task = document.getElementById("task").value
  if (task) {
    liDom += `
    <li onClick="clickCheck(this)" id="taskList"   class="alert alert-light " role="alert"> &nbsp&nbsp&nbsp  ${task}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></li>`
    alertMesaj(task)
    document.getElementById("task").value = ""
  }
  else {

    alertMesaj(task)
  }
  document.getElementById("list").innerHTML = liDom

}

function alertMesaj(message) {
  let endMessage = message
  if (endMessage) {  

    endMessage = "Listeye eklendi."
    setTimeout(function () {
      alertClose(message)
    }, 2000); 

  } else {    

    endMessage = "Listeye boş ekleme yapamazsınız!"
  }
  alertDOM.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert" id="allertMessage">
        <strong>${endMessage}</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span> </button>  </div>`
}

function alertClose(message) {
  const allertMessage = document.getElementById("allertMessage");
  if ((message)) {
    $(allertMessage).alert('close')
    alertDOM.innerHTML = ""
  }

}



function clickCheck(myli) {
  if (myli.classList.contains("checked")) {
    myli.classList.remove("checked")
  } else {
    myli.classList.add("checked")
  }

}















