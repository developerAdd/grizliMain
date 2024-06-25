AOS.init({
	once: true,
})

const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const body = document.querySelector('body')

burger.addEventListener('click', () => {
	if (burger.classList.toggle('_remove')) {
		nav.classList.add('_show')
		header.classList.add('_menu')
		disableScroll()
	} else {
		nav.classList.remove('_show')
		header.classList.remove('_menu')
		enableScroll()
	}
})

const enableScroll = () => {
	const fixBlocks = document?.querySelectorAll('.fixed-block')
	const body = document.body
	const pagePosition = parseInt(body.dataset.position, 10)
	fixBlocks.forEach(el => {
		el.style.paddingRight = '0px'
	})
	body.style.paddingRight = '0px'

	body.style.top = 'auto'
	body.classList.remove('dis-scroll')
	window.scroll({
		top: pagePosition,
		left: 0,
	})
	body.removeAttribute('data-position')
}

const disableScroll = () => {
	const fixBlocks = document?.querySelectorAll('.fixed-block')
	const pagePosition = window.scrollY
	const paddingOffset = `${window.innerWidth - body.offsetWidth}px`

	fixBlocks.forEach(el => {
		el.style.paddingRight = paddingOffset
	})
	body.style.paddingRight = paddingOffset
	body.classList.add('dis-scroll')
	body.dataset.position = pagePosition
	body.style.top = `-${pagePosition}px`
}
ymaps.ready(initMap)

function initMap() {
	var map = new ymaps.Map('map', {
		center: [55.706305851065245, 37.40264592855835],
		zoom: 14,
		behaviors: ['default'],
		controls: [],
	})
	var placemark = new ymaps.Placemark(
		[55.706305851065245, 37.40264592855835],
		{},
		{
			iconLayout: 'default#image',
			iconImageHref: '../img/maker.png',
			iconImageSize: [55, 75],
			iconImageOffset: [-27, -55],
		}
	)
	map.geoObjects.add(placemark)
}
const videos = document.querySelectorAll('.video')
const players = [] // Массив для хранения всех плееров

// Функция для проверки, находится ли элемент в видимой области
function isElementInViewport(el) {
	const rect = el.getBoundingClientRect()
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	)
}
// let isTrigger = true
// function startFirstVideo(video) {
// 	function videoHandler() {
// 		video.playVideo()
// 		clearInterval(handler)
// 		startInterval()
// 		isTrigger = false
// 	}
// 	if (isTrigger) {
// 		window.addEventListener('scroll', videoHandler)
// 	} else {
// 		window.removeEventListener('scroll', videoHandler)
// 	}
// 	triggerFakeScroll()
// }
videos.forEach(video => {
	window.YT.ready(function () {
		let player // Variable to store the current video player
		let isFirstVideo = true // Flag to track if it's the first video

		// Create Intersection Observer
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// If element is visible
					if (!player) {
						// If player is not yet created
						player = createPlayer(video)
						if (isFirstVideo) {
							console.log('s')
							window.addEventListener('scroll', () => {
								if (isFirstVideo) {
									player.playVideo()
									isFirstVideo = false
								}
							})
						} else {
						}
					} else {
						// If player is already created
						player.playVideo()
					}
				} else {
					// If element is not visible
					if (player) {
						player.pauseVideo()
					}
				}
			})
		})

		// Observe current video element
		observer.observe(video)
	})
})

