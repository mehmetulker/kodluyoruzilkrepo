let fullName = prompt("Lutfen Adinizi Giriniz: ")

let myName = document.querySelector("#myName")

myName.innerHTML = `${myName.innerHTML} ${fullName}</small>`