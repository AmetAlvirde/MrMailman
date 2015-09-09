/*jslint node: true, indent: 2*/
'use strict';

var fs            = require('fs'),
  Q = require('q'),
  mailer,
  mailover        = require('mailover'),
  R               = require('ramda'),
  ReadWriteLock   = require('rwlock');

module.exports = {
  deliver: function (mailOptions) {
    var transport = {
        auth: {}
      },
      mail = {
        markdown: {
          path: {}
        }
      };

    transport.service   = mailOptions.auth.service;
    transport.auth.user = mailOptions.auth.user;
    transport.auth.pass = mailOptions.auth.password;

    spyAndReplace(
        mailOptions.content.replaces,
        mailOptions.content.templateURL
      )
      .then(function (data) {
        deliverMails(
          mailOptions.content.from,
          mailOptions.content.receivers,
          mailOptions.content.subject,
          data,
          mail
        );
      });
  }
};

function spyAndReplace (replaces, templateURL) {
  var lock = new ReadWriteLock(),
    deferred = Q.defer();

  lock.writeLock(function (release) {
     Q.nfcall(fs.readFile, templateURL, 'utf-8')
      .then(function (data) {
        var wordToReplace,
          regex;

        R.forEach(function (replace) {
          wordToReplace = R.keys(replace)[0];

          regex = new RegExp(wordToReplace, 'g')
          data = data.replace(regex, replace[wordToReplace]);
        }, replaces);

        release();

        deferred.resolve(data);
    });
  });

  return deferred.promise;
}

function deliverMails (from, receivers, subject, data, mail) {
  R.forEach(function (person) {
    console.log(person);
    mail.from          = from;
    mail.to            = person;
    mail.subject       = subject;
    mail.markdown.path = data;

    console.log('ASDFASDFASD');
    console.log(mail);
    mailer = mailover(transport);
    mailer.send(mail);
  }, receivers);
}
