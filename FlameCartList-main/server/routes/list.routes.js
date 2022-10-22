const ListController = require('../controllers/list.controller'); 
const {internalauth}= require('../controllers/user.controller')
module.exports = app => {
    app.get('/api/lists', internalauth, ListController.findAllLists);
    app.get('/api/lists/:id', internalauth, ListController.findOneSingleList);
    app.put('/api/lists/:id', internalauth, ListController.internalListAuth, ListController.updateExistingList);
    app.post('/api/lists', internalauth, ListController.createNewList);
    app.delete('/api/lists/:id', internalauth, ListController.internalListAuth, ListController.deleteAnExistingList);
    app.get('/api/rec/:id', internalauth, ListController.recList);
    app.get('/api/share/:list_id',internalauth, ListController.shareList)
}