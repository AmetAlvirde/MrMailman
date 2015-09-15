/*jslint node: true, indent: 2*/
'use strict';

var fs               = require('fs'),
  Q                  = require('q'),
  nodemailerMarkdown = require('nodemailer-markdown').markdown,
  nodemailer         = require('nodemailer'),
  R                  = require('ramda'),
  ReadWriteLock      = require('rwlock');

function deliverMails(from, receivers, subject, markdown, passenger) {
  var mail    = {},
    result,
    transport = nodemailer.createTransport(passenger);

  R.forEach(function (receiver) {
    mail.from     = from;
    mail.to       = receiver;
    mail.subject  = subject;
    mail.markdown = markdown;

    transport.use('compile', nodemailerMarkdown());
    transport.sendMail(mail, function (error, info) {
      if (error) {
        result = error;
        console.log(error);
      } else {
        result = info.response;
        console.log('Message sent: ' + info.response);
      }
    });
  }, receivers);

  return result;
}

function spyAndReplace(replaces, templateURL) {
  var lock   = new ReadWriteLock(),
    deferred = Q.defer();

  lock.writeLock(function (release) {
    Q.nfcall(fs.readFile, templateURL, 'utf-8')
      .then(function (markdown) {
        var wordToReplace,
          regex;

        R.forEach(function (replace) {
          wordToReplace = R.keys(replace)[0];
          regex         = new RegExp(wordToReplace, 'g');
          markdown      = markdown.replace(regex, replace[wordToReplace]);
        }, replaces);

        release();
        deferred.resolve(markdown);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
  return deferred.promise;
}

module.exports = {
  deliver: function (mailOptions) {
    var passenger = {
      service: mailOptions.auth.service,
      auth: {
        user: mailOptions.auth.user,
        pass: mailOptions.auth.password
      }
    };

    spyAndReplace(
      mailOptions.content.replaces,
      mailOptions.content.templateURL
    )
      .then(function (markdown) {
        deliverMails(
          mailOptions.content.from,
          mailOptions.content.receivers,
          mailOptions.content.subject,
          markdown,
          passenger
        );
      });
  },
  spyAndReplace: spyAndReplace,
  deliverMails:  deliverMails
};
