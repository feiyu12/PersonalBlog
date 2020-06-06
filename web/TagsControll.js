var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var tagsDao = require("../dao/TagsDao");
var blogDao = require("../dao/BlogDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();




function queryByTag(request,response){
 
  var params = url.parse(request.url,true).query;
 
  tagsDao.queryTag(params.tag,function(res){
    if(res == null || res.length ==0){
      response.writeHead(200);
      response.write(respUtil.writeResult("success","查询成功",res));
      response.end();
    }else{
      
      tagBlogMappingDao.queryByTag(res[0].id,parseInt(params.page),parseInt(params.pageSize),function(res){
        var blogList = [];
        for(var i=0;i<res.length;i++){
          blogDao.queryBlogById(res[i].blog_id,function(resl){
            blogList.push(resl[0]);
          })
        }
        setTimeout(()=>{
          for(var i=0;i<blogList.length;i++){
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/,"");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}">/g,"");
            blogList[i].content = blogList[i].content.substring(0,1300);
          }
          response.writeHead(200);
          response.write(respUtil.writeResult("success","查询成功",blogList));
          response.end();
        },10)
      })
    }
  })
}

path.set("/queryByTag",queryByTag);


function queryRandomTags(request,response){
  tagsDao.queryAllTag(function(res){
    res.sort(()=>{
      return Math.random() > 0.1 ? true:false;
    });
    response.writeHead(200);
    response.write(respUtil.writeResult("success","查询成功",res));
    response.end();
  })
}

path.set("/queryRandomTags",queryRandomTags);


function queryByTagCount(request,response){
  var params = url.parse(request.url,true).query;
  tagsDao.queryTag(params.tag,function(res){
   tagBlogMappingDao.queryByTagCount(res[0].id,function(res){
    response.writeHead(200);
    response.write(respUtil.writeResult("success","查询成功",res));
    response.end();
   }) 
  })
}

path.set("/queryByTagCount",queryByTagCount);
module.exports.path = path;