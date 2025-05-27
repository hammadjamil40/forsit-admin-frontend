<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Revenue Overview</h2>

    <div class="flex gap-4 mb-4">
      <select v-model="selectedCategory" @change="fetchRevenue" class="border p-2">
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      <select v-model="selectedPeriod" @change="updateChart" class="border p-2">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="annually">Annually</option>
      </select>
    </div>

    <div class="mb-4">
      <p>Total Orders: {{ data.totalOrders }}</p>
      <p>Total Revenue: ${{ data.totalRevenue }}</p>
    </div>
    <canvas id="revenueChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  data() {
    return {
      data: { totalOrders: 0, totalRevenue: 0, breakdown: {} },
      selectedCategory: '',
      selectedPeriod: 'daily',
      chart: null
    }
  },
  mounted() {
    this.fetchRevenue()
  },
  methods: {
    fetchRevenue() {
      const url = this.selectedCategory
        ? `http://localhost:3001/api/analytics/revenue?category=${this.selectedCategory}`
        : 'http://localhost:3001/api/analytics/revenue'

      fetch(url)
        .then(res => res.json())
        .then(json => {
          this.data = json
          this.renderChart()
        })
    },
    renderChart() {
      const dataset = this.data.breakdown[this.selectedPeriod] || []

      if (this.chart) {
        this.chart.destroy()
      }

      const labels = Array.from({ length: dataset.length }, (_, i) => {
        if (this.selectedPeriod === 'daily') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] || `Day ${i + 1}`
        if (this.selectedPeriod === 'weekly') return `Week ${i + 1}`
        if (this.selectedPeriod === 'monthly') return ['Jan', 'Feb', 'Mar', 'Apr', 'May'][i] || `Month ${i + 1}`
        if (this.selectedPeriod === 'annually') return `${2023 + i}`
        return `Point ${i + 1}`
      })

      const ctx = document.getElementById('revenueChart').getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `${this.selectedPeriod} Revenue`,
            data: dataset,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }
      })
    },
    updateChart() {
      this.renderChart()
    }
  }
}
</script>
