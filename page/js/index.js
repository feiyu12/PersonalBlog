const everyDay = new Vue({
  el:'#every_day',
  data:{
    content:'我每一天都在努力着，从没有放松过'
  },
  computed:{
    getContent:function(){
      return this.content;
    }
  },
  created:function(){
    axios({
      method:'get',
      url:'/queryEveryDay'
    }).then(function(resp){
      everyDay.content=resp.data.data[0].content; 
    }).catch(function(err){
      console.log(err);
    })
  }
})

const articleList = new Vue({
  el:"#article_list",
  data:{
    page:1,
    pageSize:5,
    count:100,
    pageNumList:[],
    articleList:[
      {
        title:"四联",
        content:"有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会",
        date:"2010-10-10",
        views:"101",
        tages:"test1 test2",
        id:"1",
        link:""
      },
      {
        title:"四联",
        content:"有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会",
        date:"2010-10-10",
        views:"101",
        tages:"test1 test2",
        id:"1",
        link:""
      },
      {
        title:"四联",
        content:"有小伙伴反应我博客半年没更新了，借此机会赶紧水一篇。另有小伙伴求助于我一个这样的问题，说在使用http://协议外加443端口访问时，nginx会报错提示：“400 Bad Request The plain HTTP request was sent to HTTPS port”这个错误是指请求错误，http协议的请求被发送到了https的端口。在Nginx中，不能在一个端口同时处理http和https请求。按正常浏览来说也不可能会",
        date:"2010-10-10",
        views:"101",
        tages:"test1 test2",
        id:"1",
        link:""
      }
    ]
  },
  computed:{
    jumpTo:function(){
      var This=this;
      return function(page){
        This.getPage(page,This.pageSize);
      }
    },
    getPage:function(){
      var This=this;
      return function(page,pageSize){
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var tag = "";
        for(var i=0;i<searchUrlParams.length;i++){
          if(searchUrlParams[i].split("=")[0] == "tag"){
            try{
              tag = searchUrlParams[i].split("=")[1];
            }
            catch(e){
              console.log(e);
            }
          }
        }
       if(tag==""){
        axios({
          method:"get",
          url:"/queryBlogByPage?page="+(page-1)+"&pageSize="+ pageSize
        }).then(function(resp){
          var result = resp.data.data;
          var list = [];
          for(var i=0;i<result.length;i++){
            var temp = {};
            temp.title = result[i].title;
            temp.content = result[i].content;
            temp.date = result[i].ctime;
            temp.views = result[i].views;
            temp.tags = result[i].tags;
            temp.id = result[i].id;
            temp.link = "/blog_detail.html?bid="+result[i].id;
            list.push(temp);
          }
          articleList.articleList=list;
          This.page=page;
        }).catch(function(resp){
         console.log(resp);
        });
        axios({
          method:"get",
          url:"/queryBlogCount"
        }).then(function(resp){
          This.count = resp.data.data[0].count;
          This.generatePageTool;
        });
       }else{
        axios({
          method:"get",
          url:"/queryByTag?page="+(page-1)+"&pageSize="+ pageSize+"&tag="+tag
        }).then((resp)=>{
          var result = resp.data.data;
          var list = [];
          for(var i=0;i<result.length;i++){
            var temp = {};
            temp.title = result[i].title;
            temp.content = result[i].content;
            temp.date = result[i].ctime;
            temp.views = result[i].views;
            temp.tags = result[i].tags;
            temp.id = result[i].id;
            temp.link = "/blog_detail.html?bid="+result[i].id;
            list.push(temp);
          }
          articleList.articleList=list;
          This.page=page;
        }).catch(function(resp){
         console.log(resp);
        });

        axios({
          method:"get",
          url:"/queryByTagCount?tag="+tag 
        }).then(()=>{
          articleList.count=res.data.data[0].count;
          articleList.generatePageTool;
        })
       }
      
      }
    },
    generatePageTool:function(){
      var nowPage = this.page;
      var pageSize = this.pageSize;
      var totalCount = this.count;
      var result = [];
      result.push({text:"<<",page:1});
      if(nowPage>2){
        result.push({text:nowPage-2,page:nowPage-2});
      }
      if(nowPage>1){
        result.push({text:nowPage-1,page:nowPage-1});
      }
      result.push({text:nowPage,page:nowPage});
      if(nowPage +1 <= (totalCount + pageSize -1)/pageSize){
        result.push({text:nowPage+1,page:nowPage+1});
      }
      if(nowPage +2 <= (totalCount + pageSize -1)/pageSize){
        result.push({text:nowPage+2,page:nowPage+2});
      }
      result.push({text:">>",page:parseInt((totalCount + pageSize -1)/pageSize)});
      this.pageNumList=result;
      return result;
    }
  },
  created:function(){
    this.getPage(this.page,this.pageSize);
  }
})