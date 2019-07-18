module.exports = class Consultation {

    constructor(title,description,date,time){
        this.title = title
        this.description = description
        this.date = date
        this.time = time.toString()
        this.id = null
    }


    getTimeFull(){
        return [this.date,this.time].join(" ")
    }

    setTitle(title){
        this.title = title
    }

    setDescription(description){
        this.description = description
    }

    setDate(date){
        this.date = date
    }

    setTime(time){
        this.time = time
    }

    setId(id){
        this.id = id
    }

    toObject(){
        return {
            title : this.title,
            description : this.description,
            date : this.date,
            time : this.time
        }
    }
    
    static toObjectFormat(consultation){
        if(consultation instanceof this){
            return { 
                id :  consultation.id,
                title : consultation.title,
                description : consultation.description,
                date : consultation.date,
                time : consultation.time
            }
        }else{
            throw new "instance not of this class"
        }
    }
}