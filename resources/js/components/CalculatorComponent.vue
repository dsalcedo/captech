<template>
    <div class="w-full bg-indigo-700 rounded-lg shadow-lg p-4">
        <div class="text-white roboto-mono text-right bg-indigo-600 rounded-lg p-2 shadow-sm mb-2">
            <operations-display-component v-bind:display="operations_display"></operations-display-component>
            <div class="w-full text-4xl h-14 scrolling-touch">{{ valueDisplay }}</div>
        </div>
        <div class="w-full bg-indigo-700">
            <div class="flex flex-wrap text-xl -mx-1">
                <div class="w-7/12">
                    <div class="flex flex-wrap flex-row-reverse justify-end">
                        <template v-for="digit in buttons.numbers">
                            <button @click="add(digit)" class="text-center bg-white rounded-full w-12 h-12 md:w-16 md:h-16 m-2 shadow-lg cursor-pointer hover:bg-gray-400 focus:shadow-outline focus:outline-none focus:bg-orange-200">
                                <div class="py-3">{{ digit }}</div>
                            </button>
                        </template>
                        <button @click="setFixed" class="text-center bg-white rounded-full w-12 h-12 md:w-16 md:h-16 m-2 shadow-lg cursor-pointer hover:bg-gray-400 focus:shadow-outline focus:outline-none focus:bg-white focus:bg-orange-200">
                            <div class="py-3">.</div>
                        </button>
                        <button @click="add(0)" class="text-center bg-white rounded-full w-12 h-12 md:w-16 md:h-16 m-2 shadow-lg cursor-pointer hover:bg-gray-400 focus:shadow-outline focus:outline-none focus:bg-white focus:bg-orange-200">
                            <div class="py-3">0</div>
                        </button>
                    </div>
                </div>
                <div class="w-5/12">
                    <div class="flex flex-wrap justify-end text-white font-bold">
                        <template v-for="operator in buttons.arithmetic_operators">
                            <button @click="handle(operator.symbol)" :class="operator.theme" class="text-center rounded-full w-12 h-12 md:w-16 md:h-16 m-2 shadow-lg cursor-pointer focus:shadow-outline focus:outline-none">
                                <div class="py-3">{{ operator.symbol }}</div>
                            </button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const THEME_GRAY = 'bg-gray-600 hover:bg-gray-700 focus:bg-gray-600';
    const THEME_ORANGE = 'bg-orange-500 hover:bg-orange-600 focus:bg-orange-500';

    import OperationsDisplayComponent from './OperationsDisplayComponent';

    export default {
        components: {
            OperationsDisplayComponent
        },
        data() {
            return {
                buttons: {
                    numbers: [...Array(9).keys()].map(item => item +1).reverse(),
                    arithmetic_operators: [
                        {"symbol": "C", "theme": THEME_GRAY},
                        {"symbol": "CE","theme": THEME_GRAY},
                        {"symbol": '+', "theme": THEME_ORANGE},
                        {"symbol": '-', "theme": THEME_ORANGE},
                        {"symbol": '*', "theme": THEME_ORANGE},
                        {"symbol": '/', "theme": THEME_ORANGE},
                        {"symbol": '=', "theme": THEME_ORANGE},
                    ]
                },
                operations_list: [],
                operations_display: '',
                isFixed: false,
                valueDisplay: 0,
                integerDisplay: '',
                places: 0,
                needsRestart: false,
            }
        },
        methods: {
            limitDecimal(value) {
                /**
                 * Count the decimals in some number
                 * @type {number}
                 * */
                if (Math.floor(value) !== value) {
                    const size = value.toString().split(".")[1].length || 0;
                    if (size > 5) {
                        return (value).toFixed(5);
                    }
                }
                return value;
            },
            setFixed() {
                /**
                 * Indicates if the `value display` needs decimal point.
                 * */
                this.places = 0;
                this.isFixed = !this.isFixed
            },
            clear(default_value = 0) {
                /**
                 * Cleans for completely all the values in the calculator to default values.
                 * @type {number}
                 */
                this.operations_list = [];
                this.operations_display = '';
                this.needsRestart = false;
                this.clearEntry(default_value);
            },
            clearEntry(default_value = 0) {
                /**
                 * Cleans only the `value display` to default values.
                 * @type {number}
                 */
                this.isFixed = false;
                this.valueDisplay = this.limitDecimal(default_value);
                this.integerDisplay = 0;
                this.places = 0;
            },
            add(value) {
                /**
                 * Add value into the `value display`
                 * @type {number}
                 */
                if (this.needsRestart) {
                    this.clear(this.valueDisplay);
                }

                value = `${this.integerDisplay}${value}`;

                if (this.isFixed && this.places <= 4) {
                    this.places += 1;
                }

                this.integerDisplay = parseInt(value);
                value = (!this.isFixed) ? this.integerDisplay : this.integerDisplay / Math.pow(10, this.places);
                this.valueDisplay = this.limitDecimal(value)
            },
            handle(symbol) {
                /**
                 * Solve the operations contained in the `operations list`.
                 * @type {string}
                 */

                if (this.display === 0) {
                    return;
                }

                if (this.needsRestart) {
                    this.clear(this.valueDisplay);
                }

                if (symbol === "C") {
                    return this.clear();
                } else if (symbol === "CE") {
                    return this.clearEntry()
                }

                // TODO: keep it {more} simple

                this.operations_list = this.operations_list.concat([this.valueDisplay, symbol]);
                let operations_size = this.operations_list.length;

                if (operations_size > 1) {
                    this.operations_list.pop();
                }

                this.operations_display = this.operations_list.join(" ");

                let value = this.limitDecimal(eval(`${this.operations_display}` ));

                this.operations_list = this.operations_list.concat([symbol]);
                this.operations_display = this.operations_list.join(" ");

                this.clearEntry(value);

                if (symbol === "=") {
                    this.needsRestart = true;
                }
            }
        }
    }
</script>