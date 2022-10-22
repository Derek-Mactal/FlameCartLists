const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const UserSchema = new mongoose.Schema({
    //Add model attributes here
    name: {type: String, required:[true, 'You have a name right?']},
    email: {
            type: String,
            require:[true, 'You have an email right?'],
            unique: true
        },
    username: {type: String, required:[true, 'You thought of a username right?'], unique: true},
    password: {type: String, required:[true, 'You thought of a password right?'], minlength:[8,'Password must be at least 8 characters']},
    lists: {type: Array, default:[]}
},{ timestamps: true });
UserSchema.path('email').validate(async (value) => {
    let valid=/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(value)
    if(!valid)
        return false;
    const emailCount = await mongoose.models.User.countDocuments({email: value });
    return !emailCount;
}, 'Email invalid or already exists')
UserSchema.path('username').validate(async (value) => {
    const usernameCount = await mongoose.models.User.countDocuments({username: value });
    return !usernameCount;
}, 'Username already exists')
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});
const User = mongoose.model('User', UserSchema);
module.exports = User;