
let db = require('./config').db

db.once('open', function() {
  // we're connected!
  console.log('mongoose !!!');
});

module.export = db;
