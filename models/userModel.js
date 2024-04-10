const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    isPolicy: {
        type: Boolean,
        required: true,
    }
})

userSchema.pre("save", async function (next) {

    const userCredentials = this;

    if (!userCredentials.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(userCredentials.password, salt);
        userCredentials.password = hashPassword;
    } catch (error) {
        const message = "Error in userSchema.pre";
        const status = 401;
        next({ message, status });
    }
})

userSchema.methods.comparePassword = async function (password) {
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        console.log("Error in userSchema.comparePassword ", error);
    }
}

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SIGN,
            {
                "expiresIn": "30d"
            }
        )
    } catch (error) {
        const message = "Error in userSchema.generateToken";
        const status = 404;
        next({ message, status });
    }
}

const User = new model("User", userSchema);

module.exports = User;