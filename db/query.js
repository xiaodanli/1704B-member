const connect = require('./index');

const query = (sql,params = []) => {
    return new Promise((resolve,reject) => {
        connect.query(sql,params,(error,data) => {
            if(error){
                reject({msg:'error',error})   
            }else{
                resolve({msg:'success',data}) 
            }
        })
    })
}

module.exports = query;

