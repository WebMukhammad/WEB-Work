class Person {
	static type = "PERSON"

	constructor (options) {
		this.name = options.name
		this.age = options.age
	}

	voice () {
		console.log(`The name: ${this.name}, The age: ${this.age}`)
	}
}


let person1 = new Person({name: 'Mukhammad', age: 20}) 


class Cat extends Person {
	static type = "CAT"

	constructor (options) {
		super(options)
		this.color = options.color
	}

	voice () {
		super.voice()
		console.log('The second console.log')
	}
}


class Component {
    static type = "COMPONENT"

    constructor (options) {
        this.selector = document.querySelector(options.selector)
    }

    hide () {
        this.selector.style.display = 'none'
    }

    show () {
        this.selector.style.display = 'inline'
    }
}

let component1 = new Component({selector: 'sasa'})


class Box extends Component {
    constructor (options) {
        super(options)
        this.selector.style.width = this.selector.style.height = options.size + 'px'
		this.color = options.color
    }
}