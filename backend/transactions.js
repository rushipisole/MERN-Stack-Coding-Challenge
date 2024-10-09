// API to list all transactions
app.get('/transactions', async (req, res) => {
    const { page = 1, perPage = 10, search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ];
    }
    try {
      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(perPage);
      res.send(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching transactions');
    }
  });