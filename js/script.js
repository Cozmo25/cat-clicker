/* Model */

var model = {

    catSelected: null,
    cats: [
        {
            clickCount: 0,
            src: 'images/cat1.jpeg',
            catName: "Bella",
            id: 'cat1'
        },
        {
            clickCount: 0,
            src: 'images/cat2.jpeg',
            catName: "Theo",
            id: 'cat2'
        },
        {
            clickCount: 0,
            src: 'images/cat3.jpeg',
            catName: "Pepsi",
            id: 'cat3'
        },
        {
            clickCount: 0,
            src: 'images/cat4.jpeg',
            catName: "PIB",
            id: 'cat4'
        },
        {
            clickCount: 0,
            src: 'images/cat5.jpeg',
            catName: "Candy",
            id: 'cat5'
        }
    ]
}

/* Controller */

var controller = {

    init: function() {

        // set our current cat to the first one in the list
        model.catSelected = model.cats[0];

        // tell our views to initialize
        catList.init();
        catView.init();
        adminView.init();
    },

    getSelectedCat: function() {
        return model.catSelected;
    },

    getAllCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCatSelected: function(cat) {
        model.catSelected = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.catSelected.clickCount++;

        catView.render();
    },

    //show admin panel when admin button is clicked
    showAdmin: function() {

        adminView.render();
    },

    //hides admin panel when cancel is clicked
    hideAdmin: function() {

        adminView.cancel();
    },

    saveValues: function(name, url, clicks) {

        model.catSelected.catName = name;
        model.catSelected.src = url;
        model.catSelected.clickCount = clicks;

    }

}

/* Views */

var catView = {

    init: function() {

        // store pointers to our DOM elements for easy access later
        this.catElem = $('#cat-container')[0];
        this.catNameElem = $('#catname')[0];
        this.catImageElem = $('#cat-img')[0];
        this.countElem = document.getElementById('count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            controller.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();

    },

    render: function() {

        // update the DOM elements with values from the current cat
        var catSelected = controller.getSelectedCat();
        this.countElem.textContent = catSelected.clickCount;
        this.catNameElem.textContent = catSelected.catName;
        this.catImageElem.src = catSelected.src;

    }
}

var catList = {

    init: function() {

        // store the DOM element for easy access later
        this.catListElem = $('#cat-list li')

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {

        var cat, elem;
        // get the cats we'll be rendering from the controller
        var cats = controller.getAllCats();

        // empty the cat list
        //this.catListElem.innerHTML = '';

        for (var i = 0; i < cats.length; i++) {

            // this is the cat we're currently looping over
            cat = cats[i];

            elem = $(this.catListElem);

            // on click, setcatSelected and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem[i].addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCatSelected(catCopy);
                    catView.render();
                };
            })(cat));

        }
    }
}

var adminView = {

    init: function() {

        //store the DOM objects for admin area for later use
        this.adminElem = $('.admin-area');
        this.nameInput = $('#catname-input')[0];
        this.urlInput = $('#caturl-input')[0];
        this.clickInput = $('#catclicks-input')[0];

        //get the admin button
        var adminBtn = $('#admin-btn')[0];
        //get the cancel button
        var cancelBtn = $('#cancel-btn')[0];
        //get the cancel button
        var saveBtn = $('#save-btn')[0];

        // on admin button click, show the admin panel
        adminBtn.addEventListener('click', function(){
            controller.showAdmin();
        });

        // on cancel button click, hide the admin panel
        cancelBtn.addEventListener('click', function(){
            controller.hideAdmin();
        });

        // on cancel button click, save the values in admin panel
        saveBtn.addEventListener('click', function(){
            adminView.save();
        });

    },

    render: function() {

        //show the admin panel
        this.adminElem.show();

        // update the DOM elements with values from the current cat
        var catSelected = controller.getSelectedCat();
        this.nameInput.value = catSelected.catName;
        this.urlInput.value = catSelected.src;
        this.clickInput.value = catSelected.clickCount;

    },

    cancel: function() {

        //hide the admin panel
        this.adminElem.hide();
    },

    save: function() {
        //declare variables for input values
        var name = this.nameInput.value;
        var url = this.urlInput.value;
        var clicks = this.clickInput.value;

        //pass variables to controller to save in model
        controller.saveValues(name, url, clicks);

        //hide the admin panel
        this.cancel();

        //update the view with the saved values
        catView.render();

    }
}

// make it go!
controller.init();
