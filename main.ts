//reset the input fields on submission of form

const resetInputFields = () => {
    document.querySelectorAll("input").forEach(element => {
        element.value = "";
    })
}

//prevent page from reloading on each submission of user data, invoke previous function to collect data

document.getElementById("post").addEventListener("click", function(e) {

    e.preventDefault();
    gatherContent(myImage);
    resetInputFields();

});

const publishContent = () => {

    const node = document.createElement("div");
    node.className=("blogPost");

    newContent.map((element)=> (
        document.querySelector(".userOutput").appendChild(node).innerHTML=
        `<h1>${element.title}</h1>
        <p>${element.desc}</p>`
    ));
    for(let i = 0; i<document.querySelectorAll(".blogPost").length;i++) {
        const parent = document.querySelectorAll(".blogPost");
        parent[i].insertBefore(newContent[i].image,parent[i].childNodes[0]);
    }
}

class userContent {
    title:string;
    desc:string;
    image:HTMLImageElement;

    constructor(title:string, desc:string,image:HTMLImageElement) {
        this.title=title;
        this.desc=desc;
        this.image=image;
    }
}

let newContent:userContent[] = [];

//listen for event on file input type then inject image into relevent section

let myImage:HTMLImageElement;

    const input = document.querySelectorAll("input[type='file']")[0];
    input.addEventListener("change", function(e) {
        const reader = new FileReader();
    
        reader.onload = function() {
                const img = new Image();
                img.src = reader.result;
                // const target = document.getElementsByClassName("userOutput")[0];
                // target.insertBefore(img, target.childNodes[0]);
                myImage=img;
        }
    
        reader.readAsDataURL(input.files[0]);
    
    });

//retrieve data inputted by user and insert into an array

const gatherContent = (myImage:HTMLImageElement=myImage) => {

    let uploadedTitle = document.querySelector("#title").value;
    let uploadedDesc = document.querySelector("#desc").value;

    let upload = new userContent(uploadedTitle,uploadedDesc,myImage);
    newContent.push(upload);
    publishContent();
    console.log(newContent);

};


//filter content with searchbar value

const banner = document.getElementById("bannerContainer");
const featuredItems=document.getElementById("featuredItemsContainer");
const featuredItemsDiv = document.querySelectorAll(".featuredItem");
const ranges = document.getElementById("rangesContainer");
const rangesItem = document.querySelectorAll("rangesItem");
const userContainer = document.getElementById("userContainer");

const globalSearchBlock = (searchTarget) => {

    let searchBarInput = document.getElementsByClassName("form-control")[0];

    searchBarInput.addEventListener("keyup", function(e) {
        const userInput = e.target.value.toLowerCase();
    
        if(searchTarget.textContent.toLowerCase().indexOf(userInput)!= -1) {
            searchTarget.style.display="block";
        }
        else if(userInput =="") {
            searchTarget.style.display="block";
        }
        else {
            searchTarget.style.display="none";
        }
    
    })
};

const globalSearchFlex = (searchTarget) => {

    let searchBarInput = document.getElementsByClassName("form-control")[0];

    searchBarInput.addEventListener("keyup", function(e) {
        const userInput = e.target.value.toLowerCase();
    
        if(searchTarget.textContent.toLowerCase().indexOf(userInput)!= -1) {
            searchTarget.style.display="flex";
        }
        else if(userInput =="") {
            searchTarget.style.display="flex";
        }
        else {
            searchTarget.style.display="none";
        }
    
    })
};

const globalSearchClasses = (searchTarget) => {

    let searchBarInput = document.getElementsByClassName("form-control")[0];

    searchBarInput.addEventListener("keyup", function(e) {
        const userInput = e.target.value.toLowerCase();

        searchTarget.filter(element => {
            if(element.textContent.toLowerCase().indexOf(userInput)!= -1) {
                element.style.opacity="1";
            }
            else if(userInput =="") {
                element.style.opacity="1";
            }
            else {
                element.classList.toggle("toggleDisplay");
            }
        })
    
    })
};

window.onload = function() {

    globalSearchBlock(banner);
    globalSearchFlex(featuredItems);
    globalSearchFlex(ranges);
    // globalSearchClasses(featuredItemsDiv);
    globalSearchFlex(userContainer);

}

//News API

interface IItems {
    status:string;
    totalResults:number;
    articles:IArticles[];
}

interface IArticles {
    source:ISource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    }

interface ISource {
    id: string;
    name: string;
}

var APIkey:string = "376269d9f7e94faba6b258c8521c87c2";
const itemOutput = document.querySelector(".productContainer");

fetch("https://newsapi.org/v2/top-headlines?country=gb&apiKey="+APIkey)
.then(res => res.json())
.then(data => data.articles.filter((element:IArticles,index:number) => {
    if(index<=3) {
        document.getElementsByClassName("productContainer")[0].innerHTML +=
        `<div class="featuredItem">
        <div class="featuredItemImg">
        <img src="${element.urlToImage}"/>
        </div>
        <div id="starRating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        </div>
        <h1>${element.title}</h1>
        <p>${element.description ? element.description : "No description available"}</p>
        </div>`;

        document.getElementsByClassName("linksContainer")[0].innerHTML +=
        `<li><a href="${element.url}"target="_blank">${element.author ? element.author : "NA"}</a></li>`
    }
    else if(index>3 && index<=6) {
        document.getElementsByClassName("rangesItemContainer")[0].innerHTML +=
        `<div class="rangesItem">
        <img src="${element.urlToImage}"/>
        </div>`
    }
    // else if (index>3) {
    //     document.getElementsByClassName("linksContainer")[0].innerHTML +=
    //     `<li><a href="${element.url}"target="_blank">${element.author}</a></li>`
    // }
})




