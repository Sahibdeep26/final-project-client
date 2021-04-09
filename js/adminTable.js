function dispData() {
  fetch('https://final-project-server-3p9ru.ondigitalocean.app/api/v1/bookmarks')
      .then(response => response.json())
      .then(data => {

          let output = document.getElementById('myTable');

          for (let i = 0; i < data.length; i++) {
              console.log(data[i]);
              output.insertAdjacentHTML('beforeend', `
              <tr>
              <th scope="row">${data[i].uuid}</th>
              <td>${data[i].publisher}</td>
              <td>${data[i].title}</td>
              <td>${data[i].link}</td>
              <td>
                <a href = "../editQuestion.html" class="btn border-shadow update" id="updateBtn" data-id="${data[i].uuid}" onclick='editFormLoader("${data[i].uuid}", "${data[i].publisher}", "${data[i].title}", "${data[i].link}")'>
                  <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
                </a>
                <a class="btn border-shadow delete"  id="deleteBtn" data-id="${data[i].uuid}" onclick="deleteQuestion(${data[i].uuid})">
                  <span class="text-gradient"><i class="fas fa-trash-alt"></i></span>
                </a>
              </td>
            </tr>
          `);
          }
      });

}

const editFormLoader = (uuid, publisher,title,link) => {

  console.log(uuid, publisher, title, link)
  
  document.getElementById('bookId').value = uuid;
  document.getElementById('tags').value = publisher
  document.getElementById('name').value = title
  document.getElementById('link').value= link
}

function deleteQuestion(uuid) {
  if (confirm('Are you sure you want to delete the question?')) {
      // Delete!
      console.log('Question deleted with ID: ' + uuid);
      fetch('https://final-project-server-3p9ru.ondigitalocean.app/api/v1/bookmarks/' + uuid, {
          method: 'delete',
          mode: 'cors',
          cache: 'no-cache'
      }).then(response => response).then(data => {
          console.log(data);
          location.reload();
      });
  } else {
      // skip
      console.log('Delete Cancelled');
  }
}

