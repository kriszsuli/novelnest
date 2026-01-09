<script setup>
    const email = ref('')
    const password = ref('')
    const error = ref('')

    const backend_url = import.meta.env.MODE === 'development' ? 'http://localhost:5000': 'https://backend.novelnest.liba.lol'

    const login = async () => {
        try {
            const data = await $fetch(`${backend_url}/api/auth/login`, {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value
                }
            })
            localStorage.setItem('token', data.token)
            window.location.href = '/'
        } catch (err) {
            error.value = err.data?.error || 'An error occurred during login.'
            return
        }
    }
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>