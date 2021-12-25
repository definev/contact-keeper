const express = require('express');

const PORT = process.env.PORT || 1234;
const app = express();

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/contacts', require('./routes/contacts.js'));
app.use('/api/users', require('./routes/users.js'));

app.get('/', (_, res) => {
  res.json({
      error_code: '00',
      data: 'Welcome to contact keeper API ...'
  });
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
