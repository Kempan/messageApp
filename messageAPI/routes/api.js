// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID })
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const router = vertex.router()


//  SKAPAR NYTT MEDDELANDE
router.post('/message', (req, res) => {
	console.log(req.body)
	turbo.create('message', req.body)
		.then(data => {
			res.json({
				confirmation: 'success',
				data: data
			})
			return;
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
			return;
		})
})


//  FETCHA ALLA MEDDELANDEN
const validResources = [
	'message'
];

router.get('/:resource', (req, res) => {
	const { resource } = req.params;
	const { query } = req;

	if (validResources.indexOf(resource) < 0) {
		res.json({
			confirmation: 'fail',
			message: 'No such rescource'
		});
		return;
	}
	turbo.fetch(resource, query)
		.then(data => {
			res.json({
				confirmation: 'success',
				data: data
			});
			return;
		}).catch(err => {
			console.log(err)
			res.json({
				confirmation: 'fail',
				message: err.message
			});
			return;
		})

	// ------ADD MESSAGES TO DATASTORE--------

	// const messages = [
	// 	{
	// 		toUser: 'Lisa',
	// 		fromUser: '5b9a33a162896000149179cf',
	// 		message: 'asfiaosfnaosf aspiffaspif apfsi a piafapif naifn paifn painfapfi napfiasf a sf asf asf',
	// 		dateTime: new Date()
	// 	},
	// 	{
	// 		toUser: 'Lisa',
	// 		fromUser: '5b9a33a162896000149179cf',
	// 		message: 'asfiaosfnaosf aspiffaspif apfsi a piafapif naifn pai',
	// 		dateTime: new Date()
	// 	},
	// 	{
	// 		toUser: '5b9a33a162896000149179cf',
	// 		fromUser: 'Lisa',
	// 		message: 'asfiaosfnaosf aspiffaspif apfsi a piafapif naifn paifn painfapfi napfi asff af af sasd',
	// 		dateTime: new Date()
	// 	},
	// 	{
	// 		toUser: '5b9a33a162896000149179cf',
	// 		fromUser: 'Lisa',
	// 		message: 'asfiaosfnaosf aspiffaspif apfsi a piafapif naifn paia',
	// 		dateTime: new Date()
	// 	},
	// ]

	// messages.forEach((message, key) => {
	// 	turbo.create('message', message)
	// })

});


// FETCH CONVERSATION MESSAGES
router.get('/message/me', (req, res) => {

	const resource = 'message';
	const { query } = req;

	const messages = [];

	const first = {
		toUser: query.toUser,
		fromUser: query.fromUser
	}
	const second = {
		fromUser: query.toUser,
		toUser: query.fromUser
	}

	turbo.fetch(resource, first)
		.then(data => {
			data.forEach((mes, key) => {
				messages.push(mes)
			});
			return turbo.fetch(resource, second);
		})
		.then(data => {
			data.forEach((mes, key) => {
				messages.push(mes);
			});
			res.json({
				confirmation: 'success',
				data: messages
			});
		})
		.catch(err => {
			console.log(err)
			res.json({
				confirmation: 'hej',
				message: err.message
			});
			return;
		})
});

// router.get('/:resource/:id', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		id: req.params.id,
// 		query: req.query // from the url query string
// 	})
// })



module.exports = router
