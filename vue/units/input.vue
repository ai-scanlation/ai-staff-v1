<template>
    <div class="input"
         v-if="this.type !== 'checkbox'"
         :class="{ focus: focus }">
        <input type="text"
               v-model="value"
               v-if="this.type === 'text'"
               @focus="focus = true"
               @blur="focus = false"
               :class="{ highlight: highlight }"
               :placeholder="this.placeholder" />
        <input type="number"
               v-model.number="value"
               v-else-if="this.type === 'number'"
               @focus="focus = true"
               @blur="focus = false"
               :min="this.min"
               :max="this.max"
               :class="{ highlight: highlight }"
               :placeholder="this.placeholder" />
        <textarea rows="1"
                  v-model="value"
                  v-else-if="this.type === 'textarea'"
                  @focus="focus = true"
                  @blur="focus = false"
                  :class="{ highlight: highlight }"
                  :placeholder="this.placeholder"></textarea>
    </div>
    <ai-button class="input"
               v-else-if="this.type === 'checkbox'"
               icon=""
               text="Thư mục abc"
               value="@"
               :path="path">
    </ai-button>
</template>
<script>
import {
    load,
    find,
    style
} from '~/modules';

export default {
    name: 'input',
    components: {
        ...load('units/button')
    },
    props: {
        path: {
            default: ''
        },
        placeholder: {
            default: ''
        },
        type: {
            default: 'text'
        },
        min: {
            default: '1'
        },
        max: {
            default: '10'
        },
        root: {
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
        setTimeout(() => {
            this.updateTextareaHeight();
        }, 1000);
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
