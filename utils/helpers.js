module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    shorten_post_text: text => {
        return text.split('.')[0].trim() + "...";
    }
}