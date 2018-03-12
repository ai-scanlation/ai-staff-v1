import {
    clipboard
} from 'electron';
import {
    sort
} from 'modules';

module.exports = function() {
    clipboard.writeText(this.$store.state
        .google.upload.cloudFiles
        .sort((a, b) => (sort(a.name, b.name)))
        .map(file => file.url)
        .join('\r\n')
    );
};
