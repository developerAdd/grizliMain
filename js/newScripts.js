const moreBlocks = document.querySelectorAll('.newsBlock')

moreBlocks.forEach(block => {
	const btn = block.querySelector('.newsBlock__btn')
	const content = block.querySelector('.newsBlock__content')
	let height = block.querySelector('.newsBlock__text-visible').scrollHeight

	content.style.maxHeight = height + 'px'
	window.addEventListener('resize', () => {
		let height = block.querySelector('.newsBlock__text-visible').scrollHeight
		if (!block.classList.contains('_more')) {
			content.style.maxHeight = height + 'px'
		} else {
			content.style.maxHeight = content.scrollHeight + 'px'
		}
	})
	btn.addEventListener('click', () => {
		block.classList.add('_more')
		content.style.maxHeight = content.scrollHeight + 'px'
	})
})

// какой скрипт должен быть для карты
// Возможно нужно указать свой путь к картинке в маркере

// ymaps.ready(initMap)

// function initMap() {
// 	var map = new ymaps.Map('map', {
// 		center: [55.706305851065245, 37.40264592855835],
// 		zoom: 14,
// 		behaviors: ['default'],
// 		controls: [],
// 	})
// 	var placemark = new ymaps.Placemark(
// 		[55.706305851065245, 37.40264592855835],
// 		{},
// 		{
// 			iconLayout: 'default#image',
// 			iconImageHref: '../Mobile/img/maker.png',
// 			iconImageSize: [55, 75],
// 			iconImageOffset: [-27, -55],
// 		}
// 	)
// 	map.geoObjects.add(placemark)
// }
