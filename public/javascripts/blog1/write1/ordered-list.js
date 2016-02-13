
/*
 Ordered List
*/

SirTrevor.Blocks.OrderedList = (function() {

 var template = '<div class="st-text-block" contenteditable="true"><ol><li></li></ol></div>';

 return SirTrevor.Block.extend({

   type: "ordered_list",

   icon_name: 'list',

   editorHTML: function() {
     return _.template(template, this);
   },

   loadData: function(data){
     this.getTextBlock().html("<ol>" + SirTrevor.toHTML(data.text, this.type) + "<ol>");
   },

   onBlockRender: function() {
     this.checkForList = _.bind(this.checkForList, this);
     this.getTextBlock().on('click keyup', this.checkForList);
   },

   checkForList: function() {
     if (this.$('ol').length === 0) {
       document.execCommand("insertOrderedList", false, false);
     }
   },

   toMarkdown: function(markdown) {
     return markdown.replace(/<\/li>/mg,"\n")
                    .replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/^(.+)$/mg," 1. $1");
   },

   toHTML: function(html) {
     html = html.replace(/^ 1. (.+)$/mg,"<li>$1</li>")
                .replace(/\n/mg, "");

     return html;
   },

   onContentPasted: function(event, target) {
     var replace = this.pastedMarkdownToHTML(target[0].innerHTML),
         list = this.$('ol').html(replace);

     this.getTextBlock().caretToEnd();
   }

 });

})();


SirTrevor.Blocks.Image = SirTrevor.Block.extend({

    type: "image",

    title: function() { return i18n.t('blocks:image:title'); },

    droppable: true,

    uploadable: true,

    icon_name: 'image',

    editorHTML: function()
    {
        return ['<figure class="st-image-figure st-block__editor">' +
            '<img>'+
            '<figcaption class="st-figcaption st-text-block st-figcaption-initial" ' +
                'contenteditable="true" data-initial-data="Write image caption (optional)">' +
                'Write image caption (optional)</figcaption>' +
        '</figure>'].join("\n");
    },

    loadData: function(data){
        this.$editor.html( this.editorHTML() );
        this.$('img').attr('src', data.file.url);
        this.$('figcaption').html( SirTrevor.toHTML(data.caption.text) );
    },

    onBlockRender: function(){
        /* Setup the upload button */
        this.$inputs.find('button').bind('click', function(ev){ ev.preventDefault(); });
        this.$inputs.find('input').on('change', _.bind(function(ev){
            this.onDrop(ev.currentTarget);
        }, this));
        /* Setup figcaption bindings to immitate placeholder behavior */
        this.$('figcaption').on('focus', _.bind(function(ev){
                this.onFigcaptionFocus(ev.currentTarget);
            }, this))
            .on('blur', _.bind(function(ev){
                this.onFigcaptionBlur(ev.currentTarget);
            }, this));
    },

    onFigcaptionFocus: function(target)
    {
        if (target.dataset.initialData === target.innerHTML) {
            target.classList.remove('st-figcaption-initial');
            target.innerHTML = '';
        }
    },

    onFigcaptionBlur: function(target)
    {
        if ('' === target.innerHTML) {
            target.classList.add('st-figcaption-initial');
            target.innerHTML = target.dataset.initialData;
        }
    },

    onDrop: function(transferData){
        var file = transferData.files[0],
            urlAPI = (typeof URL !== "undefined") ? URL : (typeof webkitURL !== "undefined") ? webkitURL : null;

        // Handle one upload at a time
        if (/image/.test(file.type)) {
            this.loading();
            // Hide inputs
            this.$inputs.hide();
            // Show this image on here
            this.$('img').attr('src', urlAPI.createObjectURL(file));
            this.$editor.show();

            // Focus to figcaption
            this.$('figcaption').focus();

            // Upload!
            SirTrevor.EventBus.trigger('setSubmitButton', ['Please wait...']);
            this.uploader(
                file,
                function(data) {
                    data.caption = { text: null };
                    this.setData(data);
                    this.ready();
                },
                function(error){
                    this.addMessage(i18n.t('blocks:image:upload_error'));
                    this.ready();
                }
            );
        }
    },

    toData: function(){
        SirTrevor.log("toData for " + this.blockID);

        this.setData({
            caption: {
                text: SirTrevor.toMarkdown( this.getTextBlock().html() )
            }
        });
    },
});