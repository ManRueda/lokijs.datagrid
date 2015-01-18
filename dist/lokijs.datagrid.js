/*! lokijs-datagrid 2015-01-17 */

!function(a,b,c){var d="fetch",e="lokiGrid",f="lokiGrid",g="lokiGrid",h="lg-footer",i="lg-toolbar",j="lg-selected",k="lg-filter",l="data-page",m="lg-btn-refresh",n={string:1,"boolean":2,number:3,date:4},o={footer:{pageClick:function(){if(!c(this).parents("li").hasClass("disabled")){var a=c(this).parents("div."+g).data(f);switch(c(this).attr(l)){case"-1":a.dataSource.current.page=a.dataSource.current.page-1;break;case"+1":a.dataSource.current.page=a.dataSource.current.page+1;break;default:a.dataSource.current.page=Number(c(this).attr(l))}a.refresh()}}},header:{filterClick:function(){var a=c(this).attr("data-filter"),b=!0;if(c.each(c(this).parents("thead").find("th:has(span.opened)"),function(d,e){c(e).width("auto"),c(e).find("span.opened").attr("data-filter")===a&&(b=!1),c(e).find("span.opened").removeClass("opened"),c(e).find("input").remove()}),!b)return!1;var d=c("<input></input>"),e=c(this).parents("."+g).data(f);c(this).parents("th").width(c(this).parents("th").width()),c(this).parents("th").append(d),e.dataSource.currentFilter[a]&&d.val(e.dataSource.currentFilter[a]),d.off("keyup",o.header.filterKeyup).on("keyup",o.header.filterKeyup),d.focus(),c(this).addClass("opened")},filterKeyup:function(){var a=c(this).parents("."+g).data(f),b=c(this).siblings("div").find("span."+k),d=b.attr("data-filter"),e=c(this).val();""===e?(b.removeClass("filtered"),delete a.dataSource.currentFilter[d]):(b.addClass("filtered"),a.dataSource.currentFilter[d]=c(this).val()),a.dataSource.filter(a.dataSource.currentFilter)}},table:{rowClick:function(){c(this).parents("div."+g).data(f).select(c(this))}},toolbar:{btnClick:function(){c(this).parents("."+g).data(f).reload()}}},p={createHeader:function(a,b){c.each(b.schema,function(b,d){var e=c(["<th><div>",d.text,"</div></th>"].join("")),f=e.find("div");d.attr&&c.each(d.attr,function(a,b){e.attr(Object.keys(b)[0],b[Object.keys(b)[0]])}),e.addClass(d["class"]),e.width(d.width),(void 0!==d.filter?d.filter:!0)&&f.append(c("<span></span>").addClass("glyphicon glyphicon-filter "+k).attr("data-filter",d.name)),a.headers.find("tr").append(e)})},createDb:function(a){a.dataSource.db=new loki(a.wrapper.attr("id")),a.dataSource.collection=a.dataSource.db.addCollection(a.wrapper.attr("id")),a.dataSource.dynamicView=a.dataSource.collection.addDynamicView("gridView")},createFooter:function(a){var b=a.dataSource.current,c=[];c.push('<nav><ul class="pagination">'),c.push('<li class="'+(1===b.page?"disabled":"")+'" ><a data-page="-1"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span></a></li>');var d=b.page<6?1:b.page-5,f=Math.ceil(b.length/a.dataSource.pageSize);f=(11>f?f:11)+d;for(var g=d;f>=g&&g<=Math.ceil(b.length/a.dataSource.pageSize);g++)c.push(g===b.page?['<li class="active"><a ',l,'="',g,'">',g,"</a></li>"].join(""):["<li><a ",l,'="',g,'">',g,"</a></li>"].join(""));c.push('<li class="'+(b.page===Math.ceil(b.length/a.dataSource.pageSize)?"disabled":"")+'" ><a data-page="+1"><span aria-hidden="true">&raquo;</span><span class="sr-only">Previous</span></a></li>'),c.push("</ul></nav>"),a.footer.find("nav").remove(),a.footer.append(c.join("")),a.footer.find("a[data-page]").on("click."+e,o.footer.pageClick)},tableEvents:function(a){a.body.off("click.lokiJSrowClick").on("click.lokiJSrowClick","tr",o.table.rowClick),a.headers.find("span."+k).off("click",o.header.filterClick).click(o.header.filterClick)},toolbarEvents:function(a){a.toolbarContainer.find("a.btn."+m).click(o.toolbar.btnClick)},createToolbar:function(a){for(var b=0;b<Object.keys(a.toolbar).length;b++){var d=Object.keys(a.toolbar)[b],e=a.toolbar[d];if("refresh"===d){var f,g=c("<span></span>").addClass("glyphicon glyphicon-refresh");e.text&&(f=c("<span></span>").html(e.text));var h=c("<a></a>").addClass("btn btn-primary "+m);h.append(g),h.append(f),a.toolbarContainer.append(h)}}this.toolbarEvents(a)},generateUUID:function(){var a=(new Date).getTime(),b="xxx-xx-4xxx-yxx-xxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;return a=Math.floor(a/16),("x"===b?c:3&c|8).toString(16)});return b}},q={load:function(a){return this.wrapper.one(d,function(){c(this).data(f).refresh()}),"object"==typeof a&&this.dataSource.load(a),"string"==typeof a&&(this.dataSource.remoteOrigin=a,this.dataSource.remoteLoad()),this},refresh:function(){var a=this;return a.body.find("tr").remove(),c.each(this.dataSource.getView(),function(b,d){var e=[];d.dataUid=p.generateUUID(),e.push("<tr "),e.push('data-uid="'+d.dataUid+'" '),e.push(">"),c.each(a.schema,function(a,b){var c="";switch(b.type){case n.string:c=d[b.name];break;case n.number:c=d[b.name].toString();break;case n["boolean"]:c=b.isTrue&&b.isTrue?d[b.name]?b.isTrue.replace("#value",d[b.name]):b.isFalse.replace("#value",d[b.name]):d[b.name].toString();break;case n.date:c=d[b.name].toString()}e.push(['<td class="',b.name,'">',c,"</td>"].join(""))}),e.push("</tr>"),a.body.append(e.join(""))}),p.createFooter(a),this},reload:function(){this.dataSource.remoteOrigin?this.load(this.dataSource.remoteOrigin):this.refresh()},select:function(a){return a?(a.siblings().removeClass(j),a.addClass(j),a):this.table.find("tr."+j)},dataItem:function(a){return this.dataSource.findByUID(a?a.attr("data-uid"):this.select().attr("data-uid"))},getColumn:function(a){var b=this.schema.filter(function(b){return b.name===a});return 0===b.length?void 0:b[0]}},r={current:{page:1,length:void 0},currentFilter:{},remoteOrigin:"",load:function(a){return this.current.length=a.length,this.collection.clear(),this.collection.insert(a),this.wrapper.trigger(new c.Event(d,{data:a})),this},remoteLoad:function(){var a=this;return c.ajax(this.remoteOrigin).done(function(b){a.load("string"==typeof b?JSON.parse(b):b)}),this},getView:function(){return this.current.length=this.dynamicView.resultset.data().length,this.dynamicView.resultset.offset(this.pageSize*(this.current.page-1)).limit(this.pageSize).data()},findByUID:function(a){return a?this.dynamicView.resultset.find({dataUid:a})[0]:void 0},select:void 0,filter:function(a){if(this.dynamicView.applyFind(),a){this.dynamicView.filterPipeline=[];for(var b=0;b<Object.keys(a).length;b++){var c={},d=Object.keys(a)[b],e=a[d],f=this.parent.getColumn(d);c[d]=f.type===n.string||f.type===n.date?{$contains:e}:{$eq:e},this.dynamicView.applyFind(c)}}this.parent.refresh()},pageSize:10};c.fn.lokiGrid=function(a){var b=c(this),d=q;return b.addClass(g),d.table=c("<table></table>"),d.table.addClass("table table-hover"),d.table.addClass("table-hover"),d.table.addClass("table-striped"),a.options.bordered&&d.table.addClass("table-bordered"),a.options.condensed&&d.table.addClass("table-condensed"),d.schema=a.schema,d.toolbar=a.toolbar,d.wrapper=b,d.dataSource=r,d.dataSource.wrapper=b,d.dataSource.parent=d,d.headers=c("<thead></thead>"),d.headers.append("<tr></tr>"),d.body=c("<tbody></tbody>"),d.footer=c("<div></div>").addClass(h),d.toolbarContainer=c("<div></div>").addClass(i),d.loading=c('<div class="hidden"></div>'),p.createToolbar(d,a),p.createHeader(d,a),p.createDb(d,a),d.table.append(d.headers),d.table.append(d.body),b.append(d.toolbarContainer),b.append(d.table),b.append(d.footer),b.prepend(d.loading),p.tableEvents(d),b.data(f,d),this},a.lokiDataGrid={columnType:n}}(window,document,jQuery,loki);
//# sourceMappingURL=lokijs.datagrid.js.map