// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({ site_id: process.env.TURBO_APP_ID })
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const router = vertex.router()

/*  This is a sample API route. */

const validResources = [
	'message'
];

router.get('/:resource', (req, res) => {
	const { resource } = req.params;
	const { query } = req;
	// res.json({
	// 	confirmation: 'success',
	// 	resource: req.params.resource,
	// 	query: req.query // from the url query string
	// })
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
});

router.get('/message/me', (req, res) => {
	const { resource } = req.params;
	const { query } = req;

	const data = [];

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
});

router.get('/:resource/:id', (req, res) => {
	res.json({
		confirmation: 'success',
		resource: req.params.resource,
		id: req.params.id,
		query: req.query // from the url query string
	})
})



module.exports = router
