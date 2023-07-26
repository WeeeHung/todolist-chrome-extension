document.addEventListener('DOMContentLoaded', function() {
    // array of to do items
    var todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    function clearList() {
        var ul = document.getElementById("myUL");
        ul.innerHTML = "";
    }
    // init the list with remove
    function initTheList() {
        clearList();
        // const initList = JSON.parse(localStorage.getItem('todoList'));

        // Loop through the array and display each item
        for (const todoItem of todoList) {
            const listItem = document.createElement('li');
            
            listItem.textContent = todoItem.value;

            // Add the "checked" class to the list item if the to-do is completed
            if (todoItem.completed) {
                listItem.classList.toggle('checked');
            }

            // Add the list item to the DOM
            document.getElementById("myUL").appendChild(listItem);
            // document.querySelector('myUL').appendChild(listItem);
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            listItem.appendChild(span);
        }
        removable();
    }

    initTheList();

    // Click on a close button to hide the current list item
    function removable() {
        var close = document.getElementsByClassName("close");
        var i;
        for (let i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                console.log(close.length);
                var div = this.parentElement;
                var indexToRemove = Array.prototype.indexOf.call(div.parentNode.children, div);
                div.style.display = "none";
        
                // var todoList = JSON.parse(localStorage.getItem('todoList'));
                todoList.splice(indexToRemove, 1);
                // Update the local storage with the modified array
                localStorage.setItem('todoList', JSON.stringify(todoList));
                initTheList();
            };
        }
    }

    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            
            var todoList = JSON.parse(localStorage.getItem('todoList'));
            // Find the index of the item you want to update
            var indexToUpdate = todoList.findIndex(item => item.value === ev.target.textContent.slice(0, -1));
            // Update the completed status of the item in the array
            todoList[indexToUpdate].completed = !todoList[indexToUpdate].completed;
            // Update the local storage with the modified array
            localStorage.setItem('todoList', JSON.stringify(todoList));
        }
    });

    var addBtn = document.getElementById("addBtn");
    var inputField = document.getElementById("myInput");

    inputField.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addBtn.click();
    }
    });

    addBtn.addEventListener("click", function() {
      // Call the newElement function to add a new item to the list
      newElement();
    });

    // Create a new list item when clicking on the "Add" button
    function newElement() {
        //var li = document.createElement("li");
        var inputValue = document.getElementById("myInput").value;
        // var t = document.createTextNode(inputValue);
        // li.appendChild(t);
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            // var todoList = JSON.parse(localStorage.getItem('todoList'));
            // Create a new to-do object
            var todoItem = { 
                value: inputValue, 
                completed: false 
              };
              console.log(todoItem);
            // Add the new to-do to the array
            todoList.push(todoItem);
            // Update the local storage with the modified array
            localStorage.setItem('todoList', JSON.stringify(todoList));
            document.getElementById("myInput").value = "";
            initTheList();
        }
    }
});

