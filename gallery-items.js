const flowers = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const flowersArr = flowers.map(flower => flower.original);

const gallery = document.querySelector('.js-gallery');
const modalOpenEl = document.querySelector('.lightbox');
const modalCloseEl = document.querySelector('.lightbox');
const modalImgEl = document.querySelector('.lightbox__image');

const galleryMarkup = createPicturesCardsMarkup(flowers);
gallery.insertAdjacentHTML('beforeend', galleryMarkup);

gallery.addEventListener('click', onGalleryClick);
modalCloseEl.addEventListener('click', onModalClose);

function createPicturesCardsMarkup() {
  return flowers
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
                <a
                    class="gallery__link"
                    href="#"

                >
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
                </li>`;
    })
    .join('');
}

function onGalleryClick(ev) {
  const isGalleryPicEl = ev.target.classList.contains('gallery__image');

  if (!isGalleryPicEl) {
    return;
  }

  const currentPicUrl = ev.target.dataset.source;
  const currentPicAlt = ev.target.alt;
  modalOpenEl.classList.add('is-open');
  modalImgEl.src = currentPicUrl;
  modalImgEl.alt = currentPicAlt;

  window.addEventListener('keydown', onModalCloseEsc);
}

function onModalClose(ev) {
  if (
    !(onModalCloseOverlay(ev) || onModalCloseBtn(ev) || onModalCloseEsc(ev))
  ) {
    return;
  }
  modalOpenEl.classList.remove('is-open');
  modalImgEl.src = '#';
  modalImgEl.alt = '';
}

function onModalCloseOverlay(ev) {
  return ev.target.classList.contains('lightbox__overlay');
}

function onModalCloseBtn(ev) {
  return ev.target.classList.contains('lightbox__button');
}

function onModalCloseEsc(ev) {
  onChangePic(ev);

  if (ev.key === 'Escape') {
    modalOpenEl.classList.remove('is-open');
    modalImgEl.src = '#';
    modalImgEl.alt = '';

    window.removeEventListener('keydown', onModalCloseEsc);
  }

  // return ev.key === 'Escape';
}

function onChangePic(ev) {
  const currentPic = flowersArr.indexOf(`${modalImgEl.src}`);
  const tmp = flowersArr.length-1;

  if (ev.key === 'ArrowRight') {
    if ((currentPic === flowersArr.length-1)) {
      modalImgEl.src = flowersArr[0];
    } else {
      modalImgEl.src = flowersArr[currentPic + 1];
    }
  }
  if (ev.key === 'ArrowLeft') {
    if ((currentPic === 0)) {
      modalImgEl.src = flowersArr[tmp];
    } else {
      modalImgEl.src = flowersArr[currentPic - 1];
    }
  }
}
