var dbutil = require("./DBUtil");

function queryHotBlog(size,success){
  var querySql = "select * from blog order by views desc limit ?;";
  var params = [size];
  var connection = dbutil.createConnection();
  connection.connect();
  
  connection.query(querySql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error);
    }
  });
  connection.end();
}

function insertBlog(title,content,views,tags,ctime,utime,success){
  var insertSql = "insert into blog (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values (?, ?, ?, ?, ?, ?);"
  var params = [title,content,views,tags,ctime,utime];
  
  var connection = dbutil.createConnection();
  connection.connect();
  
  connection.query(insertSql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(insertSql);
      console.log('错误了');
      console.log(error);
    }
  });
  connection.end();
}

function queryBlogCount(success){
  var insertSql = "select count(1) as count from blog";
  var params = [];
  var connection = dbutil.createConnection();
  connection.connect();
  
  connection.query(insertSql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error);
    }
  });
  connection.end();
}

function queryBlogByPage(page,pageSize,success){
  var insertSql = "select * from blog order by id desc limit ?,?;";
  var params = [page * pageSize,pageSize];
  var connection = dbutil.createConnection();
  connection.connect();
  
  connection.query(insertSql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error);
    }
  });
  connection.end();
}

function queryBlogById(id,success){
  var insertSql = "select * from blog where id =?;";
  var params = [id];
  var connection = dbutil.createConnection();
  connection.connect();
  
  connection.query(insertSql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error);
    }
  });
  connection.end();
}

function queryAllBlog(success){
  var insertSql = "select * from blog;";
  var params = [];
  var connection = dbutil.createConnection();
  connection.connect();
  
  connection.query(insertSql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error);
    }
  });
  connection.end();
}

function addView(id,success){
  var querySql = "update blog set views = views + 1 where id =?;"; 
  var params = [id];
  var connection = dbutil.createConnection();
  connection.connect();
  
  connection.query(querySql,params,function(error,result){
    if(error == null){
      success(result);
    }else{
      console.log(error);
    }
  });
  connection.end();
}

module.exports.queryHotBlog=queryHotBlog;
module.exports.addView=addView;
module.exports.queryAllBlog=queryAllBlog;
module.exports.queryBlogById=queryBlogById;
module.exports.queryBlogCount=queryBlogCount;
module.exports.insertBlog=insertBlog;
module.exports.queryBlogByPage=queryBlogByPage;