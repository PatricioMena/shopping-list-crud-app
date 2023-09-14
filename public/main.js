const deleteProduct = document.querySelectorAll('.del-btn');

Array.from(deleteProduct).forEach((el) => el.addEventListener('click', deleteItem));

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
