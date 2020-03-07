//ELECTION MODEL 
//THINK HOW IT INTERRELATES TO ASSOCIATION
module.exports = {
	attributes: {
        title: {type: 'string', required: true},
        committee: {model: 'committee', required: true},
        user: {model: 'user', required: true}
    }
};