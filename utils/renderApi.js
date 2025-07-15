const axios = require('axios')

async function deployBotToRender(appName, envVars) {
  try {
    const response = await axios.post(
      'https://api.render.com/v1/services',
      {
        service: {
          type: "web",
          name: appName,
          repo: {
            url: "https://github.com/INCONNU-BOY/INCONNU-XD-V2"
          },
          envVars: Object.entries(envVars).map(([key, value]) => ({
            key,
            value
          }))
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RENDER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log("🚀 Bot deployed:", response.data.service.id)
  } catch (err) {
    console.error("❌ Render API error:", err.response?.data || err.message)
  }
}

module.exports = { deployBotToRender }
