
// Preloader
window.addEventListener("load", function() {
    document.querySelector(".preloader").classList.add("opacity-0");

    clear();

    setTimeout( function() {
        document.querySelector(".preloader").style.display="none";
    },1000);
})


// Portfolio Item filter
const filterContainer = document.querySelector(".portfolio-filter"),
      filterButtons = filterContainer.children,
      totalFilterButtons = filterButtons.length,
      lightboxClose = document.querySelector(".lightbox-close"),
      portfolioItems = document.querySelectorAll(".portfolio-item"),
      totalPortfolioItems = portfolioItems.length;
      
for (let i=0; i<totalFilterButtons; i++) {
    filterButtons[i].addEventListener("click", function() {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        
        for (let k=0; k<totalPortfolioItems; k++) {
            if (filterValue === portfolioItems[k].getAttribute("data-category")) {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            } else {
                portfolioItems[k].classList.remove("show");
                portfolioItems[k].classList.add("hide");
            }
            if (filterValue === "all") {
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    });
}

// Lightbox
const lightbox = document.querySelector(".lightbox"),
      lightboxImage = lightbox.querySelector(".lightbox-img"),
      lightboxText = lightbox.querySelector(".caption-text"),
      lightboxCounter = lightbox.querySelector(".caption-counter");

let itemIndex = 0;

for (let i=0; i<totalPortfolioItems; i++) {
    portfolioItems[i].addEventListener("click", function() {
        itemIndex = i;
        changeItem();
        toggleLightBox();
    })
}

function toggleLightBox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    imageSource = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    lightboxImage.src = imageSource;
    lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex+1)+" of "+totalPortfolioItems;
}

function prevItem() {
    if ( itemIndex == 0) {
        itemIndex = totalPortfolioItems-1;
    } else {
        itemIndex--;
    }
    changeItem();
}

function nextItem() {
    if ( itemIndex == totalPortfolioItems-1 ) {
        itemIndex = 0;
    } else {
        itemIndex++;
    }
    changeItem();
}

// Close Lightbox
lightbox.addEventListener("click", function(event) {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightBox();
    }
});

/* Aside Navbar */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;

for (let i=0; i<totalNavList; i++) {
    const navItem = navList[i].querySelector("a");
    navItem.addEventListener("click", function() {

        // remove back-section class
        removeBackSectionClass();
        
        for (let j=0; j<totalNavList; j++) {

            if (navList[j].querySelector("a").classList.contains("active")) {

                // add back-section class
                addBackSectionClass(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");

        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerButton();
        }
    });
}

function removeBackSectionClass() {
    for (let aa=0; aa<totalSection; aa++) {
        allSection[aa].classList.remove("back-section");
    }
}

function addBackSectionClass(j) {
    allSection[j].classList.add("back-section");
}

function showSection(element) {

    for (let zz=0; zz< totalSection; zz++) {
        allSection[zz].classList.remove("active");
    }

    const target = element.getAttribute("href").split("#")[1];

    document.querySelector("#"+target).classList.add("active");
}

function updateNav(element) {
    
    for (let i=0; i<totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];

        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index");
    
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
})

const navToggleButton = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside");

      navToggleButton.addEventListener("click", asideSectionTogglerButton);

function asideSectionTogglerButton() {
    aside.classList.toggle("open");
    navToggleButton.classList.toggle("open");

    for (let zz=0; zz< totalSection; zz++) {
        allSection[zz].classList.toggle("open");
    }
};


function clear() {

    if (document.getElementById("name").value !== "" || document.getElementById("name").value !== null) {
        document.getElementById("name").value = "";
    }

    if (document.getElementById("mail").value !== "" || document.getElementById("mail").value !== null) {
        document.getElementById("mail").value = "";
    }

    if (document.getElementById("subject").value !== "" || document.getElementById("subject").value !== null) {
        document.getElementById("subject").value = "";
    }

    if (document.getElementById("content").value !== "" || document.getElementById("content").value !== null) {
        document.getElementById("content").value = "";
    }

}
function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField.value) == false) {
        alert('Invalid Email Address');
        return false;
    } else {        

        return true;
    }
}

function validateFields() {
    var _name_ = document.getElementById("name").value;
    var _subject_ = document.getElementById("subject").value;
    let a = 1,b = 1;

    if ( _name_ === "" || _name_ === null)  {
        document.getElementById("name").required = true;
        a = 0;
    } else {
        a = 1;
    }
    
    if ( _subject_ === "" || _subject_ === null) {
        document.getElementById("subject").required = true;
        b = 0;
    } else {        
        b = 1;
    }

    if (a === b) {
        return true;
    } else {
        return false;
    }
}

function moveUp() {

    if (validateFields()) {

        setTimeout(function() { 
    
            // let url = window.location.href;
            // let new_url = url.split("#")[0]+"#home";
    
            // window.location = new_url;
            // document.location.reload(true);
        }, 3000);
        
        setTimeout(function() { 
            document.querySelector(".confirm_msg").innerHTML = "Thanks for Submitting!!";
        }, 1000);
        
    } 
}



