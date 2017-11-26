module.exports = function(number) {
    this.show = number === 2
        ? (this.show === 'all' ? 'raw' : 'all')
        : (this.show === 'all'
            ? 'two'
            : this.show === 'two' ? 'raw' : 'all');
};