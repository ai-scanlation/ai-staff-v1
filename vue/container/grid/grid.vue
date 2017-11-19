<script>
import {
    include,
    load,
    style
} from '~/modules';

export default {
    name: 'grid',
    components: {
        // ...load("container/table/components"),
        ...load('container'),
        ...load('units')
    },
    props: ['data', 'selection', 'show'],
    data: () => ({
        selectionIndex: 0
    }),
    render: require('./gridRender'),
    mounted() {
        style.set(this, {
            size: style.get('size', this, 24),
            dpi: window.devicePixelRatio
        });
        this.updateStyle();
    },
    style: {
        group: 'default',
        overwrite: false,
        rules: {
            '[size="#{$size}"] .grid > .col > .row': [
                'height: #{$size * $dpi}px',
                'line-height: #{$size * $dpi}px',
                'font-size: #{17 / 30 * $size * $dpi}px'
            ],
            '[size="#{$size}"] .grid > .col > .row > .cell > span': [
                'line-height: #{$size * $dpi}px',
                'padding: 0 #{0.3 * $size * $dpi}px'
            ]
        }
    },
    watch: include(require.context('./watch/', true, /[^/]+\.js$/), 1, 4, 'js', /src/),
    methods: include(require.context('./methods/', true, /[^/]+\.js$/), 1, 4, 'js', /src/)
};
</script>