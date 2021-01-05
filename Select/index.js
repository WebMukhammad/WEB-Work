
function getTemplate (data = [], placeholder, currentItem) {
	let list = data.map(item => {
		let cls = item.id === currentItem.id ? 'selected' : ''
			return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`
		}).join('')

	const text = currentItem.value || placeholder || 'Выбери пункт'

	return `
	    <div class="select__input" data-type="input">
	      <span data-type="value">${text}</span>
	      <i class="fa fa-chevron-down" data-type="arrow"></i>
	    </div>
	    <div class="select__dropdown">
		    <ul class="select__list">
		       ${list}
		    </ul>
	    </div>
	`
}

class Select {
	constructor(selector, options) {	
		this.$el = document.querySelector(selector)
		this.options = options 
		this.selectedID = options.selectedID
		this.#render()
		this.#setup()
	}

	#render() {
		const { placeholder, data, selectedID } = this.options
		this.$el.classList.add('select')
		this.$el.innerHTML = getTemplate(data, placeholder, this.current)
	}

	#setup() {
		this.clickHandler = this.clickHandler.bind(this)
		window.requestAnimationFrame(() => {
			this.$el.addEventListener('click', this.clickHandler)
		})
		this.$arrow = this.$el.querySelector('[data-type="arrow"]')
		this.$value = this.$el.querySelector('[data-type="value"]')
	}

	clickHandler(event) {
		const { type } = event.target.dataset
		if (type === 'input') {
			this.toggle()
		} else if (type === 'item') {
			const { id } = event.target.dataset
			this.select(id)
		}
	}

	select(id) {
		this.selectedID = id
		this.$value.textContent = this.current.value
		Array.from(this.$el.querySelectorAll(`[data-id]`)).map(item => item.classList.remove('selected'))
		this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
		this.close()
		this.options.onSelected ? this.options.onSelected(this.current) : null
	}

	get current() {
		return this.options.data.find(item => item.id === this.selectedID.toString())
	}

	get isOpen() {
		return this.$el.classList.contains('open')
	}

	toggle() {
		this.isOpen ? this.close() : this.open()
	}

	open() {
		this.$el.classList.add('open')
		this.$arrow.classList.remove('fa-chevron-down')
		this.$arrow.classList.add('fa-chevron-up')
	}

	close() {
		this.$el.classList.remove('open')
		this.$arrow.classList.add('fa-chevron-down')
		this.$arrow.classList.remove('fa-chevron-up')
	}
}

let select = new Select('#select', {
	selectedID: 1,
	data: [
	    {id: '1', value: 'Махачкала'},
	    {id: '2', value: 'Каспийск'},
	    {id: '3', value: 'Хасавюрт'},
	    {id: '4', value: 'Избербаш'}
	],
	onSelected(item) {
		console.log('Selected Item:', item)
	}
})

window.s = select