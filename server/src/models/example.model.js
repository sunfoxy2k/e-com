import mongoose from "mongoose";

const {Schema} = mongoose;
require('mongoose-type-email');

const bcrypt = require('bcrypt'),
    SALT_FACTOR = 10;

export function ProductSchema(mongoose) {
    const productSchema = new Schema(
        {
            Name: {
                type: String,
                required: true,
                index: {unique: true},
            },
            Price: {
                type: Number,
                required: true,
                min: 0,
            },
            Inventory: {
                type: Number,
                required: true,
                min: 0
            },
            Descriptions: {
                type: String,
                default: "Không có mô tả cho sản phẩm này",
            }
        }
    )
}

const cdn_root =

export function OrderSchema(mongoose) {
    const paymentSchema = new Schema({
        status : {
            type : Boolean,
            required : true,
            default : false,
        },
        info : {
            type : String,
            required : true,
        }
    })

    const orderSchema = new Schema (
        {
            Delivered_Status : {
                type : String,
                enum : ["chờ xử lý", "xác nhận đơn hàng", "đang vân chuyển", "hoàn thành"],
                required : true,
            },
            Payment_Info : {
                type : paymentSchema,
                required : true
            }
        }
    )
}

export function UsersSchema(mongoose) {

    const cartSchema = new Schema({
       []
    })

    const userSchema = new Schema(
        {
            Name: {
                type: String,
                require: true,
                index: {unique: true},
            },
            Password: {
                type: String,
                require: true,
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
            isAdmin : {
                type : Boolean,
                required : true,
                default : false,
            },
            email: mongoose.SchemaType.Email,
            phone: {
                type: mongoose.SchemaType.Phone,
                require: true
            },
            gender: {
                type: String,
                enum: ['male', 'female', 'other'],
                required : true,
            },
            date_of_birth: Date,
            cart : {
                type :
            }
        });

    userSchema.pre('save', function (next) {
        let user = this;

        if (!user.isModified('password')) return next();

        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });

    userSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    return mongoose.model("user", userSchema);
};
