const Chat = require('../models/chat');
const Booking = require('../models/booking');
const mongoose = require("mongoose");

async function addChat(req, res) {
    let {
        bookingId,
        studentId,
        counselorId,
        chatRecords
    } = req.body;
    // trans authorId type from string to ObjectId
    const records = [];
    chatRecords.forEach(record => {
        let { author, content, time} = record;
        // For test only
        time = new Date();

        author = mongoose.Types.ObjectId(author);
        const item = {
            author,
            content,
            time
        };
        records.push(item);
    });
    chatRecords = records;
    // trans bookingId, studentId, counselorId type from string to ObjectId
    bookingId = mongoose.Types.ObjectId(bookingId);
    studentId = mongoose.Types.ObjectId(studentId);
    counselorId = mongoose.Types.ObjectId(counselorId);

    const chat = new Chat({
        bookingId,
        studentId,
        counselorId,
        chatRecords
    });
    await chat.save();

    const booking = await Booking.findById(bookingId).exec();
    booking.chats = chat._id;
    await booking.save();

    return res.json(chat);
}



async function updateChat(req, res) {
  const { id } = req.params;
  const { chatRecords } = req.body;
  console.log(chatRecords);
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

module.exports = { addChat, updateChat };