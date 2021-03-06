const mongoose = require('mongoose');

const express = require('express');

const router = express.Router();

const User = require('../models/user');

const Area = require('../models/area');

const Pharma = require('../models/pharmacy');

const Person = require('../models/sperson');

const jwt = require('jsonwebtoken');

const Message = require('../models/message');

const UserController = require('../controllers/user');

const SalesPerson = require('../models/SalesAppUser');

router.post('/salesLogin', (req, res, next) => {
	SalesPerson.findOne({
		useremail: req.body.useremail,
		password: req.body.password
	})
		.select({ password: 0 })
		.exec()
		.then((salesPerson) => {
			if (salesPerson == null) {
				res.status(200).json({
					message: 'Invalid Email, Password'
				});
			} else {
				res.status(200).json({
					message: 'User Logged In',
					salesPerson: salesPerson
				});
			}
		})
		.catch((err) => {
			res.status(200).json({
				message: 'error occured',
				error: err
			});
		});
});

router.post('/signup', (req, res, next) => {
	let salesPerson = new SalesPerson({
		Name: 'Siddaraju',
		commission: 0,
		Return_value: 0,
		Total_sales: 0,
		No_of_order: 0,
		Returns: 0,
		Earnings: 0,
		useremail: 'sidd@gmail.com',
		password: 'sidd@123',
		usercode: '0001',
		phone: '9900408994'
	});
	salesPerson.save();
	res.status(200).json({ salesPerson: salesPerson });
});

// router.get('/message', (req, res, next) => {
// 	Message.find()
// 		.exec()
// 		.then((doc) => {
// 			res.status(200).json({
// 				code: doc[0].code,
// 				count: doc[0].count
// 			});
// 		})
// 		.catch((err) => {
// 			res.status(500).json({
// 				error: err
// 			});
// 		});
// });

// router.get('/salesLogin', (req, res, next) => {
// 	console.log(req.query);
// 	User.find({
// 		useremail: req.query.email,
// 		password: req.query.password
// 	})
// 		.exec()
// 		.then((user) => {
// 			console.log(user);
// 			if (user.length > 0) {
// 				Person.find({
// 					user: user[0]._id
// 				})
// 					.exec()
// 					.then((doc) => {
// 						res.status(200).json({
// 							Sales_Person: doc
// 						});
// 					});
// 			} else {
// 				res.status(500).json({
// 					message: 'Invalid Useremail'
// 				});
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).json({
// 				message: 'Invalid Useremail or password'
// 			});
// 		});
// });

// router.get('/remove', (req, res, next) => {
// 	User.find().exec().then((doc) => {
// 		res.status(200).json(doc);
// 	});
// });

// router.post('/message', (req, res, next) => {
// 	const message = new Message({
// 		code: req.body.code,
// 		count: req.body.count
// 	})
// 		.save()
// 		.then((doc) => {
// 			res.send(doc);
// 		})
// 		.catch((err) => {
// 			res.send(err);
// 		});
// });

// router.get('/', (req, res, next) => {
// 	User.find()
// 		.exec()
// 		.then((users) => {
// 			res.status(200).json({
// 				user: users
// 			});
// 		})
// 		.catch((err) => {
// 			error: err;
// 		});
// });

// router.get('/salesPerson', (req, res, next) => {
// 	Person.find()
// 		.exec()
// 		.then((users) => {
// 			res.status(200).json({
// 				SalesPersons: users
// 			});
// 		})
// 		.catch((err) => {
// 			error: err;
// 		});
// });

// router.post('/salesPerson', (req, res, next) => {
// 	const person = new Person({
// 		_id: mongoose.Types.ObjectId(),
// 		user: req.body.userid,
// 		Name: req.body.name,
// 		Allocated_Area: req.body.areaid,
// 		Allocated_Pharma: req.body.pid,
// 		Total_sales: req.body.tsales,
// 		No_of_order: req.body.orders,
// 		Returns: req.body.returns,
// 		Earnings: req.body.earnings
// 	});
// 	person
// 		.save()
// 		.then((result) => {
// 			console.log(result);
// 			res.status(201).json({
// 				message: 'Sales Person Details !'
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({
// 				error: err
// 			});
// 		});
// });

// router.get('/login', (req, res, next) => {
// 	if (req.query.useremail != null) {
// 		User.findOne({
// 			useremail: req.query.useremail
// 		})
// 			.exec()
// 			.then((user) => {
// 				console.log(user);
// 				Person.find({
// 					user: user._id
// 				})
// 					.exec()
// 					.then((doc) => {
// 						res.status(200).json({
// 							Sales_Person: doc
// 						});
// 					});
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					message: 'Invalid Useremail or password'
// 				});
// 			});
// 	} else if (req.query.phone != null) {
// 		User.findOne({
// 			phone: req.query.phone
// 		})
// 			.exec()
// 			.then((user) => {
// 				console.log(user);
// 				Person.find({
// 					user: user._id
// 				})
// 					.exec()
// 					.then((doc) => {
// 						res.status(200).json({
// 							Sales_Person: doc
// 						});
// 					});
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					message: 'Invalid Phone Number'
// 				});
// 			});
// 	} else {
// 		User.findOne({
// 			usercode: req.query.usercode
// 		})
// 			.exec()
// 			.then((user) => {
// 				console.log(user);
// 				Person.find({
// 					user: user._id
// 				})
// 					.exec()
// 					.then((doc) => {
// 						res.status(200).json({
// 							Sales_Person: doc
// 						});
// 					});
// 			})
// 			.catch((err) => {
// 				res.status(500).json({
// 					message: 'Invalid Useremail or password'
// 				});
// 			});
// 	}
// });

// router.get('/forget', (req, res, next) => {
// 	User.find({ $or: [ { useremail: req.query.email }, { phone: req.query.email } ] })
// 		.exec()
// 		.then((doc) => {
// 			console.log(doc[0]);
// 			res.status(200).json({ message: 'User Found', password: doc[0].password, phone: doc[0].phone });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(200).json({ message: 'No User Found' });
// 		});
// });

// router.post('/login', UserController.find_user);

// router.post('/signup', UserController.create_user);

// router.delete('/:userId', UserController.delete_user);

module.exports = router;
