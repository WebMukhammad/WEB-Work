	$.modal = function (options) {

		const modalNode = _createModal(options)
		let modalNodeWrap = document.querySelector('.modal__wrap')
		let modalNodeFooter = document.querySelector('.modal__footer')
		let closeModal = document.querySelector('.modal__close')

		function _createModal(options) {
			let node = document.createElement("div")
			node.classList.add('modal')
			let html = `
				<div class="modal__wrap" style="width: ${options.width || '380px'}">
					<div class="modal__header flex">
						<h2 class="modal__title">${options.title || ''}</h2>
						${options.closable ? '<span class="modal__close">X</span>' : ''}
					</div>
					<div class="modal__body">
						${options.content || ''}
					</div>
				</div>
			`
			node.insertAdjacentHTML('beforeend', html)
		    const footer = _createModalFooter(options.footerButtons)
		    node.querySelector('.modal__body').after(footer)
			document.body.appendChild(node)
			return node
		}

		function _createModalFooter(buttons = []) {
			if (buttons.length === 0) {
				return document.createElement('div')
			} else {
				let wrap = document.createElement('div')
				wrap.classList.add('modal__footer-buttons')
				buttons.forEach(btn => {
					let $btn = document.createElement('button')
					$btn.textContent = btn.text
					$btn.classList.add(btn.type)
					$btn.addEventListener('click', btn.handler)
					wrap.appendChild($btn)
				})
				return wrap
			}
		}

		function onWindowClick ({target}) {
			const isInsideModal = target.closest('.modal__wrap')
			if (!isInsideModal) {
				methods.close()
			}
		}

		let methods = {
			open () {
				modalNode.classList.add('modal_active')
				modalNodeWrap.classList.add('modal__wrap_active')
				window.requestAnimationFrame(() => window.addEventListener('click', onWindowClick))
			},
			close () {
				modalNode.classList.remove('modal_active')
				modalNodeWrap.classList.remove('modal__wrap_active')
				if (typeof options.onClose === 'function') {
					options.onClose()
				}
				window.removeEventListener('click', onWindowClick)
			}
		}

		window.requestAnimationFrame(() => {
			closeModal && closeModal.addEventListener('click', methods.close)
		})

		return Object.assign(methods, {
			destroy () {
				modalNode.remove()
				closeModal && closeModal.addEventListener('click', methods.close)
			},
			setContent (html) {
				return modalNodeWrap.querySelector('.modal__body').innerHTML = html
			}
		}) 
	}