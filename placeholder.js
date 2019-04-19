/* eslint-disable no-tabs */
/*
var getPosts = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => console.log(posts));
};
getPosts();
*/
/*
document.getElementById('getPosts').addEventListener('click', function () {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts) => {
      let output = document.getElementById('con');
      posts.forEach(function (p) {
        let newEle = document.createElement('h3');
        newEle.innerHTML = p.title;
        output.append(newEle);
      });
    });
});
*/

function loadPosts () {
  var postArticle = document.getElementById('post-article');
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach(function (p) {
        let newTitle = document.createElement('h2');
        newTitle.innerHTML = p.title;
        postArticle.append(newTitle);
        let newBody = document.createElement('p');
        newBody.innerHTML = p.body;
        // newBody.replace(/\n/g, '<br>');
        postArticle.append(newBody);
        let newButton = document.createElement('button');
        newButton.id = p.id;
        newButton.value = 'Show Comment';
        newButton.innerHTML = 'Show Comment';
        newButton.addEventListener('click', onClick);
        postArticle.append(newButton);
        let newSection = document.createElement('section');
        newSection.id = 'comments-' + p.id;
        postArticle.append(newSection);
      });
    });
}

function onClick () {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    .then((response) => response.json())
    .then((comments) => {
      for (let i = 1; i < 101; i++) {
        let sect = document.getElementById('comments-' + i);
        comments.forEach(function (c) {
          let newComment = document.createElement('p');
          newComment.id = c.id;
          newComment.innerHTML = c.body;
          sect.append(newComment);
          let newName = document.createElement('address');
          newName.href = 'mailto:' + c.email;
          newName.innerHTML = c.name;
          sect.append(newName);
        });
      }
    });
}

loadPosts();
