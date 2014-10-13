'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

function assertTextValueByCSS(selector, regexp) {
  expect(element.all(by.css(selector)).first().getText()).toMatch(regexp);
}

describe('my app', function() {

  browser.get('index.html');

  it('base path should be index.html', function() {
    expect(browser.getLocationAbsUrl()).toMatch('');
  });

  describe('welcome', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should render welcome view', function() {
      assertTextValueByCSS('main h1', /Niji Angular Boilerplate/);
      assertTextValueByCSS('main p', /Message de bienvenue affiché par Angular JS/);
    });

  });

});
