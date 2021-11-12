const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_CONTENT = '<img src="img/muffin-grey.svg" width="40" height="44" alt="Аватар пользователя">';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

const setPreview = (fileChooser, preview) => {

  fileChooser.addEventListener('change', () => {

    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const image = document.createElement('img');
        image.src = reader.result;
        image.width = 40;
        image.height = 44;
        preview.style.display = 'flex';
        preview.style.alignItems = 'center';
        preview.style.padding = '0 15px';
        preview.textContent = '';
        preview.appendChild(image);
      });
      reader.readAsDataURL(file);
    }
  });
};

const resetImages = () => {
  photoPreview.textContent = '';
  avatarPreview.innerHTML = DEFAULT_AVATAR_CONTENT;
};

setPreview(avatarChooser, avatarPreview);
setPreview(photoChooser, photoPreview);

export {resetImages};
