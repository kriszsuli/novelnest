<template>
    <div>
        <img src="/assets/images/search-icon.svg" alt="search">
        <input type="text" placeholder="Search books, movies, genres....">
        <img src="/assets/images/arrow-icon.svg" alt="arrow" class="arrow">
    </div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
    background-color: #000;
    border-radius: 25px;
    padding: 0.5rem 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 300px;
}
input {
    border: none;
    outline: none;
    flex: 1;
    margin: 0 0.5rem;
    font-size: 1rem;
    color: #fff;
    background-color: transparent;
}
.arrow {
    width: 16px;
    height: 16px;
    cursor: pointer;
}
img {
    width: 20px;
    height: 20px;
}
</style>