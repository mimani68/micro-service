const app = require('express')()

app.post('/', (req, res, next)=>{
	res.status(200).json({
		message: "pong"
	})
})

app.listen(3000, ()=>{
	console.log('node server on post 3000')
})

