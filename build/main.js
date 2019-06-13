"use strict";
//reset the input fields on submission of form
var resetInputFields = function () {
    document.querySelectorAll("input").forEach(function (element) {
        element.value = "";
    });
};
//prevent page from reloading on each submission of user data, invoke previous function to collect data
document.getElementById("post").addEventListener("click", function (e) {
    e.preventDefault();
    gatherContent(myImage);
    resetInputFields();
});
var publishContent = function () {
    var node = document.createElement("div");
    node.className = ("blogPost");
    newContent.map(function (element) { return (document.querySelector(".userOutput").appendChild(node).innerHTML =
        "<h1>" + element.title + "</h1>\n        <p>" + element.desc + "</p>"); });
    for (var i = 0; i < document.querySelectorAll(".blogPost").length; i++) {
        var parent_1 = document.querySelectorAll(".blogPost");
        parent_1[i].insertBefore(newContent[i].image, parent_1[i].childNodes[0]);
    }
};
var userContent = /** @class */ (function () {
    function userContent(title, desc, image) {
        this.title = title;
        this.desc = desc;
        this.image = image;
    }
    return userContent;
}());
var newContent = [];
//listen for event on file input type then inject image into relevent section
var myImage;
var input = document.querySelectorAll("input[type='file']")[0];
input.addEventListener("change", function (e) {
    var reader = new FileReader();
    reader.onload = function () {
        var img = new Image();
        img.src = reader.result;
        // const target = document.getElementsByClassName("userOutput")[0];
        // target.insertBefore(img, target.childNodes[0]);
        myImage = img;
    };
    reader.readAsDataURL(input.files[0]);
});
//retrieve data inputted by user and insert into an array
var gatherContent = function (myImage) {
    if (myImage === void 0) { myImage = myImage; }
    var uploadedTitle = document.querySelector("#title").value;
    var uploadedDesc = document.querySelector("#desc").value;
    var upload = new userContent(uploadedTitle, uploadedDesc, myImage);
    newContent.push(upload);
    publishContent();
    console.log(newContent);
};
//filter content with searchbar value
var banner = document.getElementById("bannerContainer");
var featuredItems = document.getElementById("featuredItemsContainer");
var featuredItemsDiv = document.querySelectorAll(".featuredItem");
var ranges = document.getElementById("rangesContainer");
var rangesItem = document.querySelectorAll("rangesItem");
var userContainer = document.getElementById("userContainer");
var globalSearchBlock = function (searchTarget) {
    var searchBarInput = document.getElementsByClassName("form-control")[0];
    searchBarInput.addEventListener("keyup", function (e) {
        var userInput = e.target.value.toLowerCase();
        if (searchTarget.textContent.toLowerCase().indexOf(userInput) != -1) {
            searchTarget.style.display = "block";
        }
        else if (userInput == "") {
            searchTarget.style.display = "block";
        }
        else {
            searchTarget.style.display = "none";
        }
    });
};
var globalSearchFlex = function (searchTarget) {
    var searchBarInput = document.getElementsByClassName("form-control")[0];
    searchBarInput.addEventListener("keyup", function (e) {
        var userInput = e.target.value.toLowerCase();
        if (searchTarget.textContent.toLowerCase().indexOf(userInput) != -1) {
            searchTarget.style.display = "flex";
        }
        else if (userInput == "") {
            searchTarget.style.display = "flex";
        }
        else {
            searchTarget.style.display = "none";
        }
    });
};
var globalSearchClasses = function (searchTarget) {
    var searchBarInput = document.getElementsByClassName("form-control")[0];
    searchBarInput.addEventListener("keyup", function (e) {
        var userInput = e.target.value.toLowerCase();
        searchTarget.filter(function (element) {
            if (element.textContent.toLowerCase().indexOf(userInput) != -1) {
                element.style.opacity = "1";
            }
            else if (userInput == "") {
                element.style.opacity = "1";
            }
            else {
                element.classList.toggle("toggleDisplay");
            }
        });
    });
};
window.onload = function () {
    globalSearchBlock(banner);
    globalSearchFlex(featuredItems);
    globalSearchFlex(ranges);
    // globalSearchClasses(featuredItemsDiv);
    globalSearchFlex(userContainer);
};
var APIkey = "376269d9f7e94faba6b258c8521c87c2";
var itemOutput = document.querySelector(".productContainer");
fetch("https://newsapi.org/v2/top-headlines?country=gb&apiKey=" + APIkey)
    .then(function (res) { return res.json(); })
    .then(function (data) { return data.articles.filter(function (element, index) {
    if (index <= 3) {
        document.getElementsByClassName("productContainer")[0].innerHTML +=
            "<div class=\"featuredItem\">\n        <div class=\"featuredItemImg\">\n        <img src=\"" + element.urlToImage + "\"/>\n        </div>\n        <div id=\"starRating\">\n        <i class=\"fas fa-star\"></i>\n        <i class=\"fas fa-star\"></i>\n        <i class=\"fas fa-star\"></i>\n        <i class=\"fas fa-star\"></i>\n        <i class=\"fas fa-star\"></i>\n        </div>\n        <h1>" + element.title + "</h1>\n        <p>" + (element.description ? element.description : "No description available") + "</p>\n        </div>";
        document.getElementsByClassName("linksContainer")[0].innerHTML +=
            "<li><a href=\"" + element.url + "\"target=\"_blank\">" + (element.author ? element.author : "NA") + "</a></li>";
    }
    else if (index > 3 && index <= 6) {
        document.getElementsByClassName("rangesItemContainer")[0].innerHTML +=
            "<div class=\"rangesItem\">\n        <img src=\"" + element.urlToImage + "\"/>\n        </div>";
    }
    // else if (index>3) {
    //     document.getElementsByClassName("linksContainer")[0].innerHTML +=
    //     `<li><a href="${element.url}"target="_blank">${element.author}</a></li>`
    // }
}); });
//# sourceMappingURL=main.js.map