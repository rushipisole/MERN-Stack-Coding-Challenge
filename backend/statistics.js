// API to get statistics
app.get('/statistics', async (req, res) => {
    const { month } = req.query;
    try {
      const transactions = await Transaction.find({
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
      });
      const totalSaleAmount = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
      const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
      const totalNotSoldItems = transactions.filter(transaction => !transaction.sold).length;
      res.send({
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching statistics');
    }
  });