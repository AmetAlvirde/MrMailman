/*jslint node: true, indent: 2*/
'use strict';

var MrMailman = require('../src/mr-mailman'),
  letter = {
    auth: {
      password: "Password",
      service:  "Service (e.g. Gmail)",
      user:     "Mail"
    },
    content: {
      from:        'MrMailman',
      receivers:   ['your@lovely.inbox'],
      replaces:    [{'<<0>>': 'Mr.Mailman'}, {'<<1>>': 'hello'}],
      subject:     'MrMailman Greetings',
      templateURL: './hola.md'
    }
  };

MrMailman.deliver(letter);

