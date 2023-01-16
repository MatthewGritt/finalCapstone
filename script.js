const save = document.querySelectorAll(".save");
const add = document.getElementById("add");
const button = document.querySelector(".post");
const commentsDiv = document.querySelector(".commentSection");
const contact = document.getElementById("contact");
const likes = Array.from(document.querySelectorAll(".likeBtn"));
let savedArr = [];
let comments = [];
let likesArr = [];

// it will create all three of these local storages if they dont exist
if (localStorage.getItem("saved for later") === null) {
  localStorage.setItem("saved for later", JSON.stringify(savedArr));
}
if (localStorage.getItem("comments") === null) {
  localStorage.setItem("comments", JSON.stringify(savedArr));
}

if (localStorage.getItem("likes") === null) {
  likes.forEach((like) => {
    likesArr.push("notLiked");
  });
  localStorage.setItem("likes", JSON.stringify(likesArr));
}

// pushes selected html part into saved for later storage when the save button is clicked
Array.from(save).forEach((item) => {
  item.addEventListener("click", (e) => {
    let parent = item.parentElement.outerHTML;
    savedArr = JSON.parse(localStorage.getItem("saved for later"));
    // count keeps track of how many items are in your saved for later folder
    let count = savedArr.length;
    if (savedArr.includes(parent)) alert("You have already saved that item");
    else {
      savedArr.push(parent);
      localStorage.setItem("saved for later", JSON.stringify(savedArr));
      count++;
      alert(`You have ${count} items in your Save for later folder`);
    }
  });
});

// creates all the elements of the comment
const create = (text) => {
  const div = document.createElement("div");
  div.classList.add("comment");
  const p = document.createElement("p");
  p.classList.add("text");
  const span = document.createElement("span");
  span.innerText = "x";
  span.classList = "commentDel";
  p.innerText = text;
  div.appendChild(p);
  div.appendChild(span);
  commentsDiv.appendChild(div);
};

// grabs the comments in local storage then creates all the comments and shows them on website
const getComments = () => {
  if (commentsDiv.innerHTML !== "") commentsDiv.innerHTML = "";
  comments = JSON.parse(localStorage.getItem("comments"));
  comments.forEach((item) => {
    create(item);
  });
  deleteComment(comments);
};

// adds an event on the text area to adjust the height while you enter a comment
add.addEventListener("keyup", (e) => {
  let height = e.target.scrollHeight;
  add.style.height = `${height}px`;
});

// creates a new comment when post comment is clicked
// it then calls the getComments function to show it on website
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (add.value !== "") {
    comments.push(add.value);
    localStorage.setItem("comments", JSON.stringify(comments));
    add.value = "";
    commentsDiv.innerHTML = "";
    getComments();
  } else alert("You did not enter a comment");
});

// deletes the comment when the x is clicked
const deleteComment = (arr) => {
  const deletes = Array.from(document.querySelectorAll(".commentDel"));
  deletes.forEach((item) => {
    item.addEventListener("click", (e) => {
      const clicked = e.target.parentElement;
      const index = arr.indexOf(clicked.childNodes[0].innerText);
      arr.splice(index, 1);
      localStorage.setItem("comments", JSON.stringify(arr));
      getComments();
      setTimeout(() => alert("comment deleted"), 50);
    });
  });
};

// shows an alert when you click submit button
contact.addEventListener("submit", () => {
  alert("Thank you for contacting us.");
});

getComments();

// this if statment only runs when lessons.html is loaded
if (location.pathname.slice(-12) === "lessons.html") {
  // grabs the likes local storage ids
  // it then loops through the buttons and adds the saved ids
  const likedButtons = () => {
    likesArr = JSON.parse(localStorage.getItem("likes"));
    for (let i = 0; i < likesArr.length; i++) {
      likes[i].id = likesArr[i];
    }
    likes.forEach((like) => {
      if (like.id === "liked") {
        like.innerText = "Liked";
      } else {
        like.innerText = "Like";
      }
    });
  };

  likedButtons();

  // changes the clicked button to either liked or not liked then updates the likes local storage
  // likedButtons function is then called to update the button text
  likes.forEach((like) => {
    like.addEventListener("click", (e) => {
      e.preventDefault();
      let index = like.classList[1];
      if (like.innerText === "Like") {
        likesArr[index] = "liked";
      } else {
        likesArr[index] = "notLiked";
      }
      localStorage.setItem("likes", JSON.stringify(likesArr));
      likedButtons();
    });
  });
}
