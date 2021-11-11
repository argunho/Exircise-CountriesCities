"use strict";

var loc = localStorage;
const countries_link = "https://raw.githubusercontent.com/argunho/Exircise-CountriesCities/main/json/land.json";
const cities_link = "https://raw.githubusercontent.com/argunho/Exircise-CountriesCities/main/json/stad.json";

var countries, cities = [];
var visited_list = [];
var reset_btn = document.getElementById("reset")
var view = document.getElementById("view");
var content = document.getElementById("content");

document.body.style = "background:url('./images/mapp.jpg');" +
    "background-position:center;" +
    "background-size:cover;" +
    "background-repeat:no-repeat;";

fetch(countries_link).then(function (res) {
    return res.json();
}).then(function (list) {
    countries = JSON.parse(JSON.stringify(list));

    // Run set countries function
    setCountriesMenu();
})

// Set countries list with restart of page
function setCountriesMenu() {
    if (loc.getItem("current") != null)
        loc.removeItem("current");
    if (JSON.parse(loc.getItem("visited_list")) != null) {
        reset_btn.classList.add("visible-reset");
    };

    checkMenuList()
}

// Check menu list
function checkMenuList() {
    let visited_cities = JSON.parse(loc.getItem("visited_list"));
    let menu = document.getElementById("menu");
    menu.innerHTML = "";
    if (countries.length > 3)
        countries.splice(3, 1);

    if (visited_cities != null) {
        let obj = {
            "id": 4,
            "name": "Städer jag besökt"
        }
        countries.push(obj)
    }

    for (let i in countries) {
        let c = countries[i];
        let name = (c.id < 4) ? c.countryname : c.name;
        let _name = (c.id < 4) ? c.countryname : "visited";
        menu.insertAdjacentHTML("beforeend", "<div class='menu-link'><p class='p-link' name='" + _name.toLowerCase() + "' onclick='getCities(this)' id='list_" + c.id + "'>" +
            name + "</p><ul class='menu-list' id='menu_list_" + c.id + "'></ul></div>");
    }
}

// Get sub menu(cities list)
function getCities(ev) {
    let id = ev.attributes.id.value;
    let name = ev.attributes.name.value;

    reset(true);
    if (loc.getItem("current") == name) {
        loc.removeItem("current");
    } else {
        loc.setItem("current", name);

        loc.setItem(name, id);

        id = parseInt(id.replace("list_", ""));
        ev.classList.add("selected-" + name);

        let ul = document.getElementById("menu_list_" + id);
        ul.classList.add('visible-menu-list', 'ul_' + name);

        fetch(cities_link).then(function (res) {
            return res.json();
        }).then(function (list) {
            cities = JSON.parse(JSON.stringify(list));

            let cities_list = (id < 4) ? cities.filter(x => x.countryid == id) : JSON.parse(loc.getItem("visited_list"));
            for (let i in cities_list) {
                let c = cities_list[i];
                ul.insertAdjacentHTML("beforeend", "<li class='link' onclick='getCityInfo(this)' name='" + c.stadname.toLowerCase() + "' id='link_" + c.id + "'>" + c.stadname + "</li>");
            }
            if (id == 4) {
                ul.insertAdjacentHTML("beforeend", "<li class='link' onclick='getPopulations()' name='population' id='link_population'>Antal invånare i besökta länder</li>");
            }
        })

    }
}

// Get city info
function getCityInfo(ev) {
    let id = ev.attributes.id.value;
    let name = ev.attributes.name.value;
    reset();
    if (loc.getItem(name) == null)
        loc.setItem(name, id);

    content.classList.remove("none");
    let city = cities.find(x => x.id == parseInt(id.replace("link_", '')));

    view.style.background = "url('" + city.img + "') #FFF";
    content.insertAdjacentHTML("beforeend", "<p class='city-name'>" + city.stadname + "</p>");
    content.insertAdjacentHTML("beforeend", "<p class='city-population'>Invånare: " + city.population + "</p>");
    content.insertAdjacentHTML("beforeend", "<button class='make-visited' type='button' title='Besökt' onclick='setVisitedList(" + city.id + ")' id='visited_btn'>🏴</button>");

    setVisitedList(city.id, true);
    setTimeout(function () {
        setOpacity();
    }, 300)
}

// Set and save visited list
function setVisitedList(id, check = false) {
    visited_list = JSON.parse(loc.getItem("visited_list")) || [];
    let visited = false;
    if (visited_list.length > 0)
        visited = visited_list.find(x => x.id == id) != null;

    let city = cities.find(x => x.id == id);
    let btn = document.getElementById("visited_btn");

    if (!check) {
        if (!visited) {
            btn.classList.add("visited-btn");
            btn.innerHTML = '🏁';
            visited_list.push(city);
        } else {
            btn.classList.remove("visited-btn");
            btn.innerHTML = '🏴';
            for (let i in visited_list) {
                if (city.id == visited_list[i].id)
                    visited_list.splice(i, 1);
            }
        }
    } else if (visited) {
        btn.classList.add("visited-btn");
        btn.innerHTML = '🏁';
    }
    if (visited_list.length > 0) {
        loc.setItem("visited_list", JSON.stringify(visited_list));
        reset_btn.classList.add("visible-reset");
    } else {
        reset_btn.classList.remove("visible-reset");
        loc.removeItem("visited_list");
    }

    checkMenuList();
}

// Get population of visted cities
function getPopulations() {
    reset();
    let population = 0;
    let list = JSON.parse(loc.getItem("visited_list"))
    for (let i in list) {
        population += list[i].population;
    }
    view.style.background = "#FFF";
    setOpacity();
    content.classList.add("none");
    view.insertAdjacentHTML("beforeend", "<div class='populations-count' id='population'>" + population + "</div>")
}

// Reset menu
function reset(reset = false) {
    document.querySelectorAll("ul").forEach(function (a, b) {
        a.classList.remove('visible-menu-list');
        a.innerHTML = "";
    });
    document.querySelectorAll("#content>p").forEach(function (a, b) {
        a.innerHTML = "";
    })
    document.querySelectorAll("#content>button").forEach(function (a, b) {
        a.remove();
    })
    if (reset) {
        document.querySelectorAll("p.p-link").forEach(function (a, b) {
            a.classList.remove("selected-" + a.attributes.name.value);
        })
    }

    let view = document.getElementById("view");
    view.removeAttribute("style");
    view.classList.remove("visible-view");

    let population = document.getElementById('population');
    if (population != undefined)
        population.parentNode.removeChild(population);
}

// Clear history
function clearHistory() {
    reset();
    loc.clear();
    checkMenuList();
    reset_btn.classList.remove("visible-reset");
}

// Help function
function setOpacity() {
    let scale = 0.1;
    let opacity = setInterval(function () {
        if (scale > 1)
            clearInterval(opacity);
        else {
            view.classList.add("visible-view")
            view.style.opacity = scale;
        }
        scale += 0.1;
    }, 100);
}