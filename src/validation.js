import { extend, localize } from 'vee-validate'
import { required, min, max, min_value, max_value, confirmed, required_if } from 'vee-validate/dist/rules'
import locale from 'vee-validate/dist/locale/zh_CN'
import { JacLib } from 'jactools'

extend('required', {
	...required,
})
extend('min', {
	...min,
})
extend('max', {
	...max,
})
extend('min_value', {
	...min_value,
})
extend('max_value', {
	...max_value,
})
extend('confirmed', {
	...confirmed,
})
extend('url', {
	validate: value => /https?:\/\/.+\..+\..+/.test(value),
})
extend('email', {
	validate: value => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(value),
})
extend('phone', {
	validate: value => /^\d{11}$/.test(value),
})
extend('difference', {
	params: ['target'],
	validate: (value, { target }) => value !== target,
})
extend('required_if', {
	...required_if,
})
extend('image', {
	validate: files => [...files].every(file => /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name)),
})
extend('img_width', {
	params: ['value'],
	validate: async (files, { value }) => {
		for (const file of [...files]) if ((await JacLib.readImageInstance(file)).width > +value) return false
		return true
	},
})
extend('img_height', {
	params: ['value'],
	validate: async (files, { value }) => {
		for (const file of [...files]) if ((await JacLib.readImageInstance(file)).height > +value) return false
		return true
	},
})
extend('img_size', {
	params: ['value', 'unit'],
	validate: async (files, { value, unit = 'KB' }) => {
		let size = 0
		switch (unit) {
			case 'KB':
				size = 1024
				break
			case 'MB':
				size = 1024 * 1024
				break
		}
		return [...files].every(file => file.size / size <= +value)
	},
})
extend('decimal', {
	params: ['len'],
	validate: (value, { len }) => {
		value = '' + value
		const isNumber = !isNaN(parseFloat(value)) && isFinite(value)
		if (!isNumber) return false
		const hasPoint = value.indexOf('.') > -1
		const afterPoint = value.split('.')[1]
		return !afterPoint ? (hasPoint ? false : true) : afterPoint.length <= len
	},
})

locale.messages = Object.assign(locale.messages, {
	required: () => '必填欄位',
	max: (filed, value) => `字數需小於${value.length}字元`,
	min: (filed, value) => `字數需大於${value.length}字元`,
	min_value: (filed, value) => `數字需大於${value.min}`,
	max_value: (filed, value) => `數字需小於${value.max}`,
	confirmed: () => `需与指定欄位相同`,
	url: () => '非合法網址',
	email: () => '非合法Email',
	phone: () => '非合法手機號碼',
	difference: () => '需與指定欄位相異',
	required_if: () => '必填欄位',
	numeric: () => '欄位需為數字',
	decimal: (filed, value) => `必須是數字，且能夠保留${value.len}位小數`,
	image: () => '图片格式不符',
	img_width: (filed, value) => `图片宽度不符合规范，上限為${value.value}`,
	img_height: (filed, value) => `图片高度不符合规范，上限為${value.value}`,
	img_size: (filed, value) => `图片大小不符合规范，上限為${value.value}${value.unit || 'KB'}`,
})

localize('cn', locale)
