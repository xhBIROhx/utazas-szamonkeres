import './style.css'

interface Utazas {
  title: string;
  content: string;
  img: string;
}

const cards = document.querySelector("#cards");
const form = document.querySelector("form");
const export_text = document.querySelector("#export");

let res = await fetch("https://petrik-utazas-default-rtdb.europe-west1.firebasedatabase.app/travelDestinations.json")
let utazasok = await res.json() as Array<Utazas>;
//console.log(data)

async function render() {
  cards?.setHTMLUnsafe("");
  utazasok.forEach(element=> {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const img = document.createElement("img");
    img.src = element.img;
    const title = document.createElement("h2");
    title.textContent = element.title;
    const desc = document.createElement("p");
    desc.textContent = element.content;
    
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
  
    cards?.appendChild(card);
  });
}

form?.addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form)) as unknown as Utazas;
  utazasok.push(data)
  render()
  form.reset()  
})

document.querySelector("#export-button")?.addEventListener("click", () => {
  if (export_text) export_text.textContent = JSON.stringify(utazasok);
})

render()