<script>
import {
    include,
    load,
    style
} from 'modules';

export default {
    id: 'table',
    name: 'table-',
    components: {
        ...load('container/table/components'),
        ...load('container'),
        ...load('units')
    },
    props: {
        data: {
            type: Object,
            default: undefined
        },
        config: {
            type: Object,
            default: undefined
        },
        mode: {
            type: String,
            default: ''
        },
        selection: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        selectionIndex: 0
    }),
    watch: include(require.context('./watch/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    mounted() {
        style.set(this, {
            size: style.get('size', this, 24)
        });
        this.updateStyle('default');
        if (this.mode) this.updateStyle(this.mode);
    },
    beforeUpdate() {
        this.time = new Date().getTime();
        console.time('table[' + this._uid + ']' + this.time);
    },
    updated() {
        console.time('table[' + this._uid + ']' + this.time);
    },
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    render: require('./tableRender'),
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .table > div > .col > .row': [
                'height: #{$size * $dpi}px',
                'line-height: #{$size * $dpi}px',
                'font-size: #{17 / 30 * $size * $dpi}px'
            ],
            '[size="#{$size}"] .table > div > .col > .row > .cell > span': [
                'line-height: #{$size * $dpi}px',
                'padding: 0 #{0.3 * $size * $dpi}px'
            ]
        }
    },
};

</script>
