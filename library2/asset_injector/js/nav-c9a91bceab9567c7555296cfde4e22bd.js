//console.log('Select all elements with the class apllinks');
let links = document.querySelectorAll('.nav-button');

console.log('bb');
// change the placeholder text, change the form action when radio button changes

    var radioEverything = document.getElementById('searchCat');
    var radioWebsite = document.getElementById('searchWeb');
    var searchInput = document.getElementById('searchText');
    var form = document.getElementById('catalog_search');
	  searchInput.focus();
    // Set default checked radio button
    radioEverything.checked = true;

    radioEverything.addEventListener('change', function() {
        if (this.checked) {
            searchInput.placeholder = "Search the APL Catalog";
            searchInput.focus();
        }
    });

    radioWebsite.addEventListener('change', function() {
        if (this.checked) {
            searchInput.placeholder = "Search the APL Website";
            searchInput.focus();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var searchQuery = encodeURIComponent(searchInput.value);
        var url;

        if (radioWebsite.checked) {
            url = 'https://library.austintexas.gov/search-website?search=' + searchQuery;
        } else {
            url = 'https://austin.bibliocommons.com/v2/search?query=' + searchQuery;
        }

        window.location.href = url;
    });

(function ($,jQuery) {
  $(document).ready(function(){
console.log('hhh')
var hash = window.location.hash;
if(hash) {
$(hash + ' h2').addClass('active')
$(hash + ' h3').addClass('active')
$(hash + ' h4').addClass('active')
}

$('h2').click(function() {
    $( this ).toggleClass('active');
});
$('h3').click(function() {
    $( this ).toggleClass('active');
});

$('h4').click(function() {
    $( this ).toggleClass('active');
});

$('.jobportal-menu a, .accordion a').click(function() {
    
var hash2 = (this).attr(href);
console.log(hash2 + ' is my hash2');

var dd = hash2 + ' h2';
var dd1 = hash2 + ' h3';
var dd2 = hash2 + ' h4';
console.log(dd);
$(dd).addClass('active');
$(dd1).addClass('active');
$(dd2).addClass('active');
});

});
})(jQuery);








// Function to deactivate all active elements
function deactivateAll() {
    let activeLinks = document.querySelectorAll('.active');
    for(let i = 0; i < activeLinks.length; i++) {
        activeLinks[i].classList.remove('active');
    }
}

// Loop through each link
for(let i = 0; i < links.length; i++) {
    // Add an event listener to each link
    links[i].addEventListener('click', function(event) {
        // Prevent the link from behaving as usual
        event.preventDefault();

        // Check if the clicked link was already active
        let wasActive = this.classList.contains('active');

        // If the clicked link was not previously active, make it and its parent active
        if (!wasActive) {
            // Deactivate any active elements
            deactivateAll();
            this.classList.add('active');

            // Find the corresponding submenu and add 'active' class
            let submenu = document.getElementById('sub-' + this.id);
            if(submenu) {
                submenu.classList.add('active');
                console.log('setting focus');
                searchInput.focus();

            }
        } else {
            // Deactivate the active link and its parent
            this.classList.remove('active');

            // Find the corresponding submenu and remove 'active' class
            let submenu = document.getElementById('sub-' + this.id);
            if(submenu) {
                submenu.classList.remove('active');
            }
        }
    });
}
