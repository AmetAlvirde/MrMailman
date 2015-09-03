# MrMailman

Mr. Mailman will send all your emails in your stead as
long as you ask him politely, with the proper manners,
like so:

```javascript
{
  auth: {
    user: "user",
    password: "password",
    service: "service@host.com"
  },
  content: {
    templateURL: 'path/to/markdown',
    replaces:   [{$0: 'Mr.'}, {$1: 'Alvirde'}...],
    subject:    'the subject'
  },
  receivers: ['hola@gmail.com'...]
}
```
