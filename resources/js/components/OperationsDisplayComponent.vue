<template>
    <div v-if="show" id="operations-display" :class="theme">
        {{ display }}
    </div>
</template>

<script>
    export default {
        props: {
            display: String
        },
        data() {
            return {
                theme: 'w-full whitespace-no-wrap scrolling-touch text-xl overflow-x-auto border-b border-indigo-700 py-2',
                show: false
            }
        },
        mounted() {
            this.show = this.display !== '';
        },
        updated: function () {
            this.$nextTick( () => {
                this.scrollDisplay();
            });
        },
        watch: {
            display(new_value) {
                this.show = new_value !== '';
            }
        },
        methods: {
            scrollDisplay() {
                /**
                 * Scroll the `operations display` automatically.
                 */
                try {
                    let selector_display = document.querySelector("#operations-display");

                    let selector_width = selector_display.scrollWidth;

                    if (selector_width > 0) {
                        selector_display.scrollTo(selector_width, 0);
                    }
                }  catch(err) {
                   console.error(err.toString());
                }
            },
        }
    }
</script>