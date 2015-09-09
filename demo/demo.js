/*jslint node: true, indent: 2*/
'use strict';

var MrMailman = require('../src/mr-mailman'),
  letter = {
    auth: {
      password: "DeArUb@Google2011@212",
      service:  "gmail",
      user:     "Amet.Alvirde"
    },
    content: {
      from:        'Amet Alvirde',
      receivers:   ['a.metalvirde@gmail.com'],
      replaces:    [{'<<0>>': 'Amet'}, {'<<1>>': 'hola'}],
      subject:     'Noticias súper secretas',
      templateURL: './hola.md'
    }
  };

MrMailman.deliver(letter);

console.log('DONE');

