import admin from '../../../../../lib/auth/firebaseAdmin'

export default async (req, res) => {
  const token = req.headers.token
  const hat = req.body

  if(!token || !hat) return res.status(400).json({ message: "Faltan datos" })

  try {
    const user = await admin.auth().verifyIdToken(token)
    if(!user.admin) return res.status(403).json({ message: ";(" })

    await admin.firestore().collection('tardan').add(hat)
    res.status(200).json({ message: "Parece que todo salio bien" })
  } catch(e) {
    console.log(e)
    res.status(400).json({ message: "Algo salio mal, vuelve a intentarlo" })
  }
}