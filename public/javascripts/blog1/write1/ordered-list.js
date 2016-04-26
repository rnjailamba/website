SirTrevor.Blocks.OrderedList = SirTrevor.Blocks.List.extend({
  type: "ordered_list",
  title: function() { return 'Orderedlist'; },
  icon_name: 'list',

  editorHTML: '<ol class="st-list-block__ordered_list"></ol>',

  setupListVariables: function() {
    this.$ul = this.$inner.find('ol');
    this.ul = this.$ul.get(0);
  }
});