// Function to create a YouTube player for the given video element
function createPlayer(video) {
	const progressBar = video.querySelector('.progress__bar')
	const progressValue = video.querySelector('.progress__value')
	const pause = video.querySelector('.pause')
	const poster = video.querySelector('.poster')
	const iframe = video.querySelector('iframe')

	let item
	let progressVideo
	let allTime
	let handler

	const currentPlayer = new YT.Player(iframe.id, {
		events: {
			onReady: event => {
				allTime = currentPlayer.getDuration()
				item = progressBar.scrollWidth / allTime
				progressVideo = item * 10 // Adjust as needed
				poster.classList.add('_hide')
				progressValue.style.width = `${progressVideo}px`
				startInterval()
			},
			onStateChange: event => {
				if (event.data === YT.PlayerState.ENDED) {
					currentPlayer.seekTo(12, true)
				}
				clearInterval(handler)
				if (event.data === YT.PlayerState.PLAYING) {
					startInterval()
				}
			},
		},
	})

	progressBar.addEventListener('click', e => {
		const rect = progressBar.getBoundingClientRect()
		const x = e.clientX - rect.left
		progressVideo = x
		progressValue.style.width = `${progressVideo}px`
		currentPlayer.seekTo(x / item, true)
	})

	pause.addEventListener('click', () => {
		if (currentPlayer.isMuted()) {
			currentPlayer.unMute()
			pause.classList.add('_hide')
		} else {
			currentPlayer.mute()
			pause.classList.remove('_hide')
		}
	})

	function startInterval() {
		handler = setInterval(() => {
			progressVideo += item
			if (progressVideo / item > allTime) {
				progressVideo = item * 12
				currentPlayer.seekTo(12, true)
			}
			progressValue.style.width = `${progressVideo}px`
		}, 1000)
	}

	return currentPlayer
}
function triggerFakeScroll() {
	window.scrollTo(0, 1)
	setTimeout(() => {
		window.scrollTo(0, 0)
	}, 1000)
}
document.addEventListener('DOMContentLoaded', triggerFakeScroll)
const itemsGallery = document.querySelectorAll('.product-block__tab-item')

if (itemsGallery.length > 0) {
	for (const itemGallery of itemsGallery) {
		const swiperElem1 = itemGallery.querySelector('.mySwiper')
		const swiperElem2 = itemGallery.querySelector('.mySwiper2')
		const swiperArrowRight = itemGallery.querySelector(
			'.product__slider__arrow.__next'
		)
		const swiperArrowLeft = itemGallery.querySelector(
			'.product__slider__arrow.__prev'
		)

		var swiper = new Swiper(swiperElem1, {
			spaceBetween: 10,
			slidesPerView: 3.5,
			freeMode: true,
			watchSlidesProgress: true,
		})
		var swiper2 = new Swiper(swiperElem2, {
			spaceBetween: 22,
			navigation: {
				nextEl: swiperArrowRight,
				prevEl: swiperArrowLeft,
			},
			thumbs: {
				swiper: swiper,
			},
		})
	}
}
var swiperAbout = new Swiper('.about__slider .swiper', {
	slidesPerView: 1,
	loop: true,
	autoplay: {
		delay: 4800,
		disableOnInteraction: false,
	},
	navigation: {
		nextEl: '.about__btn._next',
		prevEl: '.about__btn._prev',
	},
	pagination: {
		el: '.about__pagintion',
		clickable: true,
	},
	autoHeight: true,
})
const lines = document.querySelectorAll('.about__lines .about__line')

if (lines.length > 0) {
	swiperAbout.on('slideChange', function () {
		if (lines !== null) {
			for (const line of lines) {
				line.classList.remove('_active')
			}
		}
		if (
			swiperAbout.activeIndex !== 1 &&
			swiperAbout.activeIndex !== lines.length + 1 &&
			swiperAbout.activeIndex !== 0
		) {
			lines[swiperAbout.activeIndex - 1].classList.add('_active')
		} else if (swiperAbout.activeIndex !== 0) {
			lines[0].classList.add('_active')
		} else {
			console.log('')
			lines[lines.length - 1].classList.add('_active')
		}
	})
	lines[0].classList.add('_active')
}

var swiperThing = new Swiper('.catalogsCategories__slider .swiper', {
	slidesPerView: 1,
	effect: 'creative',
	loop: true,
	loopedSlides: 3,
	creativeEffect: {
		limitProgress: 2,
		prev: {
			translate: ['-35%', 0, 0],
			opacity: 0.5,
			scale: 0.55,
		},
		next: {
			translate: ['35%', 0, 0],
			opacity: 0.5,
			scale: 0.55,
		},
	},
})

