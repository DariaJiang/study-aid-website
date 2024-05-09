  // song player 
  let progress = document.getElementById("progress");
    let song = document.getElementById("song");
    let ctrlIcon = document.getElementById("ctrlIcon");
    let currentidx = 0;
    // load song list, change this part to your own music files !
    let songlist = ["static/music/Colorful-Flowers(chosic.com).mp3",
                    "static/music/Fallen-chosic.com_.mp3",
                    "static/music/Ghostrifter-Official-Devyzed-Downtown-Glow(chosic.com).mp3", 
                    "static/music/Memories-of-Spring(chosic.com).mp3",
                    "static/music/Missing-You(chosic.com).mp3"];
    // if th > button is hit 
    function playPause() {
      // pause -> play
      if (song.paused) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
      // play -> pause 
      } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
      }
    }
    // progress bar 
    if (song.play()){
      setInterval(()=>{
        progress.value = song.currentTime;
      }, 500);
    }
    progress.onchange = function() {
      song.play();
      song.currentTime = progress.value;
      ctrlIcon.classList.add("fa-pause"); 
      ctrlIcon.classList.remove("fa-play");
    }
    // press the <<
    function previousSong() {
      currentidx = (currentidx - 1 + songlist.length) % songlist.length;
      song.src = songlist[currentidx];
      song.play();
    }
   // press the >>
    function nextSong() {
      currentidx = (currentidx + 1) % songlist.length;
      song.src = songlist[currentidx];
      song.play();
    }

    song.addEventListener('ended', nextSong);


// to do list 
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function drag1(e) {
   e.dataTransfer.setData("text", e.target.innerHTML); // set 'text' into the content of the list 
   e.target.classList.add("dragging"); // add a class names dragging to e 
}

function addTask() {
  if (inputBox.value === '') { // if nothing is inputted
    alert("you must wirte something!");
  } else {
    let li = document.createElement('li'); // add <li>
    li.innerHTML= inputBox.value; //<li> value </li>
    li.draggable = true; 
    li.addEventListener("dragstart", function(){console.log(hi)}); // Attach drag1 to dragstart event of the list item
    listContainer.appendChild(li); // add to the list 
    // create the X button 
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // for X
    li.appendChild(span); 
  }
  inputBox.value = ""; // empty the input box 
  saveData();
}
// if click in the container 
listContainer.addEventListener("click", function(e) {
  // if it click on a list 
  if (e.target.tagName === "LI") {
    // uncheck -> check / check -> uncheck
    e.target.classList.toggle("checked"); // toggle means reverse 
    saveData();
    // if click the X button, remove 
    // if it click on a 'X'
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove(); // remove <li>
    saveData();
  }
}, false);

// store the data
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
// get the data 
function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();




// if a draggable item is drag to a valid place 
listContainer.addEventListener("dragover", function(e) {
  e.preventDefault(); // do not come back to its original place -> so you can drag it to another place 
});

function drop1(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text"); // get the content
  const draggedItem = document.querySelector(".dragging"); // find the item that is being dragged
  const droppedItem = e.target.closest("li"); // find the closest item that the dragged item will be droped at 

  if (draggedItem && droppedItem) { 
    if (draggedItem !== droppedItem) {
      draggedItem.innerHTML = droppedItem.innerHTML
      droppedItem.innerHTML = data;
    } 
  saveData();
  draggedItem.classList.remove("dragging");
  }
}

// if a draggable item is drop somewhere 
listContainer.addEventListener("drop", drop1);

