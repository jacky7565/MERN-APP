import User from "../model/user_model.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);

        if (!userData) {
            return res.status(404).json({ msg: "User Data Not found" })
        }
        const savedData = await userData.save()
        res.status(200).json({ savedData })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const getAll = async (req, res) => {
    try {
        let userData = await User.find();
        if (!userData) {
            return res.status(400).json({ msg: "User Data Not Found" })
        }
        res.status(200).json(userData)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

export const getoneData = async (req, res) => {
    try {
        let id = req.params.id;
        let fetchoneData = await User.findById(id)
        if (!fetchoneData) {
            return res.status(400).json({ msg: "User Not Found" })
        }
        res.status(200).json(fetchoneData)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

export const updateData = async (req, res) => {
    try {
        let id = req.params.id;
        let getData = await User.findById(id);

        if (!getData) {
            return res.status(400).json({ msg: "User Not Found" });
        }

        let updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteData = async (req, res) => {
    try {
        let id = req.params.id;
        let delData = await User.findByIdAndDelete(id);
        if (!delData) {
            return res.status(400).json({ msg: "User Not Deleted" })
        }

        res.status(200).json(delData)

    }
    catch (error) {
        res.status(500).json({ "error": error })
    }
}

