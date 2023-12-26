<script setup>
    defineProps({
        stroke: {
            type: String,
            default: "#292D32",
        },
    })
</script>
<template>
    <svg
     width="16"
     height="16" 
     viewBox="0 0 16 16" 
     fill="none" 
     xmlns="http://www.w3.org/2000/svg">
     <path d="M7.99992 14.6668C11.6666 14.6668 14.6666 11.6668 14.6666 8.00016C14.6666 4.3335 11.6666 1.3335 7.99992 1.3335C4.33325 1.3335 1.33325 4.3335 1.33325 8.00016C1.33325 11.6668 4.33325 14.6668 7.99992 14.6668Z" :stroke=stroke stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M5.33325 8H10.6666" :stroke=stroke stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M8 10.6668V5.3335" :stroke=stroke stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>