<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Add Product</h2>
    <form @submit.prevent="submit">
      <input
        v-model="form.name"
        placeholder="Name"
        required
        class="block p-2 border mb-2 w-full"
      />
      <input
        v-model="form.description"
        placeholder="Description"
        required
        class="block p-2 border mb-2 w-full"
      />
      <input
        v-model.number="form.price"
        placeholder="Price"
        required
        type="number"
        class="block p-2 border mb-2 w-full"
      />
      <input
        v-model.number="form.stock"
        placeholder="Stock"
        required
        type="number"
        class="block p-2 border mb-2 w-full"
      />
      <input
        v-model="form.category"
        placeholder="Category"
        class="block p-2 border mb-2 w-full"
      />
      <input
        v-model="form.image"
        placeholder="Image URL"
        class="block p-2 border mb-2 w-full"
      />
      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">
        Add Product
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        image: '',
      },
    }
  },
  methods: {
    submit() {
      fetch('https://forsit-admin-backend.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form),
      }).then(() => {
        this.form = {
          name: '',
          description: '',
          price: 0,
          stock: 0,
          category: '',
          image: '',
        }
        alert('Product added!')
      })
    },
  },
}
</script>
