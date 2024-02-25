require("dotenv").config();
const axios = require("axios");
const sendMail = require("./sendMail-controller");
const token = process.env.TOKEN;

async function createMeeting(
  topic,
  start_time,
  type,
  duration,
  timezone,
  agenda
) {
  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type,
        start_time,
        duration,
        timezone,
        agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: "both",
          auto_recording: "none",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const body = response.data;
    return body;
  } catch (error) {
    console.error("Error", error);
  }
}
exports.getMeetings = async function getMeetings(req, res) {
  try {
    const { topic, start_time, duration, teacher } = req.body.body; //type timezone agenda
    createMeeting(topic, start_time, 2, duration, "UTC", " ");
    const response = await axios.get(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    const arr = data.meetings;
    const latest_meeting = arr[arr.length - 1].join_url;
    await sendMail.sendMailT(latest_meeting, teacher);
    res.send(latest_meeting);
    console.log(latest_meeting);
    return latest_meeting;
  } catch (error) {
    res.send(error.message);
  }
};
