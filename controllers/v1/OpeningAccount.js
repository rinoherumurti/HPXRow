/*
const poolRow = require('../../database/dbrow');

exports.accountVerification = async (req, res) => {
    const { question, options } = req.body;

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ message: "Invalid input data. Question and at least two options are required." });
    }

    try {
        const connection = await poolRow.getConnection();
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'INSERT INTO polls (question) VALUES (?)',
            [question]
        );

        const pollId = result.insertId;

        const optionQueries = options.map(option => {
            return connection.execute(
                'INSERT INTO options (poll_id, option_text) VALUES (?, ?)',
                [pollId, option]
            );
        });

        await Promise.all(optionQueries);

        await connection.commit();
        connection.release();

        res.status(201).json({ pollId, message: "Poll created successfully." });

    } catch (error) {
        console.error("Error creating poll:", error.message);
        res.status(500).json({ message: "Error creating poll." });
    }
};
*/