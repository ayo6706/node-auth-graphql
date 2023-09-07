/* eslint-disable consistent-return */
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import User from "../serviceOne/model";
import DB_NAMES from "../../../helpers/constants";

const schema = new Schema<User>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
        type: String, required: true, lowercase: true, unique: true,
    },
    password: { type: String, required: true }
}, { timestamps: true });
schema.pre("save", function save(next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password!, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
schema.set("toJSON", {
    transform(doc, ret) {
        // eslint-disable-next-line no-param-reassign
        delete ret.password;
    },
});
export default model<User>(DB_NAMES.USER, schema);
