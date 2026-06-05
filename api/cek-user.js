module.exports = async (req, res) => {
    const username = req.query?.username;

    if (!username) {
        return res.status(400).json({
            status: "ERROR",
            message: "Username required"
        });
    }

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    try {
        const userUrl =
            `https://users.roproxy.com/v1/users/search?keyword=${encodeURIComponent(username)}&limit=10`;

        const userResponse = await fetch(userUrl, { headers });
        const userData = await userResponse.json();

        const userId = userData.data[0].id;

        const profilePlatformUrl =
            "https://apis.roproxy.com/profile-platform-api/v1/profiles/batch/get";

        const profileResponse = await fetch(profilePlatformUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({
                userIds: [userId]
            })
        });

        const profileData = await profileResponse.text();

        return res.status(200).json({
            userId,
            profileStatus: profileResponse.status,
            profileData
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack
        });
    }
};