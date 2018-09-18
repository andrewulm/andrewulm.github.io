// Project index page
// Author: Andrew Ulm

function getProject() {
    let i = 0;

    $.getJSON('assets/js/json/projects.json', function (data) {
        $.each(data.list, function () {
            let _projectCards = $('#_projectCards');
            let _card = $('<a href="' + data.list[i].URL + '">').html(
                `<div class="project-card">
                    <h3>${data.list[i].Name}</h3>
                    <p>${data.list[i].Description}</p>
                </div>`
            );

            $(_projectCards).append(_card);

            i++;
        });
    });
}

getProject();