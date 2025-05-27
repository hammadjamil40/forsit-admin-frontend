<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <header class="bg-white shadow p-4 flex justify-between items-center">
      <h1 class="text-xl font-bold">Forsit Admin Dashboard</h1>
      <nav>
        <router-link class="mx-2 text-blue-600" to="/revenue">Revenue</router-link>
        <router-link class="mx-2 text-blue-600" to="/inventory">Inventory</router-link>
        <router-link class="mx-2 text-blue-600" to="/add-product">Add Product</router-link>
      </nav>
    </header>
    <router-view class="p-4" />
  </div>
</template>
