import convertOne from './src/convertOne';
import complierString from '../../# components/complier/complierString';
import queue from 'queue';
const Q = queue();
Q.concurrency = 1;

/**
 * file {
 *     source: string
 *     target: string
 *     file: [] object
 * }
 */
module.exports = function convert(file, options, each) {
    Q.concurrency = complierString('{setting.imagemagickConcurrency}');
    Q.push((next) => {
        convertOne(file, options, (err, file) => {
            next();
            each(err, file);
        });
    });
    Q.start();
};
