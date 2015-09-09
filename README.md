# Mr. Mailman

Mr. Mailman will deliver all your emails in your stead as
long as you ask him politely, with the proper manners,
like so:

```javascript
{
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
    template:    './hola.md'
  }
}
```
