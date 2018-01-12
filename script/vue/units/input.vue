<template>
    <div class="input"
         v-if="type !== 'checkbox'"
         :class="{ focus: focus }">
        <input type="text"
               v-model="value"
               v-if="type === 'text'"
               @focus="focus = true"
               @blur="focus = false"
               :class="{ highlight: highlight }"
               :placeholder="placeholder">
        <input type="number"
               v-model.number="value"
               v-else-if="type === 'number'"
               @focus="focus = true"
               @blur="focus = false"
               :min="min"
               :max="max"
               :class="{ highlight: highlight }"
               :placeholder="placeholder">
        <textarea rows="1"
                  v-model="value"
                  v-else-if="type === 'textarea'"
                  @focus="focus = true"
                  @blur="focus = false"
                  :class="{ highlight: highlight }"
                  :placeholder="placeholder" />
    </div>
    <ai-button class="input"
               v-else-if="type === 'checkbox'"
               icon=""
               text="Thư mục abc"
               value="@"
               :path="path" />
</template>
<script>
import {
    load,
    find,
    style
} from 'modules';

export default {
    name: 'Input',
    components: {
        ...load('units/button')
    },
    props: {
        path: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        min: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 10
        },
        root: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            value: '',
            highlight: false,
            focus: false
        };
    },
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .input > input': [
                'height: #{$size * $dpi}px',
                'padding: 0 #{$size * $dpi * 0.3}px',
                'font-size: #{($size * 0.2 + 6) * $dpi}px'
            ],
            '[size="#{$size}"] .input.square > input': [
                'width: #{$size * $dpi}px'
            ],
            '[size="#{$size}"] .input > textarea': [
                'padding: #{$size * $dpi * 0.3}px #{$size * $dpi * 0.3}px',
                'font-size: #{($size * 0.2 + 8) * $dpi}px'
            ],
            '[size="#{$size}"] .input > .checkbox': [
                'line-height: #{$size * $dpi}px',
                'height: #{$size * $dpi}px',
                'width: #{$size * $dpi}px'
            ],
            '[size="#{$size}"] .input > .checkbox > span': [
                'line-height: #{$size * $dpi}px'
            ]
        }
    },
    mounted() {
        style.set(this, {
            size: style.get('size', this, 40),
            dpi: window.devicePixelRatio
        });
        setTimeout(() => {
            this.updateTextareaHeight();
        }, 1000);

        if (this.path[0] === '$') {
            this.value = this.$store.getters['get:' + this.path.substr(1)];
            this.$store.watch(
                () => this.$store.getters['get:' + this.path.substr(1)],
                (value) => {
                    this.value = value;
                    this.$store.commit('set', {
                        path: this.path.substr(1),
                        value: value
                    });
                }
            );
            this.$watch('value', (value) => {
                this.$store.commit('set', {
                    path: this.path.substr(1),
                    value: value
                });
            });
        } else {
            const args = [this.path, this.root, true].filter((value) => {
                return value !== undefined;
            });
            const [parent, property] = find(...args);
            if (parent
                && property !== undefined
                && parent[property] !== undefined) {
                this.value = parent[property];
                this.$watch('value', (value) => {
                    parent[property] = value;
                    this.updateTextareaHeight();
                });
                parent.$watch(property, (value) => {
                    this.value = value;
                });
            }
        }
    },
    methods: {
        updateTextareaHeight() {
            if (this.type === 'textarea') {
                const el = this.$el.querySelector('textarea');
                el.style.height = 'auto';
                el.style.height = Number(el.scrollHeight + el.offsetHeight - el.clientHeight) + 'px';
            }
        }
    }
};
</script>