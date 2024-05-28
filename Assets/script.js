const sidebarLinks = document.querySelectorAll('.navbar-link');
const sections = document.querySelectorAll('[data-page]');

sidebarLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove active class from all links
    sidebarLinks.forEach(link => link.classList.remove('active'));

    // Add active class to the clicked link
    this.classList.add('active');

    // Get the data-nav-link attribute of the clicked link
    const page = this.getAttribute('data-nav-link');
    console.log("selected: " + page);

    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));

    // Show the section with the matching data-page attribute
    const sectionToShow = document.querySelector(`[data-page="${page}"]`);

    // Check if the element exists before adding the class
    if (sectionToShow) {
      sectionToShow.classList.add('active');
    } else {
      console.error(`Element with data-page="${page}" not found.`);
    }
  });
});


$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'Assets/portfolio.json',
    dataType: 'json',
    success: function(data, status) {
      let output = '';
      data.portfolio.forEach(element => {
        output += `
          <li class="project-item active" data-filter-item data-category="${element.category}">
            <a href="#">
              <figure class="project-img">
                <div class="project-item-icon-box">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
              </figure>
              <h3 class="project-title">${element.title}</h3>
              <p class="project-category">${element.category}</p>
            </a>
          </li>`;
      });
      $('.project-list').html(output);

      // Add click event for the project items
      $('.project-item').on('click', function() {
        const title = $(this).find('.project-title').text();
        const category = $(this).find('.project-category').text();
        const description = data.portfolio.find(project => project.title === title).description;

        $('#modal-title').text(title);
        $('#modal-category').text(category);
        $('#modal-description').text(description);
        $('#modal').css('display', 'block'); // Show the modal when clicked
      });

      // Close modal
      $('.close').on('click', function() {
        $('#modal').css('display', 'none');
      });

      // Close modal when clicking outside of it
      $(window).on('click', function(event) {
        if ($(event.target).is('#modal')) {
          $('#modal').css('display', 'none');
        }
      });
    },
    error: function(msg) {
      alert('There was a problem: ' + msg.status + ' ' + msg.statusText);
    },
  });
});
