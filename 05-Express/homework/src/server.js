// const bodyParser = require("body-parser");
const e = require("express");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
let id = 0;

server.post('/posts', (req, res) => {
    const {author, title, contents} = req.body;
    if(author && title && contents){
        let post = {author, title, contents, id: ++id};
        posts.push(post);
        res.status(200).json(post);
    } else {
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
});

server.post('/posts/author/:author', (req, res) => {
    const {title, contents} = req.body;
    const {author} = req.params;
    if(!title || !contents || !author){
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    } else{
        let post = {author, title, contents, id: ++id};
        posts.push(post);
        res.status(200).json(post);
    }
});

server.get('/posts', (req, res) => {
    const {term} = req.query;
    if(term){
        let result = posts.filter(e => {
            if(e.title.includes(term) || e.contents.includes(term)) return e
        });
        res.status(200).json(result);
    } else {
        res.status(200).json(posts);
    }
});

server.get('/posts/:author', (req, res) => {
    const {author} = req.params;
    if(author){
        let result = posts.filter(e => {
            if(e.author === author) return e
        })
        if(result.length) res.status(200).json(result);
        else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
    } else {
        res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post del autor indicado"});
    }
});

server.get('/posts/:author/:title', (req, res) => {
    const {author, title} = req.params;
    if(author && title){
        let result = posts.filter(e => {
            if(e.author === author && e.title === title) return e
        });
        if(result.length) res.status(200).json(result);
        else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
    } else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
});

server.put('/posts', (req, res) => {
    const {id, title, contents} = req.body;
    if(!id || !title || !contents) res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    else{
        if(id){
            let post = posts.find(e => e.id === parseInt(id));
            if(post){
                post.title = title;
                post.contents = contents;
                res.status(200).json(post);
            }
            else res.status(STATUS_USER_ERROR).json({error: 'No existe ningun post con dicho id indicado'});
        } else {
            res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
        }
    }
});

server.delete('/posts', (req, res) => {
    const {id} = req.body;
    if(!id) res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para eliminar el Post"});
    let size = posts.length;
    posts = posts.filter(post => post.id !== id);
    if(size === posts.length) res.status(STATUS_USER_ERROR).json({error: 'No existe ningun post con dicho id indicado'});
    res.status(200).json({success: true});
});

server.delete('/author', (req, res) => {
    const {author} = req.body;
    if(!author) res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para eliminar los Posts"});
    let result = posts.filter(post => post.author === author);
    if(!result.length) res.status(STATUS_USER_ERROR).json({error: 'No existe el autor indicado'});
    posts = posts.filter(post => post.author !== author);
    res.status(200).json(result)
})

module.exports = { posts, server };
