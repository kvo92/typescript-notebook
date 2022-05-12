export function createResultContainer(name="result-container"){
    var container = document.createElement("article");
    var results = document.createElement("article");
    var h1 = document.createElement("h1");
    h1.textContent = "Test:";
    container.id = name;
    results.id = "results";
    container.classList.add("result-container");
    container.appendChild(h1);
    container.appendChild(results);
    document.querySelector('body').appendChild(container);
}

export function assert(value, desc, name="result-container"){
    var li =  document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    var ele = document.getElementById(name)
    ele.querySelector("#results").appendChild(li);
}

export function report(desc, name="result-container"){
    var li =  document.createElement("li");
    li.appendChild(document.createTextNode(desc));
    var ele = document.getElementById(name)
    ele.querySelector("#results").appendChild(li);
}

export function stylingResults(){
    styleDiv();
    const passes = document.querySelectorAll(".pass")
    const fail = document.querySelectorAll(".fail")
    if (passes){
        for (var i = 0; i < passes.length; ++i) {
            passes[i].style.color = "#008000";
        }
    }
    if (fail){
        for (var i = 0; i < fail.length; ++i) {
            fail[i].style.color = "#ff0000";
            fail[i].style.textDecoration = "line-through";
        }
    }
}

export function pass(text) { assert(true, text); }
export function fail(text) { assert(false, text); }

function styleDiv(){
    const containers = document.querySelectorAll(".result-container");
    containers.forEach(element => {
        element.style.border = "solid";
        element.style.margin = "15px";
        const results = element.querySelector("#results");
        results.style.margin = "15px";
    })

}
