module.exports = {
    locationFilterBox: '.recruiting-search__location',
    jobFilterBox: '.job-search__departments',
    country: function(value) {
        return '//strong[contains(@class, "results__group")][.="' + value + '"]'
    }
}