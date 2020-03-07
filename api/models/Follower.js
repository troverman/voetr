module.exports = {
	attributes: {
        followed: {model: 'user', required: true},
        follower: {model: 'user', required: true}
    }
};

