<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Inventory Management</h2>

    <div class="mb-4 flex gap-4">
      <input
        v-model="searchQuery"
        class="border p-2 w-1/3"
        placeholder="Search by product name..."
      />
      <select v-model="filterCategory" class="border p-2">
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>
      <select v-model="sortKey" class="border p-2">
        <option value="name">Sort by Name</option>
        <option value="stock">Sort by Stock</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>

    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="border p-2">Product</th>
          <th class="border p-2">Category</th>
          <th class="border p-2">Price ($)</th>
          <th class="border p-2">Stock</th>
          <th class="border p-2">Update</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredAndSortedProducts"
          :key="item.id"
          :class="{ 'bg-red-100': item.stock < 5 }"
        >
          <td class="border p-2 flex items-center gap-2">
            <img :src="item.image" class="w-8 h-8 object-cover" />
            <span>{{ item.name }}</span>
          </td>
          <td class="border p-2">{{ item.category }}</td>
          <td class="border p-2">${{ item.price }}</td>
          <td class="border p-2">
            <span :class="{ 'text-red-600 font-semibold': item.stock < 5 }">
              {{ item.stock }}
            </span>
            <span v-if="item.stock < 5" class="ml-1 text-xs text-red-500"
              >⚠️ Low</span
            >
          </td>
          <td class="border p-2">
            <input
              type="number"
              v-model.number="item.newStock"
              class="border p-1 w-16"
            />
            <button
              @click="updateStock(item)"
              class="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
            >
              Update
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      searchQuery: '',
      filterCategory: '',
      sortKey: 'name',
    }
  },
  computed: {
    filteredAndSortedProducts() {
      return this.products
        .filter(
          (p) =>
            (!this.filterCategory || p.category === this.filterCategory) &&
            (!this.searchQuery ||
              p.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
          if (this.sortKey === 'stock' || this.sortKey === 'price') {
            return a[this.sortKey] - b[this.sortKey]
          }
          return a[this.sortKey].localeCompare(b[this.sortKey])
        })
    },
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      fetch('https://forsit-admin-backend.onrender.com/api/products')
        .then((res) => res.json())
        .then((data) => {
          this.products = data.map((p) => ({ ...p, newStock: p.stock }))
        })
    },
    updateStock(product) {
      fetch(
        `https://forsit-admin-backend.onrender.com/api/products/${product.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: product.newStock }),
        }
      ).then(() => this.fetchProducts())
    },
  },
}
</script>
