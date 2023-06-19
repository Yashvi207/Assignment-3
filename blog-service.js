const fs = require('fs');
const { resolve } = require('path');
const path = require("path");

let posts = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "./data", "./data/posts.json"), 'utf8', (err, data) => {
            if (err) {
              reject("Unable to read posts file");
            }
            posts = JSON.parse(data);
            fs.readFile(path.join(__dirname, "./data", "./data/categories.json"), 'utf8', (err, data) => {
                if (err) {
                  reject("Unable to read categories file");
                }
                categories = JSON.parse(data);
                resolve();
              });
          });
    })
}

function getAllPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject("No results returned");
        } else {
            resolve(posts);
        }
    })
}

function getPublishedPosts() {
    return new Promise((resolve, reject) => {
        let pubPosts = [];
        posts.forEach((post) => {
            if (post.published === true) {
                pubPosts.push(post);
            }
        })

        if (pubPosts.length > 0) {
            resolve(pubPosts);
        } else {
            reject("No results returned");
        }
    })    
}

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("No results returned");
        } else {
            resolve(categories);
        }
    })
}

function addPost(postData) {
    return new Promise((resolve, reject) => {
        if (postData.published === undefined) {
            postData.published = false;
        } else {
            postData.published = true;
        }
    
        // Setting the next post id
        postData.id = posts.length + 1;
    
        // Adding to posts
        posts.push(postData);
        resolve(postData);
    })
}

function getPostById(id) {
    return new Promise((resolve, reject) => {
        const FilPosts = posts.filter(post => post.id == id);
        const UniPosts = FilPosts[0];

        if (UniPosts) {
            resolve(UniPosts);
        }
        else {
            reject("no result returned");
        }
    })
}

function getPostsByCategory(category) {
    return new Promise((resolve, reject) => {
        const FilPosts = posts.filter(post => post.category == category);

        if (FilPosts.length > 0) {
            resolve(FilPosts);
        } else {
            reject("no results returned");
        }
    })
}

function getPostsByMinDate(minDate) {
    return new Promise((resolve, reject) => {
        const FilPosts = posts.filter(post => new Date(post.postDate) >= new Date(minDate));

        if (FilPosts.length > 0) {
            resolve(FilPosts);
        } else {
            reject("no results returned");
        }
    })
}
    

module.exports = { 
    initialize, 
    getAllPosts, 
    getPublishedPosts, 
    getCategories, 
    addPost, 
    getPostById,
    getPostsByCategory,
    getPostsByMinDate
};