$(function() {
   $('.change-burger').on('click', function(event) {
       let id = $(this).data('id');
       console.log(id);
       let newEaten = $(this).data('neweaten');
       let newEatenState = {
           eaten: !newEaten
       };

       $.ajax(`/api/burgers/${id}`, {
           type: 'PUT',
           data: newEatenState
       }).then( () => {
           console.log(`Changed Eaten to ${newEaten}`);
           location.reload();
       });
   });

   $('.create-form').on('submit', function(event) {
       event.preventDefault();

       let newBurger = {
           name: $('#burger').val().trim(),
           eaten: $('[name=eaten]:checked').val().trim()
       };

       $.ajax('/api/burgers', {
           type: 'POST',
           data: newBurger
       }).then( () => {
           console.log('Created a new Burger');
           location.reload();
       });
   });

   $('.delete-burger').on('click', function(event) {
       let id = $(this).data('id');
       console.log(id);
       console.log(this);

       $.ajax(`/api/burgers/${id}`, {
           type: 'DELETE'
       }).then( () => {
           console.log(`Deleted Burger ${id}`);
           location.reload();
       });
   });
});
