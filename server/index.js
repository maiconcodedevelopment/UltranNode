class Http{

    constructor(request,response){
        this.request = request
        this.response = response
    }

    pathURLSearch(url){
        return url == this.request.url ? true : false
    }

    get(url,fc){
        if(this.pathURLSearch(url)){
            fc(this.request,this.response)
        }
    }
}

module.exports = {
    app : (request,response) => {
        let http = new Http(request,response)
        http.get("/",function(request,response){
            response.end("Application Node Server !!!")
        })
    }
}