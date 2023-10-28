const CustomerModel = require('../models/customer')

exports.homePage = async (req, res) => {
    const messages = await req.consumeFlash('info')
    const locals = {
        title: 'ExpressJs',
        description: 'Free NodeJs User Management System'
    }
    let prePage = 8
    let page = req.query.page || 1
    try {
        const allCustomer = await CustomerModel.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(prePage * page - prePage)
            .limit(prePage)
            .exec()
        const count = await CustomerModel.count()
        res.render('index', {
            locals,
            allCustomer,
            current: page,
            pages: Math.ceil(count / prePage),
            messages
        })
    } catch (error) {
        console.log(error);
    }
}

// exports.homePage = async (req, res) => {
//     const messages = await req.consumeFlash('info')
//     const locals = {
//         title: 'ExpressJs',
//         description: 'Free NodeJs User Management System'
//     }
//     try {
//         const allCustomer = await CustomerModel.find({}).limit(20)
//         res.render('index', { locals, messages, allCustomer })
//     } catch (error) {
//         console.log(error);
//     }
// }

exports.addButton = async (req, res) => {
    const locals = {
        title: 'Add a New Customer - Express Js',
        description: 'Free NodeJs User Management System'
    }
    res.render('customer/add', locals)
}

exports.addCustomer = async (req, res) => {
    const newCustomer = new CustomerModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details
    })
    try {
        await CustomerModel.create(newCustomer)
        await req.flash('info', "New customer has been added")
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

exports.viewCustomer = async (req, res) => {
    try {
        const customer = await CustomerModel.findById({ _id: req.params.id })
        const locals = {
            title: 'View Customer Data',
            description: 'Free NodeJs User Management System'
        }
        res.render('customer/view', {
            locals,
            customer
        })
    } catch (error) {
        console.log(error);
    }
}

exports.editCustomer = async (req, res) => {
    try {
        const editCustomer = await CustomerModel.findOne({ _id: req.params.id })
        const locals = {
            title: 'Edit Customer Data',
            description: 'Free NodeJs User Management System'
        }
        res.render('customer/edit', { editCustomer, locals })
    } catch (error) {
        console.log(error);
    }
}

exports.editButtomCustomer = async (req, res) => {
    try {
        // await CustomerModel.findOneAndUpdate({
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     tel: req.body.tel,
        //     details: req.body.details,
        //     updatedAt: Date.now()
        // }).where({ _id: req.params.id })
        await CustomerModel.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            tel: req.body.tel,
            details: req.body.details,
            updatedAt: Date.now()
        })
        res.redirect(`/view/${req.params.id}`)
    } catch (error) {
        console.log(error);
    }
}

exports.deleteButtomCustomer = async (req, res) => {
    try {
        await CustomerModel.findByIdAndDelete(req.params.id)
        // await CustomerModel.deleteOne({ _id: req.params.id })
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

exports.searchCustomer = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm
        const searchCharacter = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
        const customerSearch = await CustomerModel.find({
            $or: [
                { firstName: { $regex: new RegExp(searchCharacter, "i") } },
                { lastName: { $regex: new RegExp(searchCharacter, "i") } }
            ]
        })
        res.render('search', { customerSearch })
    } catch (error) {
        console.log(error);
    }
}