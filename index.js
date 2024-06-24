const NO_IMAGE_URL = './no_image.png';
const root = document.getElementById('root');

root.appendChild(MainComponent());

function MainComponent() {
  const container = document.createElement('div');
  container.className = 'container';
  container.appendChild(WeaponListComponent(weapons));

  return container;
}

function ModalWrapper(children) {
  document.body.style.overflow = 'hidden';

  function closeModal() {
    document.body.style.overflow = 'unset';
    root.removeChild(modal);
  }

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.addEventListener('click', closeModal);

  const modalWrapper = document.createElement('div');
  modalWrapper.className = 'modal-wrapper';
  modal.appendChild(modalWrapper);

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.addEventListener('click', (e) => e.stopPropagation());
  modalContent.appendChild(children);
  modalWrapper.appendChild(modalContent);

  return modal;
}

function SelectedWeaponComponent(weapon) {
  const container = document.createElement('div');
  container.className = 'selected_weapon__container';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'selected_weapon__image_container';
  container.appendChild(imageContainer);

  const image = document.createElement('img');
  image.className = 'selected_weapon__image';
  image.src = weapon.imgUrl || NO_IMAGE_URL;
  image.alt = weapon.name;
  image.addEventListener('error', imageErrorHandler);
  imageContainer.appendChild(image);

  const info = document.createElement('div');
  info.className = 'selected_weapon__info';
  container.appendChild(info);
  
  const name = document.createElement('h5');
  name.className = 'selected_weapon__name';
  name.innerHTML = weapon.name;
  info.appendChild(name);

  const description = document.createElement('p');
  description.className = 'selected_weapon__description';
  description.innerHTML = weapon.description;
  info.appendChild(description);

  return container;
}

function WeaponListComponent(weapons) {
  const container = document.createElement('div');
  container.className = 'weapon_list__container';

  weapons.forEach(weapon => {
    container.appendChild(WeaponComponent(weapon));
  });

  return container;
}

function WeaponComponent(weapon) {
  function handleClick(e) {
    root.appendChild(ModalWrapper(SelectedWeaponComponent(weapon)));
  }

  const container = document.createElement('div');
  container.className = 'weapon__container';

  const image = document.createElement('img');
  image.className = 'weapon__image';
  image.src = weapon.imgUrl || NO_IMAGE_URL;
  image.alt = weapon.name;
  image.addEventListener('error', imageErrorHandler);
  container.appendChild(image);

  const info = document.createElement('div');
  info.className = 'weapon__info';
  container.appendChild(info);
  
  const name = document.createElement('h5');
  name.className = 'weapon__name';
  name.innerHTML = weapon.name;
  info.appendChild(name);

  const description = document.createElement('p');
  description.className = 'weapon__description';
  description.innerHTML = weapon.description;
  info.appendChild(description);

  const selectButton = document.createElement('button');
  selectButton.className = 'weapon__select_button';
  selectButton.innerHTML = 'select';
  selectButton.addEventListener('click', handleClick);
  container.appendChild(selectButton);

  return container;
}

function imageErrorHandler(e) {
  e.target.src = NO_IMAGE_URL;
}