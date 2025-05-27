<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Add New Product</h2>
    <form @submit.prevent="submit" enctype="multipart/form-data" class="space-y-4">

      <div>
        <label class="block mb-1 font-medium">Product Name</label>
        <input v-model="form.name" placeholder="e.g., iPhone 14" required class="block p-2 border w-full" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Description</label>
        <input v-model="form.description" placeholder="Short description" required class="block p-2 border w-full" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Price (USD)</label>
        <input v-model.number="form.price" placeholder="e.g., 999" type="number" required class="block p-2 border w-full" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Initial Stock Level</label>
        <input v-model.number="form.stock" placeholder="e.g., 20" type="number" required class="block p-2 border w-full" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Category</label>
        <input v-model="form.category" placeholder="e.g., Electronics, Clothing" class="block p-2 border w-full" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Product Image</label>
        <input type="file" @change="handleImage" accept="image/*" class="block p-2 border w-full" />
        <div v-if="preview" class="mt-2">
          <img :src="preview" class="w-24 h-24 object-cover border" />
        </div>
      </div>

      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Add Product</button>
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
        category: ''
      },
      imageFile: null,
      preview: null
    }
  },
  methods: {
    handleImage(event) {
      const file = event.target.files[0]
      if (file) {
        this.imageFile = file
        this.preview = URL.createObjectURL(file)
      }
    },
    submit() {
      const formData = new FormData()
      for (const key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.imageFile) {
        formData.append('image', this.imageFile)
      }

      fetch('http://localhost:3001/api/products', {
        method: 'POST',
        body: formData
      }).then(() => {
        alert('Product added!')
        this.form = { name: '', description: '', price: 0, stock: 0, category: '' }
        this.imageFile = null
        this.preview = null
      })
    }
  }
}
</script>
