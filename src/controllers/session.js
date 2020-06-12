const Session = require('../models/session');
const mongoose = require("mongoose");

async function addSession(req, res) {
    const { date, time, campus } = req.body;

    /* if(sessions) {
        await Promise.all(sessions.map(async item => {
            let { date, time, campus } = item;
            const session = new Session({
                date,
                time,
                campus
            });
            await session.save();
        })) */
        const session = new Session({ 
            date,
            time,
            campus
        });

        await session.save();
        return res.status(200).json('success');
    /* } else {
        return res.status(404).json('sessions not found');
    } */
};

async function getSession(req, res) {
    const { date, campus } = req.query;

    const session = await Session.findOne(
        { date: date, campus: campus },
    ).exec();

    return res.json(session);
};

async function updateSession(req, res) {
    const { id } = req.params;
    const { time } = req.body;

    const newSession = await Session.findByIdAndUpdate(
        {
            _id: id
        },
        {
            time
        },
        {
            new: true,
            useFindAndModify: false
        }
    ).exec();

    if (!newSession) {
        return res.status(404).json('chat not found');
    }

    return res.json(newSession);
}

async function deleteSession(req, res) {
    const { date, campus } = req.query;
    const session = await Session.findOneAndDelete(
        { date: date, campus: campus },
    ).exec();

    if (!session) {
        return res.status(404).json('session not found');
    }

    return res.sendStatus(200);
}

module.exports = {
    addSession,
    getSession,
    updateSession,
    deleteSession,
};