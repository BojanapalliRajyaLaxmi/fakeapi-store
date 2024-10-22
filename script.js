let input=document.getElementById("search");
let output=document.getElementById("output");
let cont=document.getElementById("con")
async function manipulation() {
    let response=await fetch("https://fakestoreapi.com/products");
    let data=await response.json();
    localStorage.setItem("products",JSON.stringify(data))
    printData(data);
}
function printData(data) {
    output.innerHTML = ''; 
    data.forEach((ele, index) => {
        let container = document.createElement("div");
        container.id = "container";
        output.appendChild(container);
        
        let p = document.createElement("p");
        container.appendChild(p);
        p.innerHTML = `
        <p><b>ID:</b>${ele.id}</p>
        <p><b>DESCRIPTION: </b>${ele.description}</p>
        <p><b>CATEGORY:  </b>${ele.category}</p>
        <p><b>TITLE:  </b>${ele.title}</p>
        `;
        let btn = document.createElement("button");
        btn.textContent = "Remove";
        container.appendChild(btn);
        btn.onclick = () => {
            delData(index);
        };
    });
}
function delData(index) {
    let del = JSON.parse(localStorage.getItem("products"));
    del.splice(index, 1);  
    localStorage.setItem("products", JSON.stringify(del));  
    printData(del); 
}
function res() {
    output.innerText = ""; 
    let fil = JSON.parse(localStorage.getItem("products"));
    let propertyToFilter = window.prompt("ENTER WHAT YOU WANT TO FILTER: category, description, title, price");
    let name = input.value.toLowerCase();
    let filldata = fil.filter(obj => {
        if (obj.hasOwnProperty(propertyToFilter)) {
            return obj[propertyToFilter].toString().toLowerCase().startsWith(name);
        }
        return false;
    });
    if (filldata.length > 0) {
        printData(filldata);
    } else {
        output.innerText = "No data found";
    }
}
function delData(index){
    let del=JSON.parse(localStorage.getItem("products"));
    del.splice(index,1);
    localStorage.setItem("products",JSON.stringify(del));
    printData(del);
}
// window.onload = () => {
//     let data = JSON.parse(localStorage.getItem("products")) || [];
//     if (data.length > 0) {
//         printData(data);
//     } else {
//         output.innerHTML = "No Data Available";
//     }
// }

