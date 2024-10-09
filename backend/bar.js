// API to get bar chart data
app.get('/bar-chart', async (req, res) => {
    const { month } = req.query;
    try {
        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
        });
        const priceRanges = [
            { range: '0-100', min: 0, max: 100 },
            { range: '101-200', min: 101, max: 200 },
            { range: '201-300', min: 201, max: 300 },
            { range: '301-400', min: 301, max: 400 },
            { range: '401-500', min: 401, max: 500 },
            { range: '501-600', min: 501, max: 600 },
            { range: '601-700', min: 601, max: 700 },
            { range: '701-800', min: 701, max: 800 },
            { range: '801-900', min: 801, max: 900 },
            { range: '901-above', min: 901, max: Infinity }
        ];
        const data = priceRanges.map(range => {
            const count = transactions.filter(transaction => transaction.price >= range.min && transaction.price <= range.max).length;
            return {
                range: range.range,
                count: count
            };
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching bar chart data');
    }
});