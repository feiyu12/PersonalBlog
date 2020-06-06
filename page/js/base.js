
const randomTags = new Vue({
  el:"#random_tags",
  data:{
    tags:["afsdf","fdghdf","jdtr","tyuyt","cbvxvb","qewerqe","fdh","iop","qnr","sdfg","fdghdf","vbcvbxc","jdtr","tyuyt","cbvxvb","qewerqe","fdh","iop","qnr","sdfg","fdghdf","jdtr","tyuyt","cbvxvb","qewerqe","fdh","iop","qnr","sdfg","fdghdf","jdtr","tyuyt","cbvxvb","qewerqe","fdh","iop","qnr","sdfg"]
  },
  computed:{
    randomColor:function(){
      return function(){
        var red = Math.random() * 255;
        var green = Math.random() * 255;
        var blue = Math.random() * 255;
        return "rgb("+red+","+green+","+blue+")"
      }
    },
    randomSize:function(){
      return function(){
        var size = (Math.random() * 20 + 12)+"px";
        return size;
      }
    }
  },
  created:function(){
    axios({
      type:'get',
      url:"/queryRandomTags"
    }).then((res)=>{
      var result = [];
      for(var i=0;i<res.data.data.length;i++){
        result.push({text:res.data.data[i].tag,link:"/?tag="+res.data.data[i].tag})
      }
      this.tags=result;
    })
  }
});

const newHot = new Vue({
  el:"#new_hot",
  data:{
    titleList:[]
  },
  created:function(){
    axios({
      method:"get",
      url:"/queryHotBlog"
    }).then((res)=>{
        var result=[];
        for(var i=0;i<res.data.data.length;i++){
          var temp={};
          temp.title = res.data.data[i].title;
          temp.link="/blog_detail.html?bid="+res.data.data[i].id;
          result.push(temp);
        }
        this.titleList = result;
    })
  }
})

const newComments = new Vue({
  el:"#new_comments",
  data:{
    commentList:[
      {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉吧"},
      {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉吧"},
      {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉吧"},
      {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉吧"},
      {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉吧"}
    ]
  },
  created:function(){
    axios({
      url:"/queryNewComments",
      type:"get"
    }).then((res)=>{
      var result=[];
      for(var i=0;i<res.data.data.length;i++){
        var temp={};
        temp.name = res.data.data[i].user_name;
        temp.date = res.data.data[i].ctime;
        temp.comment = res.data.data[i].comments;
        result.push(temp);
      }
      this.commentList=result;
    })
  }
})

