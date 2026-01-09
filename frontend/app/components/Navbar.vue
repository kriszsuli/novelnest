<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a href="/">NovelNest</a>
        </div>
        <ul class="navbar-links">
            <li><a href="/">Home</a></li>
            <li><a href="/library">Library</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/login">Login</a></li>
        </ul>
    </nav>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #222;
    padding: 1rem 2rem;
    color: #fff;
}

.navbar-brand a {
    color: #fff;
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: bold;
}

.navbar-links {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
}

.navbar-links a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
}

.navbar-links a:hover {
    color: #ff9800;
}
</style>