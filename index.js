'use strict';

//convert store array into object.

  const STORE = {
    items:
    [
      {name: "apples", checked: false},
      {name: "oranges", checked: false},
      {name: "milk", checked: true},
      {name: "bread", checked: false}
    ],
    hideCheckedItems: false
  }

  //STEP 1 keep a value in our STORE that represents whether or not the hidden items are showing, hideCheckedItems.

  //STEP 2 we have a checkbox that can toggle itemsHidden to true. Toggle, meaning it can go true or false between check or uncheck. It will change the value.

  //we have a value that represents whether or not we want to hide things, and we have a checkbox that can change that value. When that hideCheckedItems is true, we want to remove all elements with the checked property of true. Line 13 refers to whether or not checked items are visible.

  //STEP 3 when you add or delete something, you re-render. so when you check or uncheck you re-render with the things you want to show. It's temporary. We still want to keep our items. We don't want to delete them. We simply want to render the page without them, but they should still exist.

function generateItemElement(item, itemIndex, template) {
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

function generateShoppingItemsString(shoppinglist){
  console.log("Generating shopping list element");

  const items = shoppinglist.map((item, index) => generateItemElement(item, index));

  return items.join("");
}

function renderShoppingList() {

  console.log('`renderShoppingList` ran');
  //here we are rendering the STORE items. Figure out how to subtract (or not render) those items that are checked hidden.
  //if checked, console.log("hidden"). if not checked, then console.log("not hidden")
  console.log(STORE.hideCheckedItems);
  if (STORE.hideCheckedItems === true) {
    console.log("We're hidden!");
    //render the page without the checked items.

  } else if (STORE.hideCheckedItems === false) {
    console.log("Not hidden!");
  }
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  console.log('`handleNewItemSubmit` ran');
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteListItem(itemIndex) {
  console.log("Deleting property for item at index " + itemIndex);
  //need to convert STORE from array to object.
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}


//when click on checkbox, something happens. console.log or something. $(checkbox).on('click')
//how to change(Toggle that property)

//when you click something, all it does and change the store. the renderShoppingList() method simply takes the STORE and makes the right page for it.

function handleCheckboxClick() {
$('.checkbox').on('click',  event => {
  STORE.hideCheckedItems = !STORE.hideCheckedItems;
  renderShoppingList();
  });
}


function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCheckboxClick();
}


$(handleShoppingList);
