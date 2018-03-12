<template>
    <ai-row :index="index"
            class="array">
        <ai-input ref="input"
                  :class="inputClass"
                  :min="min || minValue"
                  :max="max || maxValue"
                  :root="this"
                  type="number"
                  path="array.index" />
        <ai-button :root="this"
                   path="array.click"
                   value="input"
                   class="full">
            <ai-label :text="text"
                      :root="this" />
        </ai-button>
    </ai-row>
</template>
<script>
import {
    load,
    find,
    focus
} from 'modules';

/**
 * <Array>
 * Cách dùng:
 *   + Path: [Đường dẫn] trỏ đến mảng chứa các chuỗi
 *   + PathId: [Đường dẫn] trỏ đến biến chứa id trong mảng
 *       Bản thân component này sẽ chỉ set giá trị này dựa vào Path[PathId]
 *       Không có chiều ngược lại
 * 
 * Một vài chú thích cần nhớ:
 *   + Giá trị index trong data là thuộc tính để tiện việc cho 
 *     <label> dễ lấy giá trị thông qua chuỗi {array.value}
 */
export default {
    id: 'array',
    name: 'array-',
    components: {
        ...load('container'),
        ...load('units')
    },
    props: {
        'text': {
            type: String,
            default: '{array.value}'
        },
        'action': {
            type: String,
            default: 'focus'
        },
        'toggleWay': {
            type: String,
            default: 'up'
        },
        'path': {
            type: String,
            default: ''
        },
        'pathIndex': {
            type: Number,
            default: 0
        },
        'pathId': {
            type: String,
            default: ''
        },
        'min': {
            type: Number,
            default: 0
        },
        'max': {
            type: Number,
            default: 10
        },
        'inputClass': {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            index: 0,
            minValue: 0,
            maxValue: 10,
            value: '<Chưa định nghĩa>'
        };
    },
    mounted() {
        find(this.path, (parent, property) => {
            parent.$watch(property, value => this.updateValue(value));
            this.$watch('index', () => this.updateValue(parent[property]));

            this.updateValue(parent[property]);
            this.$on('toggle', toggleWay => {
                if (!Array.isArray(parent[property])) {
                    console.warn(`this.path = ${this.path} không phải là một mảng`);
                    return;
                }
                const length = parent[property].length;
                this.index = toggleWay === 'up'
                    ? (this.index === -1 || this.index >= length - 1) ? 0 : this.index + 1
                    : (this.index === -1 || this.index === 0) ? length - 1 : this.index - 1;
            });
        });
        find(this.pathId, (parent, property) => {
            parent.$watch(property, value => this.index = value);
            this.$watch('index', value => parent[property] = value);
            this.index = parent[property];
        });
    },
    methods: {
        updateValue(value) {
            if (value == undefined || value[this.index] == undefined) return;

            this.value = (this.pathIndex && value[this.index][this.pathIndex])
                ? value[this.index][this.pathIndex]
                : value[this.index];
            this.maxValue = value.length - 1;
        },
        click() {
            const action = type => this.action.split(' ').indexOf(type) !== -1;
            if (action('focus')) focus('input', this);
            if (action('toggle')) this.$emit('toggle', this.toggleWay);
        }
    }
};

</script>
