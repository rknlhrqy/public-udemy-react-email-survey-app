
const fetchAlbums = () => {
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(response => response.json())
    .then(json => console.log(json));
};

fetchAlbums();

const fetchAlbumsAsync = async () => {
  const response = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
  const json = await response.json();
  console.log(json);
};

fetchAlbumsAsync();
