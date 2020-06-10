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

async function getAllSession(req, res) {
    const { date, campus } = req.query;
    console.log(date);
    let sessions = [];
    if(date) {
        sessions = await Session.find(
            { date: date, campus: campus },
            { time: 1 }
        ).exec();
    } else {
        sessions = await Session.find(
            {},
            { date: 1, time: 1, campus: 1 }
        ).exec();
    }

    if (!sessions) {
        return res.status(404).json('session not found');
    }
    return res.json(sessions);
};

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
    getAllSession,
    deleteSession,
};