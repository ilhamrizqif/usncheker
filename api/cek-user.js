module.exports = async (req, res) => {
    const username = req.query?.username;

    if (!username) {
        return res.status(400).json({
            status: "ERROR",
            message: "Username required"
        });
    }

    const headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    try {
        const userUrl =
            `https://users.roproxy.com/v1/users/search?keyword=${encodeURIComponent(username)}&limit=10`;

        console.log("USERNAME:", username);
        console.log("URL:", userUrl);

        const userResponse = await fetch(userUrl, {
            method: "GET",
            headers
        });

        const text = await userResponse.text();

        return res.status(200).json({
            requestUsername: username,
            responseStatus: userResponse.status,
            responseBody: text.substring(0, 1000)
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "ERROR",
            message: error.message,
            stack: error.stack
        });
    }
};