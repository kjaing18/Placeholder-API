
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
        newBody.innerHTML.replace(/\n/g, '<br>');
        postArticle.append(newBody);
        let newButton = document.createElement('button');
        newButton.id = p.id;
        newButton.value = '0';
        newButton.innerHTML = 'Show Comment';
        newButton.addEventListener('click', onClick);
        postArticle.append(newButton);
        let newSection = document.createElement('section');
        newSection.id = 'comments-' + p.id;
        newSection.style.display = 'none';
        postArticle.append(newSection);
        let commentHead = document.createElement('h3');
        commentHead.innerHTML = 'Comments';
        newSection.append(commentHead);
      });
    });
}

function onClick () {
  let buttonId = this.id;
  let sect = document.getElementById('comments-' + buttonId);
  let buttonVal = parseInt(this.value, 10);
  if (buttonVal === 0) {
    buttonVal++;
    this.value = buttonVal.toString();
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then((response) => response.json())
      .then((comments) => {
        comments.forEach(function (c) {
          let newComment = document.createElement('p');
          newComment.id = 'com' + c.id;
          newComment.innerHTML = c.body;
          newComment.innerHTML.replace(/\n/g, '<br>');
          sect.append(newComment);
          let newName = document.createElement('address');
          newName.href = 'mailto:' + c.email;
          newName.innerHTML = c.name;
          sect.append(newName);
        });
      });
    document.getElementById(buttonId).innerHTML = 'Hide Comment';
    document.getElementById('comments-' + buttonId).style.display = 'inline';
  } else {
    if (document.getElementById(buttonId).innerHTML === 'Hide Comment') {
      document.getElementById(buttonId).innerHTML = 'Show Comment';
      sect.style.display = 'none';
    } else {
      document.getElementById(buttonId).innerHTML = 'Hide Comment';
      sect.style.display = 'inline';
    }
  }
}

loadPosts();
