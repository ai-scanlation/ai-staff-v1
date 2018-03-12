<template>
    <div v-if="img !== undefined"
         :class="{ loaded: img.loaded , redraw: /redraw[^\.]$/.test(img.name) }"
         @mousedown="mousedown"
         @mousemove="mousemove"
         @mouseup="mouseup">
        <!-- 
            [top] raw - position: absolute
            [bot] all
        -->
        <img ref="all"
             :src="all"
             @load="loaded">
        <img ref="raw"
             :src="raw">
        <div :shoot="shoot"
             :style="{ 
                 'max-width': naturalWidth + 'px',
                 'clip-path': `polygon(0 0, ${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%,${left}% ${top}%, 0 0, 0 100%, 100% 100%, 100% 0)`
        }" />
    </div>
</template>
<script>
import {
    load,
    find,
    shell,
    convert
} from 'modules';
import path from 'path';
import fs from 'fs';
import {
    clipboard,
    nativeImage
} from 'electron';

export default {
    id: 'image',
    name: 'image-',
    components: {
        ...load('units')
    },
    props: {
        img: {
            type: Object,
            default: undefined,
        }
    },
    data: () => ({
        raw: '',
        all: '',
        naturalWidth: 0,

        shoot: 0,
        top: 0,
        left: 0,
        right: 10,
        bottom: 10
    }),
    mounted() {
        this.img.component = this;
        this.loadImage();
    },
    methods: {
        mousedown(event) {
            const reader = find('reader');
            if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
                // Click
                reader.scrollToImage(
                    event.button === 0 ? 'down' : (event.button === 2 ? 'up' : undefined)
                );
            } else if (event.altKey && !event.ctrlKey && !event.shiftKey) {
                // Alt + Click
                shell.openFile(this.img.src);
            } else if (!event.altKey && event.ctrlKey && !event.shiftKey) {
                // Ctrl + Click
                shell.openFileInPhotoshop(this.img.src);
            } else if (!event.altKey && !event.ctrlKey && event.shiftKey) {
                // Shift + Click
                this.loadImage();
            } else if (event.altKey && event.ctrlKey && !event.shiftKey) {
                // Ctrl + Alt + Click
                this.left = this.right = this.percent('x', event);
                this.top = this.bottom = this.percent('y', event);
                this.shoot = 1;
            } else if (!event.altKey && event.ctrlKey && event.shiftKey) {
                // Ctrl + Shift + Click
                const folderPath = reader.folderPath;
                let name;
                // Rename in Front-end
                if (/redraw\./.test(this.img.name)) {
                    name = this.img.name.replace(/\s?redraw\./, '.');
                } else {
                    name = this.img.name
                        .replace(/\s?redraw/, '')
                        .replace(/\.([^.]+)$/, ' redraw.$1');
                }
                // Rename in Disk
                fs.rename(
                    this.img.src,
                    path.join(folderPath, name),
                    (err) => {
                        if (err) throw err;
                        this.img.name = name;
                        this.img.src = path.join(folderPath, name);
                    }
                );
            }
        },
        mousemove(event) {
            if (event.buttons === 1 && this.shoot === 1) {
                this.right = this.percent('x', event);
                this.bottom = this.percent('y', event);
            }
        },
        mouseup() {
            if (this.shoot === 1) this.shoot = 2;
            const raw = this.$refs.raw;
            const all = this.$refs.all;
            const canvas = document.querySelector('#canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = (this.right - this.left) * raw.naturalWidth / 100 * 2 + 5;
            canvas.height = (this.bottom - this.top) * raw.naturalHeight / 100;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0084ff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                raw,
                this.left * raw.naturalWidth / 100,
                this.top * raw.naturalHeight / 100,
                (this.right - this.left) * raw.naturalWidth / 100,
                (this.bottom - this.top) * raw.naturalHeight / 100,
                0,
                0,
                (this.right - this.left) * raw.naturalWidth / 100,
                (this.bottom - this.top) * raw.naturalHeight / 100
            );
            ctx.drawImage(
                all,
                this.left * raw.naturalWidth / 100,
                this.top * raw.naturalHeight / 100,
                (this.right - this.left) * raw.naturalWidth / 100,
                (this.bottom - this.top) * raw.naturalHeight / 100,
                (this.right - this.left) * raw.naturalWidth / 100 + 5,
                0,
                (this.right - this.left) * raw.naturalWidth / 100,
                (this.bottom - this.top) * raw.naturalHeight / 100
            );
            clipboard.writeImage(
                nativeImage.createFromDataURL(
                    canvas.toDataURL()
                )
            );
        },
        percent(xy, event) {
            const img = this.$refs.raw;
            if (xy === 'x') return (event.clientX * window.devicePixelRatio - img.x) / img.width * 100;
            else if (xy === 'y') return (event.clientY * window.devicePixelRatio - img.y) / img.height * 100;
            else return 0;
        },
        loadImage() {
            const setting = find('setting');
            this.img.loaded = false;
            if (/psd$/.test(this.img.src)) {
                const temporaryFolder = find('setting').imagemagickTemporaryFolder;
                const rawLayer = path.join(temporaryFolder, path.basename(this.img.src)).replace(/.psd$/, '-raw.jpg');
                const allLayer = path.join(temporaryFolder, path.basename(this.img.src)).replace(/.psd$/, '-all.jpg');
                // raw
                convert({
                    source: this.img.src,
                    target: rawLayer,
                    img: this.img,
                    layer: 1
                }, {}, (err) => {
                    if (err) throw err;
                    this.raw = rawLayer + '?' + new Date().getTime();
                    fs.readdir(setting.imagemagickTemporaryFolder, (err, files) => {
                        if (err) return;
                        setting.imagemagickTemporaryFolderLength = files.length;
                    });
                });

                // all
                convert({
                    source: this.img.src,
                    target: allLayer,
                    img: this.img,
                    layer: 0
                }, {}, (err) => {
                    if (err) throw err;
                    this.img.loaded = true;
                    this.all = allLayer + '?' + new Date().getTime();
                    fs.readdir(setting.imagemagickTemporaryFolder, (err, files) => {
                        if (err) return;
                        setting.imagemagickTemporaryFolderLength = files.length;
                    });
                });
            } else {
                this.raw = this.all = this.img.src + '?' + new Date().getTime();
                setTimeout(() => {
                    this.img.loaded = true;
                }, 500);
            }
        },
        loaded(event) {
            find('reader').updateScroll();
            this.naturalWidth = event.target.naturalWidth;
        },
        toUrl(str) {
            return str ? 'http://localhost:1234/get/' + str : '';
        }
    }
};

</script>
