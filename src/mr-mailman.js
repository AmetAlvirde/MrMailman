/*jslint node: true, indent: 2*/
'use strict';

var fs          = require('fs'),
  MailComposer  = require('mailcomposer').MailComposer,
  Mailgun       = require('mailgun'),
  Q             = require('q'),
  R             = require('ramda'),
  ReadWriteLock = require('rwlock');

function deliverMails(from, receivers, subject, markdown, passenger) {
  var mailcomposer = new MailComposer({forceEmbeddedImages: true});

  R.forEach(function (receiver) {
    mailcomposer.setMessageOption({
      from:     from,
      to:       receiver,
      subject:  subject,
      markdown: markdown
    });

    mailcomposer.buildMessage(function (err, messageSource) {
      if (err) { throw err; }
      var mailgun = new Mailgun.Mailgun(passenger.auth.mailgunKey);
      mailgun.sendRaw(
        'TutorOnline - Bienvenido <ayuda@tutoronline.la>',
        receiver,
        messageSource,
        function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('messageSent');
          }
        }
      );
    });
  }, receivers);
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
      auth: {
        mailgunKey: mailOptions.auth.mailgunKey
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
