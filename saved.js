const savedContainer = document.getElementById("savedContainer");
const message = document.querySelector(".message");
let count = 1;

let savedArr = [];

// this makes it where you can show or hide the saved for later items
const toggleDisplay = () => {
  const show = document.querySelectorAll(".show");
  Array.from(show).forEach((item) => {
    item.addEventListener("click", () => {
      const spanText = item.childNodes[1];
      const toggleShow = item.parentElement.getElementsByTagName("div")[1];
      toggleShow.classList.toggle("showDiv");
      if (toggleShow.classList.contains("showDiv")) {
        spanText.innerText = ` click to hide.`;
      } else spanText.innerText = ` click to show.`;
    });
  });
};

// grabs the saved for later local storage items and shows it on the website
const showSaved = () => {
  savedArr = JSON.parse(localStorage.getItem("saved for later"));
  if (savedArr.length > 0) message.classList.add("hideText");
  else message.classList.remove("hideText");
  savedArr.forEach((item) => {
    create(item);
  });
  toggleDisplay();
  deleteItem();
};

// deletes the saved for later item when the x is clicked
const deleteItem = () => {
  const deleteAll = document.querySelectorAll(".delete");
  Array.from(deleteAll).forEach((item) => {
    item.addEventListener("click", () => {
      let index = item.parentElement.parentElement.id - 1;
      savedArr.splice(index, 1);
      localStorage.setItem("saved for later", JSON.stringify(savedArr));
      savedContainer.innerHTML = "";
      count = 1;
      showSaved();
      setTimeout(() => alert("Item deleted"), 50);
    });
  });
};

// creates all the elements for the saved for later item
const create = (html) => {
  const savedItem = document.createElement("div");
  savedItem.id = count;
  savedItem.classList.add("savedItem");
  const show = document.createElement("div");
  show.classList.add("show");
  show.innerText = `Saved item ${count}`;
  const span = document.createElement("span");
  span.innerText = " click to show.";
  span.classList.add(`display${count}`);
  const deleting = document.createElement("span");
  deleting.classList.add("delete");
  deleting.innerText = "x";
  show.appendChild(span);
  show.appendChild(deleting);
  count++;
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("hideDiv");
  mainDiv.innerHTML = html;
  savedItem.appendChild(show);
  savedItem.appendChild(mainDiv);
  savedContainer.appendChild(savedItem);
};

showSaved();
