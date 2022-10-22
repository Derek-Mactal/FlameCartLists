const ItemController = require('../controllers/item.controller'); 
const {internalauth}= require('../controllers/user.controller')
const {internalListAuth}= require('../controllers/list.controller')
module.exports = app => {
    // app.get('/api/items', ItemController.findAllItems);
    app.get('/api/items/lsid/:list_id', internalauth, internalListAuth, ItemController.findAllItemsInList);
    app.get('/api/items/:item_id/lsid/:list_id', internalauth, internalListAuth, ItemController.findOneSingleItem);
    app.put('/api/items/:item_id/lsid/:list_id', internalauth, internalListAuth, ItemController.updateExistingItem);
    app.post('/api/items/lsid/:list_id',  internalauth, internalListAuth, ItemController.createNewItem);
    app.delete('/api/items/:item_id/lsid/:list_id', internalauth, internalListAuth, ItemController.deleteAnExistingItem);
}