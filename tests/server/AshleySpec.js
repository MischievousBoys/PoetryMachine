var expect = require('chai').expect;
var wiki = require('node-wikipedia');
var cheerio = require('cheerio');

var ashley = require('../../server/ashleyjs/index.js');

describe('getArticle function', function () { 
  
  it('should get main picture from a wikipedia page about a person', function(done) {
    ashley.getArticle('Eddy Merckx', function(result) {
      expect(result.picture).to.equal('upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Eddy_Merckx_Molteni_1973.jpg/220px-Eddy_Merckx_Molteni_1973.jpg');
      done();
    });
  });
  
  it('should get main picture from a wikipedia page about a general subject', function(done) {
    
    ashley.getArticle('Love', function(result) {
      expect(result.picture).to.equal('upload.wikimedia.org/wikipedia/commons/thumb/a/a3/DickseeRomeoandJuliet.jpg/220px-DickseeRomeoandJuliet.jpg');
      done();
    });
  });

  it('should get first 3 headers of a wiki page', function(done) {
    ashley.getArticle('Love', function(result) {
      expect(result.headings).to.eql(['Definitions', 'Impersonal love', 'Interpersonal love']);
      done();
    });
  });
});

describe('getHomepage function', function () {

  it('should have a featured key with all necessary attributes', function(done) {
    ashley.getHomePage(function(result) {
      var linkLength = result.featured.link.length;
      var pictureLength = result.featured.picture.length;
      expect(linkLength).to.be.above(0);
      expect(pictureLength).to.be.above(0);
      done();
    });
  });

  it('Should have an equal amount of texts and links for "in the news", "on this day" and "did you know"', function(done) {
    ashley.getHomePage(function(result) {
      for(var section in result) {
        if(section !== 'featured') {
          expect(result[section].link.length).to.equal(result[section].text.length);
        }
      }
      done();
    });
  });

  it('Should have an equal amount of texts and links for "in the news", "on this day" and "did you know"', function(done) {
    ashley.getHomePage(function(result) {
      for(var section in result) {
        if(section !== 'featured') {
          expect(result[section].link.length).to.equal(result[section].text.length);
        }
      }
      done();
    });
  });
});

describe('Wikipedia Homepage consistency', function () {

  it('should have the "#mp-tfa b a" element', function(done) {
    wiki.page.data('Main Page', {content: true}, function (response) {
      $ = cheerio.load(response.text['*']);
      expect($('#mp-tfa b a').attr('title')).to.be.a('string');
      done();
    });
  });

  it('should have the "#mp-itn ul" element', function(done) {
    wiki.page.data('Main Page', {content: true}, function (response) {
      expect($('#mp-itn ul').children().length).to.be.above(0);
      done();
    });
  });
});