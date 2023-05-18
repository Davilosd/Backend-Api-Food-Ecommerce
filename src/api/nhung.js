

function nhungApi(app) {
    app.get("/nhung", async (request, response) => {
        
        try {
            //var result = await UnitsModel.find().select('name level unitId').exec();
            
            response.send("asd");
        } catch (error) {
            response.status(500).send(error);
        }
        });
    
}

module.exports = nhungApi