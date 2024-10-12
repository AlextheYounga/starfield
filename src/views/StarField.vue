<template>
    <div class="interest">
        <button @click="showList = !showList">Points of Interest</button>
        <ul v-if="showList">
            <li v-for="item in items" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>


<script>
import { renderStarfield } from '../three/space.js';

export default {
    data() {
        return {
            showList: false,
            items: [
                'Starship Enterprise',
                'Solar System',
                'Trisolaran Droplet',
                'SpaceX Starship',
            ],
        }
    },
    created() {
        renderStarfield();
    },
}
</script>

<style scoped>
.interest {
    background: transparent;
}

button {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0.5rem;
}

ul {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50px;
    left: 10px;
    z-index: 1;
}

li {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0.5rem;
    margin: 0.5rem;
}

</style>