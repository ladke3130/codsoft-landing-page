const items = document.querySelector(".items");
const btns = document.querySelectorAll(".wrapper i");
const cardWidth = items.querySelector(".card").offsetWidth;
const itemsChildrens = [...items.children];

let cardPerView = Math.round(items.offsetWidth / cardWidth);//no of cards to fit the items list at once

itemsChildrens.slice(-cardPerView).reverse().forEach( card => {
    items.insertAdjacentHTML("afterbegin", card.outerHTML);
});
itemsChildrens.slice(0,cardPerView).forEach( card => {
    items.insertAdjacentHTML("beforeend", card.outerHTML);
});

const infiniteScroll = () =>{
    //if item list at beg bring to end..
    if(items.scrollLeft === 0){
        items.classList.add("no-transition");
        items.scrollLeft = items.scrollWidth - (2.9 * items.offsetWidth);
        items.classList.remove("no-transition");
    }
    //if item list at end bring to start..
    else if(Math.ceil(items.scrollLeft) === items.scrollWidth - items.offsetWidth){
        items.classList.add("no-transition");
        items.scrollLeft = items.scrollWidth - (4.9 * items.offsetWidth);
        items.classList.remove("no-transition"); 
    }

};


/*prev and next btns*/

btns.forEach(btn => {
    btn.addEventListener("click", () =>{
        items.scrollLeft += btn.id === "left" ? -cardWidth : cardWidth;
    });
});



/*scrolling through dragging*/
let isDragging = false ,startX , startScrollLeft ;

const dragStart = (x) => {
    isDragging = true;
    items.classList.add("dragging");
    startX = x.pageX;
    startScrollLeft = items.scrollLeft;
};
const dragStop = () => {
    isDragging = false;
    items.classList.remove("dragging");
};

const dragging = (x) => {
    if(!isDragging) return;
    items.scrollLeft = startScrollLeft - (x.pageX - startX);
};

items.addEventListener("mousedown" ,dragStart);
items.addEventListener("mousemove" ,dragging);
document.addEventListener("mouseup",dragStop);

items.addEventListener("scroll", infiniteScroll);