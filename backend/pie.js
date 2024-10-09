// API to get pie chart data
app.get('/pie-chart', async (req, res) => {
    const { month } = req.query;
    try {
      const transactions = await Transaction.find({
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
      });
      const categories = await Transaction.distinct('category', {
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
      });
      const data = categories.map(category => {
        const count = transactions.filter(transaction => transaction.category === category).length;
        return {
          category: category,
          count: count
        };
      });
      res.send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching pie chart data');
    }
  });   