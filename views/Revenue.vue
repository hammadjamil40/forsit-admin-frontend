<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Revenue Overview</h2>
    <div class="mb-4">
      <p>Total Orders: {{ data.totalOrders }}</p>
      <p>Total Revenue: ${{ data.totalRevenue }}</p>
    </div>
    <div>
      <canvas id="revenueChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      data: { totalOrders: 0, totalRevenue: 0, breakdown: { daily: [] } }
    }
  },
  mounted() {
    fetch('http://localhost:3001/api/analytics/revenue')
      .then(res => res.json())
      .then(json => {
        this.data = json
        new Chart(document.getElementById('revenueChart'), {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Daily Revenue',
              data: json.breakdown.daily,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        })
      })
  }
}
</script>
