document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	initModal()
})

const initModal = () => {
	const triggers = document.querySelectorAll('[data-modal]')
	const modals = document.querySelectorAll('[data-modal-id]')

	if (!triggers.length || !modals.length) return

	const modalMap = new Map()
	modals.forEach(modal => modalMap.set(modal.dataset.modalId, modal))

	const open = (modal) => {
		modal.classList.remove('is-hidden')
		document.body.style.overflow = 'hidden'
	}

	const close = (modal) => {
		modal.classList.add('is-hidden')
		document.body.style.overflow = ''
	}

	triggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
			const modalId = trigger.dataset.modal
			const modal = modalMap.get(modalId)

			if (modal) open(modal)
		})
	})

	modals.forEach(modal => {
		modal.addEventListener('click', (e) => {
			if (!e.target.closest('.popup-inner')) close(modal)
		})
	})

	document.addEventListener('keydown', (e) => {
		if (e.key !== 'Escape') return

		modals.forEach(modal => {
			if (!modal.classList.contains('is-hidden')) close(modal)
		})
	})

	document.querySelectorAll('[data-modal-close]').forEach(btn => {
		btn.addEventListener('click', () => {
			const modal = btn.closest('[data-modal-id]')
			if (modal) close(modal)
		})
	})
}