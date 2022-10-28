const commands = require('./commands');

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var [cmd, ...rest] = data.toString().trim().split(' '); // remueve la nueva línea
  (commands.hasOwnProperty(cmd)) ? commands[cmd](rest) : process.stdout.write('\nprompt > ');
});