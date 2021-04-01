function checkEdit(){
  let uuid = document.getElementById("bookId").value;
  let tags = document.getElementById('tags').value;
  let name = document.getElementById(`name`).value;
  let link = document.getElementById('url').value;

  let formData = {
    "uuid": uuid,
    "link": link,
    "title": name,
    "publisher": tags
  }

  if(name==""){
    alert("Please provide a name for the bookmark")
    return false;
  }else if(link==""){
    alert("Please provide a URL");
    return false;
  }else{
    if (confirm('Are you sure you want to edit the bookmark?')) {
        // Edit
        console.log('Bookmark edit with ID: ' + uuid);
        fetch('' + uuid, {
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
      resetEditForm();
    }else {
          // skip
          console.log('Edit Cancelled');
      }
    }
    
  }

function resetEditForm() {
  document.getElementById('editform').reset();
}
