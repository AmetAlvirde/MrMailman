# Mr. Mailman

Mr. Mailman will deliver all your emails in your stead as
long as you ask him politely, with the proper manners,
like so:

```javascript
{
  auth: {
    mailgunKey: 'your-mailgun-key'
  },
  content: {
    from:        'MrMailman',
    receivers:   ['your@lovely.inbox'],
    replaces:    [{'<<0>>': 'Mr.Mailman'}, {'<<1>>': 'hello'}],
    subject:     'MrMailman Greetings',
    templateURL: './hola.html'
  }
};
```

Mr.Mailman uses mailgun and html templates to send your mails.
