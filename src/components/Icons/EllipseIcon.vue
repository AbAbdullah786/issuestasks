<script setup>
    defineProps({
        stroke: {
            type: String,
            default: "#7B8497",
        }
    })
</script>

<template>
    <svg
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" :stroke=stroke stroke-width="2"/>
    </svg>
        
</template>