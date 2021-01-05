	let listEl = [
		{ id: 1, title: 'Яблоки', price: '100 рублей кг.' },
		{ id: 2, title: 'Апельсины', price: '150 рублей кг.' },
		{ id: 3, title: 'Персики', price: '200 рублей кг.' }
	]

	let modal

	let html = item => `
		<div class="item">
			<div class="item__text">${item.title}</div>
			<div class="item__buttons">
				<div class="item__button item__button_blue" data-price="price" data-id="${item.id}">Посмотреть</div>
				<div class="item__button item__button_red" data-delete="delete" data-id="${item.id}">Удалить</div>
			</div>
		</div>
	`

	function render(items) {
		document.querySelector('.items').innerHTML = items.map(html).join('')
	}

	render(listEl)

	window.requestAnimationFrame(() => {
		document.addEventListener('click', e => {
			if(e.target.dataset.price === 'price') {
				modal = $.modal(list)
				let id = +e.target.dataset.id
				let item = listEl.filter(el => el.id === id)[0].price
				modal.setContent(`<p>Цена товара: <b>${item}</b> </p>`)
				modal.open()
			} else if(e.target.dataset.delete === 'delete') {
				let id = +e.target.dataset.id
				let item = listEl.filter(el => el.id === id)[0]
				 $.confirm({
			      title: 'Вы уверены?',
			      content: `<p>Вы удаляете фрукт: <strong>${item.title}</strong></p>`
			    }).then(() => {
			      listEl = listEl.filter(f => f.id !== id)
			      render(listEl)
			    }).catch(() => {})
			}
		})
	})

	let list = {
		title: 'Информация о товаре',
		closable: true, 
	    onClose() {
	      modal.destroy()
	    },
		footerButtons: [
			{
				text: 'Отмена', 
				type: 'item__button', 
				handler() {
					modal.close()
				}
			},
			{
				text: 'Подтвердить', 
				type: 'item__button', 
				handler() {
					modal.close()
				}
			}
		]
	}