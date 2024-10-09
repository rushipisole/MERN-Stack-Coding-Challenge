// API to get combined data
app.get('/combined', async (req, res) => {
    const { month } = req.query;
    try {
      const transactions = await Transaction.find({
        $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
      });
      const statistics = await getStatistics(month);
      const barChartData = await getBarChartData(month);
      const pieChartData = await getPieChartData(month);
      res.send({
        transactions: transactions,
        statistics: statistics,
        barChartData: barChartData,
        pieChartData: pieChartData
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching combined data');
    }
  });
  
  async function getStatistics(month) {
    // Call the statistics API
    const response = await axios.get(`/statistics?month=${month}`);
    return response.data;
  }
  
  async function getBarChartData(month) {
    // Call the bar chart API
    const response = await axios.get(`/bar-chart?month=${month}`);
    return response.data;
  }
  
  async function getPieChartData(month) {
    // Call the pie chart API
    const response = await axios.get(`/pie-chart?month=${month}`);
    return response.data;
  }