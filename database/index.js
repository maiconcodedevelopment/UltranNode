const Consultation = require("../app/Model/Consultation")

module.exports = {
    DatabseUltran :  class DatabseUltran {

        constructor(mysql ){
            this.mysql = mysql
        }

        createConsultation(){
           var Consultation = `create table if not exists consultation(
               id int primary key auto_increment,
               title varchar(255) not null,
               description varchar(255) not null,
               date date not null,
               time time not null
            ) engine = InnoDB default charset = utf8`
   
            this.mysql.query(Consultation,(error,result) => {
               if(error) throw error
               console.log(result)
           })
        }

        allConsultation(fc){
            this.mysql.query("select * from consultation",(error,result) => {
                if(error) throw error
                fc(result)
            })
        }

        insertConsultation(consultation,fc){
            if(consultation instanceof Consultation){
                this.mysql.query("insert into consultation set ?",consultation.toObject(),(error,result,fields) =>{
                    if(error) throw error
                    fc(result.insertId)
                })
            }
        }

        updateConsultation(consultation,fc){
            if(consultation instanceof Consultation){
                this.mysql.query("update consultation set ? where id = ?",[consultation.toObject(),consultation.id],(error,result)=>{
                    if(error) throw error
                    fc(result)
                })
            }
        }

        deleteConsultation(id,fc){
            this.mysql.query("delete from consultation where id = ?",[id],(error,result) => {
                if(error) throw error
                fc(result)
            })
        }
   }
}
