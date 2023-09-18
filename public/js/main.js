const deleteProduct = document.querySelectorAll('.del-btn');
const minusBtn = document.querySelectorAll('.subtract-item-btn');
const plusBtn = document.querySelectorAll('.add-item-btn');
const itemQty = document.querySelectorAll('.item-qty');

Array.from(deleteProduct).forEach((el) => el.addEventListener('click', deleteItem));

Array.from(plusBtn).forEach((el) => el.addEventListener('click', addOne));

Array.from(minusBtn).forEach((el) => el.addEventListener('click', subtractOne));

// Disable subtract btn if qty = 0
Array.from(itemQty).forEach((item) => {
  if (Number(item.innerText) === 0) {
    const subBtn = item.parentNode.childNodes[5].childNodes[1];
    subBtn.classList.add('pointer-none');
  }
});

async function deleteItem() {
  const iName = this.parentNode.parentNode.childNodes[1].innerText;
  const cName = this.parentNode.parentNode.childNodes[3].innerText;

  try {
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemNameS: iName,
        categoryNameS: cName
      })
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addOne() {
  const iName = this.parentNode.parentNode.childNodes[1].innerText;
  const cName = this.parentNode.parentNode.childNodes[3].innerText;
  const iQty = Number(this.parentNode.parentNode.childNodes[7].innerText);

  try {
    const response = await fetch('plusOneItem', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemNameS: iName,
        categoryNameS: cName,
        itemQtyS: iQty
      })
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}

async function subtractOne() {
  const iName = this.parentNode.parentNode.childNodes[1].innerText;
  const cName = this.parentNode.parentNode.childNodes[3].innerText;
  const iQty = Number(this.parentNode.parentNode.childNodes[7].innerText);

  try {
    const response = await fetch('minusOneItem', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemNameS: iName,
        categoryNameS: cName,
        itemQtyS: iQty
      })
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.error(err);
  }
}
