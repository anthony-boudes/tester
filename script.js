// Initialisez Cloudinary avec vos clés d'API
const cloudName = 'dbroalr1o';
const apiKey = '985892545156835';
const apiSecret = 'vffPabcZs1WR4NM0GELraGymLx0';
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

function addImage() {
  const input = document.getElementById('image-input');
  const file = input.files[0];

  if (file) {
    // Télécharger l'image sur Cloudinary
    cloudinary.v2.uploader.upload(file, { folder: 'gallery' }, function(error, result) {
      if (error) {
        console.error('Erreur lors du téléchargement :', error);
      } else {
        // Afficher l'image depuis Cloudinary
        const imageUrl = result.secure_url;
        displayImage(imageUrl);
      }
    });
  }
}

function displayImage(url) {
  const gallery = document.getElementById('image-gallery');

  const imageItem = document.createElement('div');
  imageItem.classList.add('image-item');

  const image = document.createElement('img');
  image.src = url;
  image.alt = 'Image ajoutée par l\'utilisateur';

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Supprimer';
  deleteBtn.addEventListener('click', function() {
    // Supprimer l'image de la galerie et de Cloudinary
    cloudinary.v2.api.delete_resources([url], { folder: 'gallery' }, function(error, result) {
      if (error) {
        console.error('Erreur lors de la suppression :', error);
      } else {
        gallery.removeChild(imageItem);
      }
    });
  });

  imageItem.appendChild(image);
  imageItem.appendChild(deleteBtn);
  gallery.appendChild(imageItem);
}
