const {Customer ,  Staff ,  Plan , Mobile , Calls , Connect , Tower, } =  require("./models");
const {Op, Models , Datatypes , Sequelize} = require("sequelize") ;

const express = require("express"); 
const app = express() ; 
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 


app.get("/q1" , async function(req ,  res) {
    var result  =  await Customer.findAll({
        attributes: ["CustomerID" , "DOB" , "Suburb" , Sequelize.literal("CONCAT(Surname, ' ', Given) AS 'full_name'")] ,
        where : {
            Suburb : {
                [Op.like] : '%CAULFIELD%' , 
            }
        } 
    });

    res.json(result) ; 

} ); 

app.get("/q2" , async function(req ,  res) {
    var result  =  await Staff.findAll({
        attributes: [
            "StaffID" , 
            [Sequelize.fn('CONCAT', Sequelize.literal("Surname, ' ', Given") ), 'full_name'], 
            [Sequelize.literal('RatePerHour*38'), 'weekly_salary'] 
        ] ,
        where : {
            Resigned : {
                [Op.is] : null , 
            }
        } 
    });

    res.json(result) ; 
} ); 


app.get("/q3" , async function(req ,  res) {
    var result  =  await Plan.findAll({
        order : [["BreakFee" , "DESC" ] ],  
        limit: 1, 
        offset:0 ,    
    });

    res.json(result) ; 
} ); 


app.get("/q4" , async function(req ,  res) {
    var result  =  await Mobile.findAll({
        attributes:["BrandName" ] ,  
        group: "BrandName" ,     
    });

    res.json(result) ; 
} ); 


// q5-de bu da duz isleyir amma ikinci tam serti odeyir 

// app.get("/q5" , async function(req ,  res) {
//     var result  =  await Customer.findAll({  
//         include: [{
//             model: Mobile,
//             required: false  , 
//         }],
//         // where : {
//         //     "MobileID": null ,
//         //     // {
//         //     //     [Op.is]: null  ,
//         //     // }
//         // } ,  
        
//         where: Sequelize.where(
//             Sequelize.col('StaffID'),
//             'IS',
//             null
//         )       
//     });
//     res.json(result) ; 
// } ); 

app.get("/q5", async function (req, res) {
    var data = await Customer.findAll({
      where: {
        "$Mobiles.CustomerID$": null,
      },
      include: {
        model: Mobile,
        required: false,
      },
    });
    res.json(data);
  });

app.get("/q6" , async function(req ,  res) {
    var result  =  await Mobile.findAll({
        attributes: [ 
            "PlanName" ,
            [ Sequelize.fn( "COUNT" , Sequelize.literal("*") ) , "cnt" ] , 
        ] , 
        group: "PlanName" , 
        order: [[ Sequelize.col("cnt") , "DESC"]] ,    
    });

    res.json(result) ; 
}); 

app.get("/q7" , async function(req ,  res) {
    var result  =  await Mobile.findAll({
        attributes: [Sequelize.fn("ROUND" , Sequelize.fn("AVG" , Sequelize.literal("YEAR(NOW()) - YEAR(customer.DOB)") ) )], 
        include:[{
            model: Customer, 
            require: false , 
        }]  ,

         
    });

    res.json(result) ; 
}); 

app.get("/q8" , async function(req ,  res) {
    var result  =  await Mobile.findAll({
        attributes: [ 
            "BrandName" , 
            [ Sequelize.fn( "COUNT" , Sequelize.literal("*") ) , "cnt" ] , 
        ] ,
        group: "BrandName" , 
        order: [
            
            [Sequelize.col("cnt") , "DESC"]
        ] , 
        limit:1 , 
        offset:0 
    });

    res.json(result) ; 
}); 

