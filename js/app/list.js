function List(obj) {
    this.order = {
        by: {
            title: "title", tags: "tags", dateModified: "date_modified", dateAdded: "date_added"
        },
        mode: {asc: "asc", desc: "desc"}
    };
    // this.orderMode = {};

    this.list = obj || [];

    this.get = function (index) {
        return this.list[index] || this.list;
    }
}

List.prototype.orderBy = function (order, mode) {
    mode = mode || this.order.mode.asc;
    if (this.order.by[order] === undefined)
        throw("Invalid order by parameter, valid parameters include are " + Object.keys(this.order.by).join(", "));

    if (this.order.mode[mode] === undefined)
        throw("Invalid order mode parameter, valid parameters include are " + Object.keys(this.order.mode).join(", "));
};


var notes = new List({
    title: "test",
    tags: "",
    dateAdded: Date.now(),
    dateModified: Date.now(),
    content: "Content"
});


notes.orderBy("TESt");