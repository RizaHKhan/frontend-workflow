let sliderContainer = document.querySelector(".slider-container");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

let slidesInContainer = 3;
const timeout = 1000;

if (slidesInContainer > items.length) {
  slidesInContainer = items.length;
}

let widthOfSlide = sliderContainer.offsetWidth / slidesInContainer;

function setupUI() {
  for (let x = 0; x < slidesInContainer; x++) {
    var slide = document.createElement("div");
    slide.classList.add("slide");
    slide.style.width = `${widthOfSlide}px`;
    slide.style.left = `${widthOfSlide * x}px`;
    setupSlide(slide, items[slidesInContainer - x - 1]);
    sliderContainer.appendChild(slide);
  }
  for (let x = 0; x < slidesInContainer - 1; x++) {
    let item = items.shift();
    items.push(item);
  }
}

next.addEventListener("click", () => {
  createSlide("next");
});

prev.addEventListener("click", () => {
  createSlide("prev");
});

function createSlide(direction) {
  if (!(slidesInContainer >= items.length)) {
    let newSlide = document.createElement("div");
    newSlide.classList.add("slide");
    newSlide.style.width = `${widthOfSlide}px`;
    newSlide.style.left = `${-widthOfSlide}px`;

    if (direction === "next") {
      sliderContainer.insertAdjacentElement("afterbegin", newSlide);
      setupSlide(newSlide, items[1]);
      var item = items.shift();
      items.push(item);
    } else {
      sliderContainer.insertAdjacentElement("beforeend", newSlide);
      newSlide.style.left = `${slidesInContainer * widthOfSlide}px`;
      setupSlide(newSlide, items[items.length - slidesInContainer]);
      var item = items.pop();
      items.unshift(item);
    }
    setTimeout(() => {
      moveSlides(direction);
    }, 600);
  }
}

function moveSlides(direction) {
  let slides = document.querySelectorAll(".slide");
  if (direction === "next") {
    slides.forEach((slide) => {
      slide.style.left = `${
        parseInt(slide.style.left.split("px")[0]) + widthOfSlide
      }px`;
    });
    setTimeout(() => {
      slides[slides.length - 1].remove();
    }, 600);
  } else {
    slides.forEach((slide) => {
      slide.style.left = `${
        parseInt(slide.style.left.split("px")[0]) - widthOfSlide
      }px`;
    });
    setTimeout(() => {
      slides[0].remove();
    }, 600);
  }
}

function setupSlide(slide, item) {
  // Add background image
  slide.style.backgroundImage = `url(${item.image})`;

  // UI portion
  let link = document.createElement("h1");
  link.classList.add("slide-link");
  link.innerText = item.link;

  let title = document.createElement("h4");
  title.classList.add("slide-title");
  title.innerText = item.title;

  // Add description
  var description = document.createElement("p");
  description.classList.add("slide-description");
  description.innerText = item.description;

  slide.appendChild(link);
  slide.appendChild(title);
  slide.appendChild(description);
}

setupUI();