var swiperSale = new Swiper('.sale__thumb', {
	spaceBetween: 12,
	slidesPerView: 2,
	watchSlidesProgress: true,
	navigation: {
		nextEl: '.product__slider__arrow.__next',
		prevEl: '.product__slider__arrow.__prev',
	},
})
var swiperVideo = new Swiper('.sale__video', {
	spaceBetween: 22,
	slidesPerView: 1,
	autoHeight: true,
})
var swiperSaleThumb = new Swiper('.sale__slider', {
	spaceBetween: 22,
	slidesPerView: 1,
	autoHeight: true,
	thumbs: {
		swiper: swiperSale,
	},
	navigation: {
		nextEl: '.product__slider__arrow.__next',
		prevEl: '.product__slider__arrow.__prev',
	},
	on: {
		slideNextTransitionStart: function () {
			swiperVideo.slideNext()
		},
		slidePrevTransitionStart: function () {
			swiperVideo.slidePrev()
		},
	},
})

let buttonsCart = document.querySelectorAll('.site-btn-cart')
let countCart = 1
if (buttonsCart.length > 0) {
	let countCartElem = document.querySelector('.cart__count')
	for (const buttonCart of buttonsCart) {
		buttonCart.addEventListener('click', function () {
			const btnIcon = buttonCart.querySelector('.site-btn-icon').cloneNode(true)
			document.body.appendChild(btnIcon)

			const rect = buttonCart.getBoundingClientRect()

			btnIcon.style.position = 'fixed'
			btnIcon.style.top = rect.top + 'px'
			btnIcon.style.right =
				document.documentElement.scrollWidth - rect.right + 'px'
			countCart++
			setTimeout(() => {
				btnIcon.style.zIndex = '300'
				btnIcon.style.top = '12px'
				btnIcon.style.right = '0'
				btnIcon.style.transform = 'scale(.5)'
				btnIcon.style.opacity = '0'
				countCartElem.textContent = countCart
			}, 100)
			setTimeout(() => {
				btnIcon.remove()
			}, 1000)
		})
	}
}

const newsArticles = document.querySelectorAll('.news__article')
if (newsArticles.length > 0) {
	for (const newsArticle of newsArticles) {
		let link = newsArticle.querySelector('.news__link')
		if (link !== null) {
			link.addEventListener('click', e => {
				e.preventDefault()
				link.style.display = 'none'
				newsArticle.classList.add('__dark')
			})
		}
	}
}

document.querySelectorAll('.a-scroll').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
			top: 'start',
		})
	})
})

document.querySelectorAll('.serviceText__content').forEach(list => {
	list.nextElementSibling.firstElementChild.addEventListener(
		'click',
		function (e) {
			if (list.classList.toggle('_active')) {
				list.style.maxHeight = list.scrollHeight + 'px'
			} else {
				list.style.maxHeight = '82px'
			}
		}
	)
})

const galleryItems = document.querySelectorAll('.gallery__item')

if (galleryItems.length > 0) {
	for (const galleryItem of galleryItems) {
		galleryItem.addEventListener('click', () => {
			galleryItems.forEach(element => {
				element.classList.remove('_show')
			})
			galleryItem.classList.add('_show')
		})

		const galleryItemSlider = galleryItem.querySelector('.gallery__slider')
		const galleryItemSliderNext = galleryItem.querySelector(
			'.product__slider__arrow.__next'
		)
		const galleryItemSliderPrev = galleryItem.querySelector(
			'.product__slider__arrow.__prev'
		)
		const galleryItemSliderPagination =
			galleryItem.querySelector('.slider-pagination')

		var swiperVideo = new Swiper(galleryItemSlider, {
			spaceBetween: 5,
			slidesPerView: 1,
			navigation: {
				nextEl: galleryItemSliderNext,
				prevEl: galleryItemSliderPrev,
			},
			pagination: {
				el: galleryItemSliderPagination,
				type: 'fraction',
			},
		})
	}
}

const accordionItems = document.querySelectorAll('.accordion-item')

accordionItems.forEach(item => {
	const button = item.querySelector('.accordion-button')
	const content = item.querySelector('.accordion-content')

	button.addEventListener('click', () => {
		if (content.classList.toggle('open')) {
			content.style.maxHeight = content.scrollHeight + 'px'
		} else {
			content.style.maxHeight = 0
		}
	})
})

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
