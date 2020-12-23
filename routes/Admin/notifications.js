const { Notification} = require("../../models/Notification");
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const axios = require("axios");
// const chunkArray = require("./chunkArray");

var serviceAccount = require("../../config/servicsAccountKey.json");
const { date } = require("joi");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://livebus-088091160.firebaseio.com"
});

router.get("/", async (req, res) => {
  const notificatons = await Notification.find()
  res.send(notificatons);
});

router.post("/", async (req, res) => {
  let notificaton = new Notification({
    subject: req.body.subject,
    message: req.body.message,
  });
  notificaton = await notificaton.save();
  await pushNotifications(req, res);
  res.send(notificaton);
});

async function pushNotifications(req, res) {
    try {
        const data = req.body;
        
        // Get users from Firestore, then build notifications array
        await admin.firestore()
        .collection("Tokens").get()
        .then((querySnapshot) => {
          if (querySnapshot.size) {
            
            // This array will contain each user’s notification
            let notificationsArray = [];
            
            querySnapshot.forEach((doc) => {
                let docData = doc.data();
                if (docData && docData.token) {
                    console.log(docData.token)
                    // The pushNotificationsToken retrieved from the app and stored in Firestore
                    // if (docData.token) {
                        notificationsArray.push({
                            to: docData.token,
                            // to: ["ExponentPushToken[Pf4EQ7LW0HADk9NURogiHH]", "ExponentPushToken[O9PjY0KDJINiN3eP9go_kw]"],
                            title: data.subject,
                            body: data.message,
                        });
                    // }
                }
            });
                
                // Send notifications to 100 users at a time (the maximum number that one Expo push request supports)
                let notificationsChunks = chunkArray(notificationsArray, 100);
                notificationsChunks.map( async (chunk) => {
                    console.log(chunk)
                    await axios({
                        method: "post",
                        url: "https://exp.host/--/api/v2/push/send",
                        data: chunk,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    // .then(res=>console.log(res))
                    // .catch(error => console.log(error) );
                });
                return ;
            } else {
                return res.status(404).send({ message: "No users found" });
            }
        })
        .catch((error) => {
            return res
            .status(500)
            .send({ message: `${error.code} - ${error.message}` });
        });
    } catch (error) {
        return res
        .status(500)
        .send({ message: `${error.code} - ${error.message}` });
    }
}

function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
  
    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }
  
    return tempArray;
}

module.exports = router;

