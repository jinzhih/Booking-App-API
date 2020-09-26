const Chat = require('../models/chat');
const Booking = require('../models/booking');
const mongoose = require("mongoose");

async function addChat(req, res) {
    let {
        bookingId,
        studentId,
        chatRecords
    } = req.body;
    // trans authorId type from string to ObjectId
    const records = [];
    if (!chatRecords || !chatRecords.length) {
        return res.status(404).json('chatRecords not found');
    }
    chatRecords.forEach((record) => {
        let { author, content, time } = record;

        author = mongoose.Types.ObjectId(author);
        const item = {
            author,
            content,
            time,
        };
        records.push(item);
    });
    chatRecords = records;
    // trans bookingId, studentId type from string to ObjectId
    bookingId = mongoose.Types.ObjectId(bookingId);
    studentId = mongoose.Types.ObjectId(studentId);

    const chat = new Chat({
        bookingId,
        studentId,
        chatRecords
    });
    await chat.save();

    const booking = await Booking.findById(bookingId).exec();
    booking.chats = chat._id;
    await booking.save();

    return res.json(chat);
}

async function getAllChatByBookingId(req, res) {
    const { bookingId } = req.query;

    const chats = await Chat.findOne(
        { bookingId: bookingId },
        { bookingId: 0 }
    ).populate('chatRecords.author', 'firstName lastName studentId').exec();
    return res.json(chats);
}



async function updateChat(req, res) {
  const { id } = req.params;
  const chatRecords = req.body;

  const newChat = await Chat.findByIdAndUpdate(
      id,
      {
          chatRecords
      },
      {
          new: true
      }
  ).exec();

  if (!newChat) {
      return res.status(404).json('chat not found');
  }

  return res.json(newChat);
}

module.exports = { addChat, updateChat, getAllChatByBookingId };