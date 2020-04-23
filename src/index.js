let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  fetchToys();
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  toyForm.addEventListener("submit", handleForm)
});

function handleForm(event) {
  const obj = {
    name: document.querySelector("#input-name").value,
    image: document.querySelector("#input-img").value
  }
  event.preventDefault()

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(obj)
  })
    .then(resp => resp.json())
    .then(data => renderToys(data))
}

function fetchToys(){
  fetch("http://localhost:3000/toys") 
  .then(resp => resp.json())
  .then(toysArr => {
    toysArr.forEach(toy => renderToys(toy)) })
}

function renderToys(data){
  let div = document.getElementById("toy-collection")
  var toyDiv = document.createElement("div")
  toyDiv.classList.add("card")
  div.appendChild(toyDiv)

  let h2 = document.createElement("h2")
  h2.innerHTML = data.name

  let img = document.createElement("img")
  img.classList.add("toy-avatar")
  img.src = data.image

  let p = document.createElement("p")
  p.innerHTML = data.likes

  let button = document.createElement("button")
  button.classList.add("like-btn")
  button.innerText = "Like"

  toyDiv.append(h2, img, p, button)
}
// <!-- <h2>
// <img src="" alt="">
// </h2>
// <p></p>
// button  -->