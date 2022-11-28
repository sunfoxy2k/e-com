import { db } from "../core/modelDB.js";
import mongooseModule from "mongoose";
import bcrypt from 'bcrypt';

export async function getUserByNameAndPassword(username, plainpassword) {
  const user = await db.users.findOne({ Name: username });
  if (!user) return null;
  const isSamePass = await bcrypt.compare(plainpassword, user.Password);
  if (!isSamePass) return null;
  return user;
}

export async function getUserByID(uid) {
  if (!mongooseModule.isValidObjectId(uid)) return null;
  const user = await db.users.findById(uid);
  return user;
}

export async function createNewUser(name, password, fname, lname, email, pn) {
  const newUser = new db.users({
    Name: name,
    Password: password,
    Role: "User",
    Firstname: fname,
    Lastname: lname,
    Email: email,
    Phone: pn
  });
  let res = null;
  try {
    res = await newUser.save();
  }
  catch (err) {
    console.log(err);
  }
  return res;
}

export async function editCart(uid, cartContent) {
  if (!mongooseModule.isValidObjectId(uid)) return null;
  const user = await getUserByID(uid);
  let res = null;
  if (user) {
    user.CartContent = cartContent;
    try {
      res = await user.save();
    }
    catch (err) {
      console.log(err);
    }
  }
  return res
}