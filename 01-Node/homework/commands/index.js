const fs = require('fs');
const request = require('request');

//refactoreo
const done = data => {
    process.stdout.write(data);
    process.stdout.write("\nprompt > ");
}


const date = () => {
    done(Date());
}

const pwd = () => {
    done(process.env.PWD)
}

const ls = () => {
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
          process.stdout.write(file.toString() + "\n");
        })
        process.stdout.write("prompt > ");
    });
}

const echo = (rest) => {
    let result = rest.join(' ');
    done(result);
}

const cat = (rest) => {
    fs.readFile(rest[0], function(err, data) {
        if (err) throw err;
        done(data);
    });
}

const head = (rest) => {
    fs.readFile(rest[0], 'utf-8', function(err, data) {
        if (err) throw err;
        const lines = data.split('\n');
        done(lines.slice(0, (rest[1] ? parseInt(rest[1]) : 10)).join('\n'));
    });
}

const tail = (rest) => {
    fs.readFile(rest[0], 'utf-8', function(err, data) {
        if (err) throw err;
        const lines = data.split('\n');
        done(lines.slice((rest[1] ? parseInt(rest[1]) : 10) * -1).join('\n'));
    });
}

const curl = (rest) => {
    request(rest[0], (err, res, body) => {
        if(err) throw err;
        done(body);
    });
}

module.exports = {
    ls,
    date,
    pwd,
    echo,
    cat,
    head,
    tail,
    curl
}