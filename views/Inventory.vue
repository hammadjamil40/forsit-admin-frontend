<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Inventory Management</h2>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border p-2">Product</th>
          <th class="border p-2">Stock</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="border p-2">{{ item.name }}</td>
          <td class="border p-2">{{ item.stock }}</td>
          <td class="border p-2">
            <input type="number" v-model.number="item.newStock" class="border p-1 w-16" />
            <button @click="updateStock(item)" class="ml-2 px-2 py-1 bg-blue-500 text-white rounded">Update</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return { products: [] }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      fetch('http://localhost:3001/api/products')
        .then(res => res.json())
        .then(data => {
          this.products = data.map(p => ({ ...p, newStock: p.stock }))
        })
    },
    updateStock(product) {
      fetch(`http://localhost:3001/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: product.newStock })
      }).then(() => this.fetchProducts())
    }
  }
}
</script>
