/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function() {
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        var regularExpressionUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        function testEachFeedInallFeeds(feed) {
            it('should have a defined,valid and non-empty url and name', function() {
                // here can be several expect functions depending on inputParameter
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url).not.toBe('');
                //check if valid url using regex
                expect(allFeeds[feed].url).toMatch(regularExpressionUrl);
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name).not.toBe('');
            });
        }

          // Loop to verify each feed in allFeeds
          for(var feed = 0, len = allFeeds.length; feed < len; feed++) {
              testEachFeedInallFeeds(feed);
          }

    });

    describe('The Menu', function() {

       it('should have a hidden menu by default', function(){
          expect(document.body.className).toContain('menu-hidden');
       });

        it('should display the menu onClick', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body')).not.toContain("menu-hidden");
        });

        it('should hide the menu when clicked again', function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    describe('Async Initial Entries', function(){

           beforeEach(function(done){
             loadFeed(0, done);
          })

          it('when loadFeed is done there is an .entry element in container', function(){
            expect($('.feed .entry').size()).not.toBe(0);
          })

      });

    describe('New Feed Selection', function() {

        var oldFeed,
        newFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = ($('.feed').html());
            loadFeed(1, function() {
                newFeed = ($('.feed').html());
                    done();
                });
            });
        });

        it('should change the content of the feed', function(done) {
            expect(oldFeed).not.toEqual(newFeed);
                done();
            });
});

}());
