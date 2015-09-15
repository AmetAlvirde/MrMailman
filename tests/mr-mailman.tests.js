/* jslint node: true */
/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var expect  = require('chai').expect,
  MrMailman = require('../src/mr-mailman.js'),
  should    = require('chai').should(),
  assert    = require('chai').assert;


describe('Deliver a mail', function () {
  it('should read a markdown file and replace its regular expressions',
    function (done) {
      var replaces = [{'<<0>>': 'Mr.Mailman'}, {'<<1>>': 'hello'}],
        templateURL = './demo/hola.md';

      MrMailman.spyAndReplace(replaces, templateURL)
        .then(function (replacedMarkdown) {
          expect(replacedMarkdown).to.be.a('string');
          expect(replacedMarkdown)
            .to.equal('#Hola\n\n*Mr.Mailman* wants to say hello\n');
          done();
        })
        .catch(function (err) {
          console.log(err);
        });
    });
});
