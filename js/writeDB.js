function resetAddForm() {
  document.getElementById('addform').reset();
}

const addQuestion = () => {
  let tags = document.getElementById('tags').value;
  let name = document.getElementById(`name`).value;
  let link = document.getElementById('url').value;

  let formData = {
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
    if (confirm('Are you sure you want to save the bookmark?')) {
        // Edit
        console.log(formData);
        fetch('https://final-project-server-3p9ru.ondigitalocean.app/bookmarks/create', {
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
      resetAddForm()
    }else {
      console.log('Save Cancelled');
    }
  }
} 
