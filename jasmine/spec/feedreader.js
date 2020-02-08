/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    // RSS Feeds suite that tests the feeds 
    describe('RSS Feeds', function() {

        // it tests if allFeeds variable has been defined and that it is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // it test if allFeeds' URL are defined and are not empty.
        it('URLs are defined', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // it test if allFeeds have a name and it is not empty.
        it('names are defined', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    // 'The menu' suite that tests the menu 
    describe('The menu', function () {
        // it tests if the menu element is hidden
        it('menu element is hidden', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

        // it test the click event of hiding/showing the menu element.
        it('hiding and showing click event', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    // Initial Entries suite to test the entries
    describe('Initial Entries', function () {
        // an asynchronous function to ensure completion 
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // tests and ensures '.feed' has at least a single entry inside 
        it('checks if feed has entries', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
        

    // New Feed Selection suite to test that feed is loaded
    describe('New Feed Selection', function () {
        let firstFeed, secondFeed;
        
        // test that the new feed is loaded by loadFeed() function
        beforeEach(function(done) {
            loadFeed(1, function() {
                // Loads first entry
                firstFeed = $('.feed').html();
                loadFeed(2, function() {
                    //Loads second entry
                    secondFeed = $('.feed').html();
                    done();
                });
            });        
        });
        // it Tests if the entries are not the same
        it('load new feed', function() {
            expect(firstFeed).not.toBe(secondFeed);
        }); 
    });
}());
