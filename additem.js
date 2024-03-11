let addedItems = [];

document.addEventListener('DOMContentLoaded', () => {
  const addItemBtn = document.querySelector('#add-item-btn');
  addItemBtn.addEventListener('click', () => {
    const addItemPanel = document.querySelector('#add-item-panel');
    addItemPanel.classList.remove('hidden');
  });

  const addItemForm = document.querySelector('#add-item-form');
  addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = addItemForm.querySelector('#name').value;
    const price = addItemForm.querySelector('#price').value;
    const imageInput = addItemForm.querySelector('#image');
    const imageFile = imageInput.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;

      const newItem = {
        name,
        price,
        imageUrl
      };

      addedItems.push(newItem);

      const addItemPanel = document.querySelector('#add-item-panel');
      addItemPanel.classList.add('hidden');

      const newItemsContainer = document.createElement('div');
      newItemsContainer.classList.add('grid-cols-1', 'lg:grid-cols-2', 'gap-4');
      document.body.appendChild(newItemsContainer);

      const newItemElement = createItemElement(newItem);
      newItemsContainer.appendChild(newItemElement);

      localStorage.setItem('addedItems', JSON.stringify(addedItems));
      displayAddedItems();
    };

    if (imageFile) {
      imageInput.closest('.mb-4').querySelector('img').src = URL.createObjectURL(imageFile);
    }

    reader.readAsDataURL(imageFile);
  });

  const closeAddItemPanelBtn = document.querySelector('#close-add-item-panel-btn');
  closeAddItemPanelBtn.addEventListener('click', () => {
    const addItemPanel = closeAddItemPanelBtn.closest('#add-item-panel');
    addItemPanel.classList.add('hidden');
  });

  const addedItemsFromStorage = localStorage.getItem('addedItems');
  if (addedItemsFromStorage) {
    addedItems = JSON.parse(addedItemsFromStorage);
    displayAddedItems();
  }
});

function createItemElement(item) {
  const itemElement = document.createElement('div');
  itemElement.classList.add('border-2', 'lg:flex', 'px-5', 'py-5');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('flex-shrink-0');

  const itemImage = document.createElement('img');
  itemImage.src = item.imageUrl;
  itemImage.alt = '';

  imageContainer.appendChild(itemImage);

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('pl-4');

  const ratingDiv = document.createElement('div');
  ratingDiv.classList.add('rating');

  const nameDiv = document.createElement('div');
  nameDiv.textContent = item.name;

  const priceDiv = document.createElement('div');
  priceDiv.textContent = `Price - $${item.price}`;

  infoContainer.appendChild(ratingDiv);
  infoContainer.appendChild(nameDiv);
  infoContainer.appendChild(priceDiv);

  itemElement.appendChild(imageContainer);
  itemElement.appendChild(infoContainer);

  return itemElement;
}

function displayAddedItems() {
  addedItems.forEach(item => {
    const newItemsContainer = document.createElement('div');
    newItemsContainer.classList.add('grid-cols-1', 'lg:grid-cols-2', 'gap-4');
    document.body.appendChild(newItemsContainer);

    const newItemElement = createItemElement(item);
    newItemsContainer.appendChild(newItemElement);
  });
}