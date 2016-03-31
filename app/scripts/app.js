$(document).ready(function() {

    var advanceTask = function(task) {
      var modified = task.innerText.trim()
      for (var i = 0; i < listo.length; i++) {
        if (listo[i].task === modified) {
          if (listo[i].id === 'new') {
            listo[i].id = 'inProgress';
          } else if (listo[i].id === 'inProgress') {
            listo[i].id = 'archived';
          } else {
            listo.splice(i, 1);
          }
          break;
        }
      }
      task.remove();
    };

  // create array for storing tasks
  var listo = [];

  //******* trying to set up local storage *********
  // localStorage.setItem();

  //Makes newTaskForm hidden when doc loads.
  $('#newTaskForm').hide();

  // Constructor Fn to create task objects
  var Task = function(task) {
      this.task = task;
      this.id = 'new';
  };

  // Fn to push created object to the array
  var addTask = function(task) {
      if(task) {
          task = new Task(task);
          listo.push(task);

          //input form clearing after submit
          $('#newItemInput').val('');

          //showing new list item in HTML
          $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
      }

      // hide/show the input form
      $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');

  };

     // event that calls addTask Fn when click saveNewItem BTN.
     $('#saveNewItem').on('click', function(e){
       e.preventDefault();
       var task = $('#newItemInput').val().trim();
       addTask(task);
   });

     // open/close the new task form with newListItem and Cancel

     // open form
     $('#newListItem').on('click', function () {
         $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
     });

     // close form
     $('#cancel').on('click', function(e) {
         e.preventDefault();
         $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
     });

      // Fn that allows us to changes status from
      // 'new' to 'inProgress'
      $(document).on('click', '#item', function(e) {
          e.preventDefault();

    // set var task so that we can access the 'this'
    // keyword to pass it into another Fn.
    // Also going to change ID to the string 'inProgress'
          var task = this;
          advanceTask(task);
          this.id = 'inProgress';

    //  move list item.  pull all html around item
          $('#currentList').append(this.outerHTML);
      });

    // move items from inProgress to archived
    $(document).on('click', '#inProgress', function (e) {
      e.preventDefault();
      var task = this;
      task.id = "archived";
      var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
      advanceTask(task);
      $('#archivedList').append(changeIcon);
    });

    // delete items from list.  pass task into advanceTask
    // without a new ID.
    $(document).on('click', '#archived', function(e) {
        e.preventDefault();
        var task = this;
        advanceTask(task);
    });




})
