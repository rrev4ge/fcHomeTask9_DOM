"use strict";

function getAlert(event) {
    if (document.getElementsByTagName("input")[0].value === "") {
        event.preventDefault();
        throw new RangeError("Input value do not must be empty");
    } else {
        document.getElementById("submit").setAttribute("value", "Clicked");
        alert(document.getElementsByTagName("input")[0].value);
        event.preventDefault();
    }


}

document.getElementById("submit").addEventListener("click", getAlert);


const banner = [
    new Slide("https://cdn.arstechnica.net/wp-content/uploads/2018/09/Mojave-Day.jpg", "main"),
    new Slide("https://image.shutterstock.com/image-photo/winter-mojave-desert-california-snow-260nw-1664541364.jpg", "hover"),
];

const bannerSlide = document.getElementsByTagName("img")[0];
bannerSlide.setAttribute("src", banner[0].src);
bannerSlide.setAttribute("title", banner[0].description);
function getBanner(event) {
    if (event.type === "mouseleave") {
        bannerSlide.setAttribute("src", banner[0].src);
        bannerSlide.setAttribute("title", banner[0].description);
    } else if (event.type === "mouseenter") {
        bannerSlide.setAttribute("src", banner[1].src);
        bannerSlide.setAttribute("title", banner[1].description);
    }
}

bannerSlide.addEventListener("mouseenter", getBanner);
bannerSlide.addEventListener("mouseleave", getBanner);


const slider = new Slider([
    new Slide(
        "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        "man",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quis accusamus adipisci distinctio nostrum, dignissimos assumenda quidem maxime recusandae ab ipsam vero reiciendis, placeat laboriosam quasi voluptatum id possimus eius."
    ),
    new Slide(
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "demo",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid laudantium adipisci quisquam esse eum, quae, eos fugiat a odit, possimus et. Ipsa possimus temporibus obcaecati laboriosam! Consectetur odit non quis."
    ),
    new Slide(
        "https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg",
        "grass",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis ipsa non reiciendis excepturi sed at illo veniam vel doloribus est, asperiores mollitia ducimus harum aut a et quaerat maxime quae!"
    ),
]);

const img = document.getElementById("image");

const [prevBtn, nextBtn] = document.querySelectorAll(
    "#navBtn > button"
);

const createButtonHandler = (direction = "next") => {
    return (event) => {
        const newIndex = slider[direction === "next" ? "nextIndex" : "prevIndex"];
        slider.currentIndex = newIndex;
        updateView();
    };
};

nextBtn.addEventListener("click", createButtonHandler("next"));
prevBtn.addEventListener("click", createButtonHandler("prev"));

updateView();

function updateView() {
    const {
        currentSlide: { src, description, info },
    } = slider;

    img.setAttribute("src", src);
    img.setAttribute("title", description);
    document.getElementById("imageInfo").innerHTML = info;
}
