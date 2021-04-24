function dispData() {
  fetch('https://final-project-server-3p9ru.ondigitalocean.app/api/v1/bookmarks')
      .then(response => response.json())
      .then(data => {

          let output = document.getElementById('myTable');

          for (let i = 0; i < data.length; i++) {
              console.log(data[i]);
              output.insertAdjacentHTML('beforeend', `
              
              <div class="btn-group dropend card-header">
                <div class="col-sm-11 col-md-11 col-lg-11 text-truncate"><i class="far fa-bookmark"> &nbsp;</i> ${data[i].title}</div>
               
                <button type="button" class="btn btn-dark" id="options" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-v"></i></button>

                <ul class="dropdown-menu">
                  <li><button type="button" class="dropdown-item text-white" data-bs-toggle="modal" data-bs-target="#editBookmarkModal" id="editButton-${i}"><span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>&nbsp Edit</button></li>                  
                  <li><button class="dropdown-item text-white" type="button" data-id="${data[i].uuid}" onclick="deleteQuestion(${data[i].uuid})"><span class="text-gradient"><i class="fas fa-trash-alt"></i></span>&nbsp  Delete</button></li>
                  <li><a href="${data[i].link}" class="btn dropdown-item text-white" target="_blank"  id="updateBtn" >Open page in new window</a></li>
                </ul>
              </div>
          `);
              document.getElementById(`editButton-${i}`).addEventListener("click", () => {
                editFormLoader(data[i].uuid, data[i].title, data[i].link);
              });
          }
      });
}

function resetForms() {
  document.getElementById('editForm').reset();
  document.getElementById('addForm').reset();

}

function editFormLoader (uuid, title, link) {
  document.getElementById(`bookName`).value = title ;
  document.getElementById('bookURL').value = link;

  document.getElementById('updateBookmark').addEventListener("click", () => updateBookmark(uuid))
}

const updateBookmark = (uuid) => {
  let title = document.getElementById(`bookName`).value;
  let link = document.getElementById('bookURL').value;

  let formData = {
    "uuid": uuid,
    "link": link,
    "title": title
  }

  if(title==""){
    alert("Please provide a name for the bookmark")
    return false;
  }else if(link==""){
    alert("Please provide a URL");
    return false;
  }else{
    if (confirm('Are you sure you want to edit the bookmark?')) {
        // Edit
        console.log('Bookmark edit with ID: ' + uuid);
        fetch('https://final-project-server-3p9ru.ondigitalocean.app/api/v1/bookmarks/edit/' + uuid, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then(response => response).then(data => {
        console.log(data);
        location.reload();
      });
      resetForms();
    }else {
          // skip
          console.log('Edit Cancelled');
      }
    }
    
  }


function deleteBookmark(uuid) {
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


const addBookmark = () => {
  let name = document.getElementById(`name`).value;
  let link = document.getElementById('url').value;

  let formData = {
    "link": link,
    "title": name,
  }

  if(name==""){
    alert("Please provide a name for the bookmark")
    return false;
  }else if(link==""){
    alert("Please provide a URL");
    return false;
  }else{
    if (confirm('Are you sure you want to save the bookmark?')) {
        // Edit
        console.log(formData);
        fetch('https://final-project-server-3p9ru.ondigitalocean.app/api/v1/bookmarks/create', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(response => response).then(data => {
        console.log(data);
      });
      alert("Bookmark Saved!!!")
      resetForms()
      location.reload();
    }else {
      console.log('Save Cancelled');
    }
  }
} 


function validURL(str) {
  let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}