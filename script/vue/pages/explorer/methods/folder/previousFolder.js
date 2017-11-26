import fs from 'fs';
import path from 'path';

module.exports = async function() {
    const filesAndFolders = fs.readdirSync(path.dirname(this.$store.state.explorer.folderPath));
    const folders = filesAndFolders.filter((fileOrFolder) => (
        fs.lstatSync(path.join(
            path.dirname(this.$store.state.explorer.folderPath),
            fileOrFolder
        )).isDirectory()
    ));
    const index = folders.indexOf(path.basename(this.$store.state.explorer.folderPath));
    if (index !== 0) {
        this.$store.commit('set', {
            path: 'explorer.folderPath',
            value: path.join(
                path.dirname(this.$store.state.explorer.folderPath),
                filesAndFolders[index - 1]
            )
        });
    }
};