app.get("/q9", async (req, res) => {
    var data = await Calls.findAll({
        attributes: [ [Sequelize.fn("COUNT" , Sequelize.col("*")) , "weekend_calls_count"] ] , 
        where: {
                [Op.and] : [
                    Sequelize.where(Sequelize.fn("YEAR" , Sequelize.col("CallDate")), "=" , 2018 ) , 
                    Sequelize.where(Sequelize.fn("WEEKDAY" , Sequelize.col("CallDate")), {
                        [Op.in]: [5,6]
                      })
                ]
            } 
    });
    res.json(data);
});

app.get("/q9/2", async (req, res) => {
    var data = await Calls.findAll({
        attributes: [
            [Sequelize.fn( "WEEKDAY" , Sequelize.col("CallDate") ) ,  "week_day"] , 
            [Sequelize.fn( "COUNT" , Sequelize.col("*") ) ,  "total_calls"]
        ]  , 
        group: Sequelize.col("week_day") ,   
        where: Sequelize.where( Sequelize.fn( "YEAR" , Sequelize.col("CallDate") ) , "=" , 2018) , 
           
    });
    res.json(data);
});

app.get("/q9/2", async (req, res) => {
    var data = await Calls.findAll({
        attributes: [
            [Sequelize.fn( "WEEKDAY" , Sequelize.col("CallDate") ) ,  "week_day"] , 
            [Sequelize.fn( "COUNT" , Sequelize.col("*") ) ,  "total_calls"]
        ]  , 
        group: Sequelize.col("week_day") ,   
        where: Sequelize.where( Sequelize.fn( "YEAR" , Sequelize.col("CallDate") ) , "=" , 2018) , 
           
    });
    res.json(data);
});


app.get("/q10", async (req, res) => {
    var data = await Connect.findAll({
        attributes : [ 
            "Tower.*" , 
            [Sequelize.fn( "COUNT" ,Sequelize.col("*")) , "tower_connects" ]
        ] , 
        include : [{
            model: Tower , 
            required: true ,  
        }] , 
        group:  "TowerID" , 
        order: [[Sequelize.col("tower_connects"), "DESC"]],
           
    });
    res.json(data);
});


// islemir
// app.get("/q11", async (req, res) => {
//     var data = await Plan.findAll({
//         attributes : [
//                 "mobile.CustomerID" , 
//                 [Sequelize.fn("SUM" , sequelize.col("calls.CallDuration")) , "total_calls_duration"] , 
//                 "plan.PlanDuration"   
//         ], 
//         include : [
//             {
//                 model: Mobile, 
//                 required: true ,
//                 include: {
//                     model: Calls,
//                     required:true , 
//                 }               
//             } , 
//         ] ,
//         where: {
//             [Op.and]: [
//                 {
//                     PlanName: "Large" , 
//                 } , 
//                 Sequelize.where(Sequelize.fn("YEAR" , Sequelize.col("calls.CallDate")), "=" , 2018 ) , 
//                 Sequelize.where(Sequelize.fn("MONTH" , Sequelize.col("calls.CallDate")), "=" , 8 )
//             ] ,
//         } , 
//         group: "CustomerID" , 
//         having:{
//             "$total_calls_duration$" : {
//                 [Op.gt]: Sequelize.col("plan.PlanDuration") ,
//             }
//         },       
//         order:[[Sequelize.col("mobile.CustomerID")]] ,    
//     });
//     res.json(data);
// });


app.get("/q12" , async function(req,res){

    var result =  await Tower.findAll({
        attributes: [[Sequelize.fn("COUNT" , Sequelize.col("*")) , "tower_count"]] , 
        where: {
            SignalType: "3G" ,
        }
    }); 
    res.json(result);
}); 

app.get("/q12/2" , async function(req,res){

    var result =  await Tower.update(
        {
            SignalType: "5G" 
    },
    {
        where: {
            SignalType: "3G" ,
        }
    }); 
    res.send("DONE!");
}); 


app.listen(process.env.PORT || 5000 , function(err){
    if(err) throw err ; 

    console.log("Connected") ; 
})



 

