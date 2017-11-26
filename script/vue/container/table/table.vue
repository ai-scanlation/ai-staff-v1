<script>
import {
    include,
    load,
    style
} from 'modules';

export default {
    name: 'table',
    components: {
        ...load('container/table/components'),
        ...load('container'),
        ...load('units')
    },
    props: ['data', 'config', 'mode', 'selection'],
    data: () => ({
        selectionIndex: 0
    }),
    render: require('./tableRender'),
    mounted() {
        style.set(this, {
            size: style.get('size', this, 24),
            dpi: window.devicePixelRatio
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
    watch: include(require.context('./watch/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/)
};

</script>
