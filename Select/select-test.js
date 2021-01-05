function getTemplate (data = [], placeholder, current) {

	const text = current.name || placeholder || 'Выберите пункт'
	const list = data.map(item => {
		let cls = item.id === current.id ? 'selected' : ''
		return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.name}</li>`
	}).join('')

	return `
		<div class="select__input">
	    	<span>${text}</span>
	    	<i class="fa fa-chevron-down"></i>
	    </div>
	    <div class="select__dropdown">
		    <ul class="select__list">${list}</ul>
    	</div>
    `
}

class Select {
	constructor(selector, options) {
		this.$el = document.querySelector(selector)
		this.options = options
		this.selectedID = options.selectedID
		this.render()
		this.#clickHandler()
	}

	render() {
		const { placeholder, data } = this.options
		this.$el.innerHTML = getTemplate(data, placeholder, this.current)
	}

	open() {
		this.$el.classList.add('open')
	}

	close() {
		this.$el.classList.remove('open')
	}

	get isActive () {
		return this.$el.classList.contains('open')
	}

	get current() {
		return this.options.data.find(item => item.id === this.selectedID)
	}

	toggle() {
		this.isActive ? this.close() : this.open()
	}

	#clickHandler(event) {
		window.requestAnimationFrame(() => {
			this.$el.addEventListener('click', (e) => {
				const {type} = e.target.dataset
				if (type === 'item') {
					const {id} = e.target.dataset
					this.selectedID = id
					this.render()
					Array.from(this.$el.querySelectorAll('[data-type="item"]')).map(item => item.classList.remove('selected'))
					this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
					this.options.onSelect ? this.options.onSelect(this.current) : null
				}
				this.toggle()
			})
		})
	}
}

let select = new Select('#select', {
	selectedID: '2',
	onSelect(item) {
		console.log('Вы выбрали', item)
	},
	data: [
		{name: 'Махачкала', id: '1'},
		{name: 'Каспийск', id: '2'},
		{name: 'Избербаш', id: '3'}
	]
})