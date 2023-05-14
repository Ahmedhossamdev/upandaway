

/*
 GET /
 Home page
 */


exports.frontPage = async (req, res) => {
    res.render('front-page', {
        currentPage: 'front-page',
        layout: '../views/layouts/index',
    });
};

exports.getChat = async (req, res) => {
    res.render('chatBot', {
        currentPage: 'chatBot',
        layout: '../views/layouts/index',
    });
};

exports.contactUs = async (req, res) => {
    res.render('contact-us', {
        layout: '../views/layouts/index',
    });
};

exports.services = async (req, res) => {
    res.render('services', {
        layout: '../views/layouts/index',
    });
};

exports.gallary = async (req, res) => {
    res.render('gallery', {
        layout: '../views/layouts/index',
    });
};

