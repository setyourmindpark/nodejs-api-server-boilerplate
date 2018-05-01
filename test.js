const prompt = require('prompt');


// Start the prompt
//
prompt.start();

//
// Get two properties from the user: username and password
//
prompt.get([{
    name: '실행',
    required: true
}, {
    name: 'password',
    hidden: true,
    conform: function (value) {
        return true;
    }
}], (err, result) => {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  password: ' + result.password);
});