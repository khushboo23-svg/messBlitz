const AccountantSchema = require("../schema/schemaAccountant")

const isValidChiefAccountantId = async function(id){
    const accountant = AccountantSchema.findById(id);
    if(accountant)
        return true;
    else
        return false;
}

