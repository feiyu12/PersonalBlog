var blogComments = new Vue({
  el:"#blog_comments",
  data:{
    total:100,
    comments:[]
  },
  computed:{
    reply:function(){
      return function(commentId,userName){
        document.getElementById("comment_reply").value = commentId;
        document.getElementById("comment_reply_name").value = userName;
        location.href="#send_comment"
      }
    }
  },
  created:function(){
    var bid=-1;
    axios({
      method:"get",
      url:"/queryCommentsByBlogId?bid="+bid
    }).then((res)=>{
      this.comments=res.data.data;
      for(var i=0;i<this.comments.length;i++){
       if(this.comments[i].parent > -1){
        this.comments[i].options = "回复@"+this.comments[i].parent_name;
       }
      }
    }).catch(()=>{
      console.log("失败");
    });
    axios({
      method:'get',
      url:"/queryCommentsCountByBlogId?bid="+bid
    }).then((res)=>{
      this.total=res.data.data[0].count;
    })
  }
})

var sendComment = new Vue({
  el:"#send_comment",
  data:{
    vcode:"",
    rightCode:""
  },
  computed:{
    changeCode:function(){
      return function(){
        axios({
          method:"get",
          url:"/queryRandomCode"
        }).then(function(resp){
           sendComment.vcode = resp.data.data.data;
         
           sendComment.rightCode = resp.data.data.text;
        })
      }
    },
    sendComment:function(){
      var This=this;
       return function(){
         var code = document.getElementById("comment_code").value;
         console.log(code,This.rightCode);
         if(code != This.rightCode){
           alert("验证码有误");
           return;
         }
        
        var bid=-1;
        var reply = document.getElementById("comment_reply").value;
        var replyName = document.getElementById("comment_reply_name").value;
        var name = document.getElementById("comment_name").value;
        var email = document.getElementById("comment_email").value;
        var content = document.getElementById("comment_content").value;
        axios({
          method:"get",
          url:"/addComment?bid="+bid+"&parent="+reply+"&parentName="+replyName+"&userName="+name+"&email="+email+"&content="+content
        }).then(function(res){
          alert("成功");
        }).catch(()=>{
          console.log("错误");
        })
       }
    }
  },
  created:function(){
   this.changeCode();
  }
})