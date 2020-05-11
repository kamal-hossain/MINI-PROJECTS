const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Formprimary = require('./formprimaryModel');
const Amounts = require('./amountsModel');
const { v4: uuidv4 } = require('uuid');

router.get('/getallamounts', async (req, res) => {
  const allAmounts = await Amounts.find({});
  res.json({ status: 'success', data: allAmounts });
});

router.post('/submitform', async (req, res) => {
  const { email, amount, ID, name } = req.body;
  const data = {
    email,
    amount,
    ID,
    name,
    confirmationID: uuidv4(),
  };

  const newForm = await Formprimary.create(data);
  console.log(newForm);

  const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: '465',
      secure: true,
      auth: {
        user: process.env.fromGmail,
        pass: process.env.fromPass,
      },
    });

    // 2) Define the email options
    const mailOptions = {
      from: 'cis3.tk <kamalwebmanagement@gmail.com>', // This Line will be the header line in the receiver inbox
      to: options.email,
      subject: options.subject, // This will show the secondary line in the inbox
      html: options.html, // this will the actual message to the inbox
      // html:
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
  };

  const message = `<a 
  style="background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;" href="https://cis3.tk/.netlify/functions/server/confirmform/${newForm.confirmationID}">Confirm Post</a></br><p>If you didn't Requested for creating an post, please ignore this email!</p>`;

  await sendEmail({
    email,
    subject: 'Post Confirmation',
    html: message,
  });

  res.json({
    status: 'success',
    data: 'Please check your email to confirm the POST',
  });
});

router.get('/confirmform/:uuid', async (req, res) => {
  const formprimary = await Formprimary.findOne({
    confirmationID: req.params.uuid,
  });

  if (formprimary) {
    const data = {
      email: formprimary.email,
      amount: formprimary.amount,
      ID: formprimary.ID,
      name: formprimary.name,
    };

    const newAmount = await Amounts.create(data);
    await Formprimary.findByIdAndDelete(formprimary._id);
  } else {
    // return res.json({ status: 'Server error!' });
    return res.redirect('https://cis3.tk');
  }

  // res.json({ status: 'Form confirmed' });
  res.redirect('https://cis3.tk');
});

router.post('/sendemailtodelete', async (req, res) => {
  const amountToBeDeleted = await Amounts.findById(req.body._id);
  console.log(amountToBeDeleted);

  if (amountToBeDeleted.email === req.body.email) {
    //Send email for delete confirmation

    const sendEmail = async (options) => {
      // 1) Create a transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
          user: process.env.fromGmail,
          pass: process.env.fromPass,
        },
      });

      // 2) Define the email options
      const mailOptions = {
        from: 'cis.tk <kamalwebmanagement@gmail.com>', // This Line will be the header line in the receiver inbox
        to: options.email,
        subject: options.subject, // This will show the secondary line in the inbox
        html: options.html, // this will the actual message to the inbox
        // html:
      };

      // 3) Actually send the email
      await transporter.sendMail(mailOptions);
    };

    const message = `<a 
    style="background-color: #f44336;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;" href="https://cis3.tk/.netlify/functions/server/confirmamountdelete/${amountToBeDeleted._id}">Confirm Delete</a></br><p>If you didn't Requested for Deleting a post, please ignore this email!</p>`;

    await sendEmail({
      email: amountToBeDeleted.email,
      subject: 'Delete Confirmation',
      html: message,
    });
    return res.json({ status: 'success' });
  }

  res.json({ status: 'failed' });
});

router.get('/confirmamountdelete/:id', async (req, res) => {
  console.log('Inside Delete confirmation');
  const amountToBeDeleted = await Amounts.find({ _id: req.params.id });

  if (amountToBeDeleted) {
    await Amounts.findByIdAndDelete(amountToBeDeleted[0]._id);
  } else {
    // return res.json({ status: 'Server error!' });
    return res.redirect('https://cis3.tk');
  }

  // res.json({ status: 'Form confirmed' });
  res.redirect('https://cis3.tk');
});

module.exports = router;
