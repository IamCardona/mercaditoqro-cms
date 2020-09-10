import admin from '../../lib/auth/firebaseAdmin'

export default async (req, res) => {
  const token = req.headers.token

  if(!token) return res.status(403).json({ message: ";(" })

  try {
    const userToken = await admin.auth().verifyIdToken(token)
    if(!userToken.admin) return res.status(403).json({ message: ";(" })

    return res.status(200).json({ message: "Estas autorizado!!" })
  } catch(e) {
    console.log(e.message)
    return res.status(400).json({ message: "Algo salió mal ;(" })
  }
}
