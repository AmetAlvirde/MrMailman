/*jslint node: true, indent: 2,nomen:true */
'use strict';

var fs            = require('fs'),
  mailer,
  mailover        = require('mailover'),
  R               = require('ramda'),
  ReadWriteLock   = require('rwlock');

module.exports = function (mailOptions) {
  var transport = {
    auth: {}
  },
    lock          = new ReadWriteLock(),
    mail          = {};

  transport.service      = mailOptions.auth.service;
  transport.auth.user    = mailOptions.auth.user;
  transport.auth.mail    = mailOptions.auth.mail;

  lock.writeLock(function (release) {
    fs.readFile(mailOptions.content.templateURL, 'utf-8', function (err, data) {
      if (err) {
        throw err;
      }

      var wordToReplace;
      R.forEach(function (replace) {
        wordToReplace = R.keys(replace)[0];
        data = data.replace(
          '/'.concat(wordToReplace, '/g'),
          replace[wordToReplace]
        );
      }, mailOptions.content.replaces);

      R.forEach(function (person) {
        mail.from     = mailOptions.from;
        mail.to       = person.mail;
        mail.subject  = mailOptions.subject;
        mail.markdown = data;

        mailer = mailover(transport);
        mailer.send(mail);

      }, mailOptions.receivers);

      release();
    });
  });
};
